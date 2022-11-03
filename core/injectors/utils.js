const isLayer = (obj) => {
	return typeof(obj.ty) === 'number';
};

const findFirstShapeInLayer = (layer, ty, assets) => {
	let found = null;

	if (layer.refId) {
		let asset = assets[layer.refId];
		if (asset) {
			for (let l of asset.layers) {
				found = findFirstShapeInLayer(l, ty, assets);
				if (found) {
					return found;
				}
			}
		}
	} else {
		if (layer.shapes) {
			for (let s of layer.shapes) {
				found = findFirstShapeInShape(s, ty);
				if (found) {
					return found;
				}
			}
		}
	}

	return null;
};

const findFirstShapeInShape = (shape, ty) => {
	if (shape.ty === ty) {
		return shape;
	}

	if (shape.ty === 'gr' && shape.it) {
		for (let s of shape.it) {
			let found = findFirstShapeInShape(s, ty);
			if (found) {
				return found;
			}
		}
	}

	return null;
};

const findFirstShape = (obj, ty, assets) => {
	// 在一个输入对象中找到第一个指定类型的shape
	// 输入可以是个layer，也可以是个shape
	let isLayer = typeof(obj.ty) === 'number';

	if (isLayer) {
		return findFirstShapeInLayer(obj, ty, assets);
	} else {
		return findFirstShapeInShape(obj, ty, assets);
	}
};

const ensureEachPartObj = (part, func) => {
	for (let i in part) {
		if (!part.hasOwnProperty(i)) {
			continue;
		}

		let v = part[i];
		ensureEachPartEntry(v, func, part, i);
	}
};

const ensureEachPartEntry = (entry, func, part, i) => {
	// console.log('ensureEachPartEntry innner', entry, func, part, i)
	if (entry._objs) {
		entry._objs.forEach((o) => {
			func(part, i, o, null);
		})
	} else {
		func(part, i, null, entry);
	}
};

const makePos = (trg, pos, r) => {
	// 制作标准化pos
	let x, y;

	if (!pos) {
		x = undefined;
		y = undefined;
	} else if (Array.isArray(pos)) {
		x = pos[0];
		y = pos[1];
	} else {
		x = pos.x;
		y = pos.y;
	}

	let out = trg ? {
		x: trg[0],
		y: trg[1]
	} : {
		x: undefined,
		y: undefined
	};

	if (x !== undefined && x !== null) {
		out.x = x * r;
	}

	if (y !== undefined && y !== null) {
		out.y = y * r;
	}

	return out
};

const injectPosition = (trg, pos, r) => {
	// 把可预见的形式的位置值付给trg
	// trg必须是二元或三元数组，
	// pos可以是二元数组或{x: 0, y: 0}形式
	// null 或 undefined 表示该维度不动
	// r = 点位放大率
	if (!trg || !pos) {
		return;
	}

	let p = makePos(trg, pos, r);
	trg[0] = p.x;
	trg[1] = p.y;
};

const lineCalc = (ps, pe, vs, ve, r, g) => {
	// p:
	const adjustTransport = (g) => {
		if (g._adjusted) {
			return;
		}

		for (let v of [g, g.gs]) {
			if (v && v.padding) {
				if (typeof(v.padding) === 'number') {
					v.padding = {
						s: v.padding,
						e: v.padding
					};
				} else if (Array.isArray(v.padding)) {
					// 数组形式，不动直接拼接
				} else {
					v.padding = {
						s: v.padding.s || 0,
						e: v.padding.e || 0
					};
				}
			}
		}

		g._adjusted = true;
	};

	//对线段和描边的起终点做计算
	// g（变换）的格式要求：
	// const g_sample = { // 所有的数字都是指等比放大后的数字
	//     _adjusted: false, // 是否整理过
	//     padding: 5, // 线两端向内收缩5px
	//     or_padding: {s: 10, e: -20}, // 起点收缩10，终点扩展20
	//     gs: {
	//         padding: 20, // 渐变区域是线两端向内收缩20px
	//         or_padding: {s: 20, e: 10}, // 一边收20，另一边收10
	//         color: [0,1,1,1,1,1,1,1] // 两端的颜色
	//     }
	// };

	vs = makePos(ps, vs, r);
	ve = makePos(pe, ve, r);
	let ga = (g && g.gs && g.gs.color) ? g.gs.color.slice() : [0, 1, 1, 1, 1, 1, 1, 1];

	if (g) {
		adjustTransport(g);

		let vw = ve.x - vs.x;
		let vh = ve.y - vs.y;
		let vl = (vw ** 2 + vh ** 2) ** 0.5;

		if (g.padding) {
			// 计算线两端的收缩
			vs.x += (vw / vl) * g.padding.s;
			vs.y += (vh / vl) * g.padding.s;

			ve.x -= (vw / vl) * g.padding.e;
			ve.y -= (vh / vl) * g.padding.e;

			vl -= g.padding.s;
			vl -= g.padding.e;
		}

		if (g.gs && g.gs.padding) {
			if (Array.isArray(g.gs.padding)) {
				ga.push(...g.gs.padding);
			} else {
				// 计算渐变两端的透明度
				ga.push(0, 0, g.gs.padding.s / vl, 1);
				ga.push(1 - g.gs.padding.e / vl, 1, 1, 0);
			}
		} else {
			ga.push(0, 0, 0.1, 1, 0.9, 1, 1, 0);
		}
	} else {
		ga.push(0, 0, 0.1, 1, 0.9, 1, 1, 0);
	}

	return {
		vs: vs,
		ve: ve,
		ga: ga
	}
};

const injectLine = (obj, s, e, r, g, assets) => {
	// 直线inject，要求obj里有且只有一个路径(sh)，可以有最多一个渐变描边(gs)，
	// 可以顺便根据g中的内容修正渐变描边的数据，
	let sh = findFirstShape(obj, 'sh', assets);
	let gs = findFirstShape(obj, 'gs', assets);

	if (sh) {
		let [ps, pe] = sh.ks.k.v;
		let calc = lineCalc(ps, pe, s, e, r, g);

        injectPosition(ps, calc.vs, 1);
        injectPosition(pe, calc.ve, 1);

		if (gs) {
			injectPosition(gs.s.k, calc.vs, 1);
			injectPosition(gs.e.k, calc.ve, 1);
			gs.g.k.k = calc.ga;
		}
	}
};

const injectLineWithCalc = (obj, calc, assets) => {
	let sh = findFirstShape(obj, 'sh', assets);
	let gs = findFirstShape(obj, 'gs', assets);

	if (sh) {
		let [ps, pe] = sh.ks.k.v;
		injectPosition(ps, calc.vs, 1);
		injectPosition(pe, calc.ve, 1);

		if (gs) {
			injectPosition(gs.s.k, calc.vs, 1);
			injectPosition(gs.e.k, calc.ve, 1);
			gs.g.k.k = calc.ga;
		}
	}
};
const injectLineWithCalcByR = (obj, calc, assets) => {
	let rk = obj.ks.r.k;
	if (rk && Array.isArray(rk) && rk.length == 2) {
		let [ps, pe] = rk
		pe = calc.r
	}

};
const injectAngleWithCalcByFl = (obj, calc, assets) => {
	let sh = findFirstShape(obj, 'sh', assets);
	let gs = findFirstShape(obj, 'gs', assets);
	let fl = findFirstShape(obj, 'fl', assets);
	if (sh) {


		let [ps, vo, pe, po] = sh.ks.k.v;
		injectPosition(ps, calc.ps, 1);
		injectPosition(vo, calc.o, 1);
		injectPosition(po, calc.po, 1);
		injectPosition(pe, calc.pe, 1);


		let [is, ic, ie, io] = sh.ks.k.i;
		injectPosition(is, [0, 0], 1);
		injectPosition(ic, [0, 0], 1);
		injectPosition(ie, [0, 0], 1);
		injectPosition(io, [calc.he.x - calc.po.x, calc.he.y - calc.po.y], 1);

		let [os, oc, oe, oo] = sh.ks.k.o;
		injectPosition(os, [0, 0], 1);
		injectPosition(oc, [0, 0], 1);
		injectPosition(oe, [0, 0], 1);
		injectPosition(oo, [calc.hs.x - calc.po.x, calc.hs.y - calc.po.y], 1);

		if (fl) {
			fl.c.k = calc.fl
		}
	}
};
const injectAngleWithCalc = (obj, calc, assets,r) => {
	let sh = findFirstShape(obj, 'sh', assets);
	let gs = findFirstShape(obj, 'gs', assets);
	if (sh) {
		let [ps, pc, pe] = sh.ks.k.v;
		injectPosition(ps, calc.ps, 1);
		injectPosition(pc, calc.po, 1);
		injectPosition(pe, calc.pe, 1);

		let [is, ic, ie] = sh.ks.k.i;
		injectPosition(is, [0, 0], 1);
		injectPosition(ic, [calc.hs.x - calc.po.x, calc.hs.y - calc.po.y], 1);
		injectPosition(ie, [0, 0], 1);

		let [os, oc, oe] = sh.ks.k.o;
		injectPosition(os, [0, 0], 1);
		injectPosition(oc, [calc.he.x - calc.po.x, calc.he.y - calc.po.y], 1);
		injectPosition(oe, [0, 0], 1);
		if (gs) {
		    injectPosition(gs.s.k, calc.vs, 1);
		    injectPosition(gs.e.k, calc.ve, 1);
		    gs.g.k.k = calc.ga;
		}
	}
};

const injectAngleByLine = (obj, calc, assets) => {
	let sh = findFirstShape(obj, 'sh', assets);
	let gs = findFirstShape(obj, 'gs', assets);

	if (sh) {
		let [ps, pe] = sh.ks.k.v;
		injectPosition(ps, calc.vs, 1);
		injectPosition(pe, calc.ve, 1);

		if (gs) {
			injectPosition(gs.s.k, calc.vs, 1);
			injectPosition(gs.e.k, calc.ve, 1);
			gs.g.k.k = calc.ga;
		}
	}
};

const injectMovement = (obj, kps, r) => {
	// 对象修改移动路径， 要求输入的kps数量和预定义的k数量一致
	if (!obj || !kps) {
		return;
	}

	if (!obj.ks || !obj.ks.p || (obj.ks.p.a === 0) ||
		!obj.ks.p.k || !Array.isArray(obj.ks.p.k) ||
		obj.ks.p.k.length !== kps.length
	) {
		console.error(`injectMovement: invalid movement ks[${obj.nm}] vs kps[${kps}]`);
		return;
	}

	for (let i in obj.ks.p.k) {
		if (obj.ks.p.k.hasOwnProperty(i)) {
			let k = obj.ks.p.k[i];
			injectPosition(k.s, kps[i], r);
			if (k.to) {
				k.to = [0, 0, 0]
			}

			if (k.ti) {
				k.ti = [0, 0, 0]
			}

		}
	}
};

const injectText = (o, v) => {
	// 对data中每个内容v做替换
	if (o && o.t && o.t.d && o.t.d.k) {
		for (let text of o.t.d.k) {
			let s = text.s;
			if (v) {
				if (typeof(v) === 'string') {
					s.t = v;
				} else {
					for (let key in v) {
						if (v.hasOwnProperty(key)) {
							s.t = s.t.replace(`{${key}}`, v[key]);
						}
					}
				}
			}
		}
	}
};

const getAngle = (s, e) => {
	// 计算角度，s / e 是标准化(makePos)后的点位
	let w = (e.x - s.x);
	let h = (e.y - s.y);
	if (h == 0) {
		return w > 0 ? 0 : -180
	}
	return Math.atan2(h, w) * 180 / Math.PI;
};
const getAngle3 = (s, o, e) => {
	// 计算三点之间的夹角
	let os = getAngle(o, s);
	let oe = getAngle(o, e);
	return os - oe;
};

const getLength = (s, e) => {
	// 两点之间长度
	return Math.sqrt(Math.pow(s.x - e.x, 2) + Math.pow(s.y - e.y, 2));
};
const getAngle4 = (s, o, e) => {
	// 计算三点之间的夹角 
	let lengthOS = getLength(o, s),
		lengthOE = getLength(o, e),
		lengthSE = getLength(s, e);
	let cosO = (Math.pow(lengthOS, 2) + Math.pow(lengthOE, 2) - Math.pow(lengthSE, 2)) /
		(2 * lengthOS * lengthOE);
	let angle = Math.round(Math.acos(cosO) * 180 / Math.PI);

	return -angle; //算出来的顺时针为正，
};
const getRayPointByLength = (s, e, w, l) => {
	// 计算 s->e 射线上 w 长度的点位，输出x, y
	// l 是指与计算的s->e长度，如果没有则先算一下
	if (!l) {
		l = getLength(s, e);
	}
	let r = w / l;
	return {
		x: (s.x + (e.x - s.x) * r),
		y: (s.y + (e.y - s.y) * r)
	}
};

const getRayPointByRate = (s, e, r) => {
	return {
		x: (s.x + (e.x - s.x) * r),
		y: (s.y + (e.y - s.y) * r)
	}
};

const getLineCross = (l1, l2, seg) => {
	// 计算两条线的交点, seg = 是否以线段方式求解
	let [x1, y1] = l1[0];
	let [x2, y2] = l1[1];
	let [x3, y3] = l2[0];
	let [x4, y4] = l2[1];

	let b1 = (y2 - y1) * x1 + (x1 - x2) * y1;
	let b2 = (y4 - y3) * x3 + (x3 - x4) * y3;
	let d = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
	if (d === 0) {
		// 平行线
		return null;
	}

	let d1 = b2 * (x2 - x1) - b1 * (x4 - x3);
	let d2 = b2 * (y2 - y1) - b1 * (y4 - y3);

	let x = d1 / d;
	let y = d2 / d;

	if (seg) {
		if ((Math.abs(x1 - x2) > 1 && (x < Math.min(x1, x2) - 1 || x > Math.max(x1, x2) + 1)) ||
			x < Math.min(x3, x4) - 1 || x > Math.max(x3, x4) + 1 ||
			(Math.abs(y1 - y2) > 1 && (y < Math.min(y1, y2) - 1 || y > Math.max(y1, y2) + 1)) ||
			y < Math.min(y3, y4) - 1 || y > Math.max(y3, y4) + 1
		) {
			return null;
		}
	}

	return [x, y];
};

/**
 * 判断数据类型
 * 调用方法：Type.isFunction(function() {})      Type.isObject({})。。。。。
 */
function type() {
    var type = {};
    var typeArr = ['String', 'Object', 'Number', 'Array','Undefined', 'Function', 'Null', 'Symbol'];
    for (var i = 0; i < typeArr.length; i++) {
        (function(name) {
            type['is' + name] = function(obj) {
                return Object.prototype.toString.call(obj) === '[object ' + name + ']';
            }
        })(typeArr[i]);
    }
    return type;
};
const Type = type();


exports.isLayer = isLayer;
exports.findFirstShape = findFirstShape;
exports.ensureEachPartObj = ensureEachPartObj;
exports.ensureEachPartEntry = ensureEachPartEntry;
exports.injectPosition = injectPosition;
exports.injectLine = injectLine;
exports.injectLineWithCalc = injectLineWithCalc;
exports.injectText = injectText;
exports.lineCalc = lineCalc;
exports.Type = Type; 
exports.injectMovement = injectMovement;
exports.makePos = makePos;
exports.getAngle = getAngle;
exports.getLength = getLength;
exports.getAngle3 = getAngle3;
exports.getAngle4 = getAngle4
exports.getRayPointByLength = getRayPointByLength;
exports.getRayPointByRate = getRayPointByRate;
exports.getLineCross = getLineCross;
exports.injectAngleWithCalc = injectAngleWithCalc
exports.injectAngleByLine = injectAngleByLine
exports.injectAngleWithCalcByFl = injectAngleWithCalcByFl

