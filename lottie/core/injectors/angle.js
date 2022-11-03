const utils = require('./utils');

const calcAngleRadian = function(s, o, e, rw, tw) {
	//s: 起点
	//e: 终点
	//o: 圆心
	//rw: 弧线半径
	//tw: 文字定位点半径

	let angle = utils.getAngle4(s, o, e);
	// ps, po, pe: 在圆弧上的s, o, e 坐标

	let ps = utils.getRayPointByLength(o, s, rw);
	let pe = utils.getRayPointByLength(o, e, rw);

	// mo: ps和pe的中点
	// co: ps和pe的切线交点
	let mo = {
		x: (ps.x + pe.x) / 2,
		y: (ps.y + pe.y) / 2
	};

	let cw = (1 / Math.cos(angle / 2 * Math.PI / 180)) * rw;
	let co = utils.getRayPointByLength(o, mo, cw);
	let po = utils.getRayPointByLength(o, mo, rw);

	// hs, he: 贝塞尔曲线的两个锚点
	let r = (cw - rw) / utils.getLength(co, mo);
	let hs = utils.getRayPointByRate(co, ps, r);
	let he = utils.getRayPointByRate(co, pe, r);

	// 文字锚点
	let pt = utils.getRayPointByLength(o, co, tw);

	return {
		ps: ps,
		pe: pe,
		po: po,
		hs: hs,
		he: he,
		pt: pt,
		angle: angle
	}
};

const angleMaskCalc = (render,r) => {
	let calcr = {},
		calc;
	let g = render.fragment.props ? render.fragment.props : {
		rw: 90,
		tw: 180
	}; // 
	if (g.rw === undefined) {
		g.rw = 90;
	}
	if (g.tw === undefined) {
		g.tw = 180;
	}
	for (let key in render.data) {
		if (key == 's' || key === 'e' || key === 'o') {
			calcr[key] = utils.makePos(null, render.data[key], r)
		}
	}
	calcr.g = Object.assign({},g)
	// calc = calcAngleRadian(calcr.s, calcr.o, calcr.e, g.rw, g.tw)
	// calc.o = calcr.o
	return calcr
}


const angleInjector = (render, r, assets) => {
	// // // console.log('angleInjector angleInjector kaishi', render,r,assets)
	let calcr = angleMaskCalc(render, r)
	// // // console.log('angleInjector calcr', calcr)
	let calc = calcAngleRadian(calcr.s, calcr.o, calcr.e, calcr.g.rw, calcr.g.tw)
	calc.o = {...calcr.o}
	// // console.log('angleInjector 计算的点值:', render, calc, calcr,assets)
	
	// 标识旋转角度
	if (render.parts.r) {
		for (let key in render.parts.r) {
			if (key == 's' || key === 'e' || key === 'o') {
				let c = render.parts.r[key]
				if (c) {
					utils.ensureEachPartEntry(c, (p, i, o, s) => {
						utils.injectLineWithCalc(o, {
							vs: calcr.o,
							ve: calcr.e
						}, assets);
						let rk = o.ks.r.k;
						let ra = o.ks.a.k;
						let rp = o.ks.p.k;
						utils.injectPosition(o.ks.a.k, calcr.o, 1);
						utils.injectPosition(o.ks.p.k, calcr.o, 1);
						if (rk && Array.isArray(rk) && rk.length == 2) {
							let [ps, pe] = rk
							pe.s = [calc.angle]
						}
					});
				}
			}

		}
	}
	
	// 标识线
	if (render.parts.l && render.parts.l.s) {
		utils.ensureEachPartEntry(render.parts.l.s, (p, i, o, s) => {
			utils.injectLineWithCalc(o, {
				vs: calcr.s,
				ve: calcr.o
			}, assets);
		});

	}
	if (render.parts.l && render.parts.l.e) {
		utils.ensureEachPartEntry(render.parts.l.e, (p, i, o, s) => {
			utils.injectLineWithCalc(o, {
				vs: calcr.o,
				ve: calcr.e
			}, assets);
		});
	}
	
	// 标识弧线
	if (render.parts.a && render.parts.a._) {
		utils.ensureEachPartEntry(render.parts.a._, (p, i, o, s) => {
			utils.injectAngleWithCalc(o, calc, assets,r);
		});
	}
	
	// 填充颜色
	if (render.parts.fl && render.parts.fl._) {
		calc.fl = render.data.fl
		utils.ensureEachPartEntry(render.parts.fl._, (p, i, o, s) => {
			utils.injectAngleWithCalcByFl(o, calc, assets);
		});
	}
	
	// // 最后，对齐text
	if (render.parts.t) {
		let { fragment:{props:{t}={}}={} } = render;
		if (!t || typeof t !== 'object') {
			t = {}
		}
		if (!t.pos) {
			t.pos = [0, 0]
		}
		if (!t.align) {
			t.align = [0, 0]
		}
		// // 想象中的反向蒙版的定位点和四条边
		let mpos = [calc.pt.x + t.pos[0], calc.pt.y + t.pos[1]];
		utils.ensureEachPartObj(render.parts.t, (p, i, o, s) => {
			utils.injectPosition(o.ks.p.k, mpos, 1);
			utils.injectText(o, render.data.v);
		});
	}
};

module.exports = angleInjector;
