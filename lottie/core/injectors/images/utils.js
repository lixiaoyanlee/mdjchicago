const utils = require('../utils');
// 类型字典
let type = data => {
	let dist = {
		'[object Array]': 'array',
		'[object Object]': 'object',
		'[object Number]': 'number',
		'[object Function]': 'function',
		'[object String]': 'string',
		'[object Null]': 'null',
		'[object Undefined]': 'undefined'
	};

	return dist[Object.prototype.toString.call(data)];
};
// 深度优先遍历
let deepCopy = data => {
	let newData;

	if (type(data) === 'array') {
		newData = [];
		data.map((item, index) => {
			newData[index] = deepCopy(item);
		});
	} else if (type(data) === 'object') {
		newData = {};
		Object.keys(data).map(item => {
			newData[item] = deepCopy(data[item]);
		});
	} else {
		newData = data;
	}

	return newData;
};

function isUnd(val) {
	return val === undefined || val === null
}
// 表示是否是动画的属性opacity、rotation、position
function isAniVal(k) {
	if (Array.isArray(k)) {
		// 数组类型并且数字第一个对象的t有值时，表示帧动画
		const [first] = k;
		const {
			t
		} = first;
		if (!isUnd(t)) return true
	}
	return false
}

function makeImageScale(trg, pos, r = 1) {
	if (!trg || !pos) {
		return;
	}

	if (trg && Array.isArray(trg) && pos && Array.isArray(pos)) {
		!isUnd(pos[0]) && (trg[0] = pos[0] * r);
		!isUnd(pos[1]) && (trg[1] = pos[1]);
	}
}


// 计算图片缩放
function caleImageScale(o = {}, img = {}, assets = {}) {
	let {
		w: imgW,
		h: imgH
	} = img
	
	if (imgW || imgH) {

		let {
			w: oW,
			h: oH,
			refId
		} = o
		if (!oW || !oH) {
			for (let key in assets) {
				if (key === refId && type(assets[key]) === 'object') {
					oW = assets[key].w
					oH = assets[key].h
				}
			}
		}
		let sx = imgW / oW,
			sy = imgH / oH;
		let {
			ks: {
				s: {
					k: sk
				}
			}
		} = o;

		if (!isNaN(sx) && !isNaN(sy)) {
			if (sx && sy) {
				return [sx, sy]
			} else if (!sx) return [sy, sy]
			else if (!sy) return [sx, sx]
		}

	}
	return [1, 1]
}
// /
function injectImageScale(o = {}, img = {}, r = 1, assets = {}, fr) {
	const {
		scale
	} = img
	if (scale && Array.isArray(scale)) {
		let sx = scale[0],
			sy = scale[1];
		const {
			ks: {
				s: {
					k: sk
				}
			}
		} = o;
		const val = [sx * 100, sy * 100]
		if (isAniVal(sk)) {

			const {
				ks: {
					s: {
						k: imgK
					} = {}
				} = {}
			} = o
			if (typeof fr === 'number') {
				const ind = fr - 1;
				const {
					s: sOld
				} = imgK[ind]
				if (sOld && Array.isArray(sOld)) {
					const [fOld, seOld] = sOld

					imgK.map((item, i) => {
						const {
							s: itemS
						} = item
						if (itemS && Array.isArray(itemS)) {
							const [first, second] = itemS
							const cale = [first / fOld, second / seOld]
							utils.injectPosition(itemS, [val[0] * cale[0], val[1] * cale[1]], r)
							// injectImageScale(itemS, [val[0]*cale[0],val[1]*cale[1]], r)
						}
					})
				}

			} else {

				const {
					s
				} = imgK[imgK.length - 1];
				utils.injectPosition(s, val, r)
			}

		} else {
			utils.injectPosition(sk, val, r)
		}

	}
}
// 计算图片图层 的描点和位置点
function caleImageAP(dataP = {}, dataA = {}, scale = [1, 1], r = 1, isDef) {
	let {
		x: imgAX = 0,
		y: imgAY = 0
	} = dataA
	let {
		x: imgPX = 0,
		y: imgPY = 0
	} = dataP
	// r = 1.3
	
	if (scale && Array.isArray(scale)) {
		const [first, second] = scale
		if (isDef) {
			dataP.x = (imgAX * first + imgPX)
			dataP.y = (imgAY * second + imgPX)
		} else {
			dataA.x = (imgAX - imgPX) / first
			dataA.y = (imgAY - imgPY) / second

			dataP.x = imgAX
			dataP.y = imgAY
		}


	}
}

function injectImagePosition(o = {}, img = {}, r = 1) {

	const {
		ks: {
			p: {
				k: imgK
			} = {},
			a: {
				k: imgA
			} = {}
		} = {}
	} = o
	const {
		p,
		a
	} = img

	if (!p) return;
	
	changeAPUtil(p, imgK, r)
}

function injectImageAP(o = {}, img = {}, r = 1) {
	let {
		a: imgA,
		p: dataP,
		scale,
		defA,
		dataA
	} = img
	const {
		ks: {
			a: {
				k: imgK
			} = {},
			p: {}
		} = {}
	} = o
	
	if (imgK && Array.isArray(imgK)) {
		let {
			x: imgAX,
			y: imgAY
		} = dataA || {}
		let {
			x: imgDefAX = null,
			y: imgDefAY = null
		} = defA || {}
		const [first, second] = imgK

		if (!isUnd(imgAX) && !isUnd(imgAY)) {
			caleImageAP(dataP, dataA, scale, r)
			utils.injectPosition(imgK, dataA, 1) //
			img.p = dataP
		} else if (!isUnd(imgDefAX) && !isUnd(imgDefAY)) {
			dataA = defA // 针对图片的描点 
			caleImageAP(dataP, defA, scale, r, true)
			utils.injectPosition(imgK, defA, 1) //
			img.p = dataP
		} else if ((first !== 0 || second !== 0) && typeof first === 'number' && typeof second === 'number') {

			utils.injectPosition(imgK, [0, 0], r) //
		}
		injectImagePosition(o, img, r)
	}
}

function isChangeImg(url = '') {
	if (typeof url === 'string') {
		if (url.startsWith('http') || url.startsWith('data:image/')) {
			return true
		}
	}
	return false
}
// 图片是否是需要替换
function changeImage(o = {}, img = {}, assets = {}, r = 1) {
	let {
		url,
		w,
		h
	} = img
	const {
		ty,
		refId
	} = o
	if (ty === 2 && isChangeImg(url)) { // 表示是图片
		let refIdImg = assets[refId];

		if (refIdImg) {
			if (w) {
				refIdImg.w = w;
			}
			if (h) {
				refIdImg.h = h;
			}
			refIdImg.p = url;
			refIdImg.e = 1;
		}

	}

}

function changeAPUtil(p, k, r) {
	if (isAniVal(k)) { //表示有动画
	
		if (utils.Type.isArray(p)) {
			if (p.length === k.length) {
				k.map((item, index) => {
					utils.injectPosition(item.s, p[index], r)
				})
			}
		} else {

		}
	} else {
		utils.injectPosition(k, p, r)
	}
}
// 
function injectChangeImageAPS(o = {}, img = {}, assets = {}, r = 1) {
	let {
		a: imgA,
		p: dataP,
		scale,
		defA,
		s: dataS,
		dataA
	} = img
	const {
		ks: {
			a: {
				k: imgAK
			} = {},
			p: {
				k: imgPK
			} = {},
			s: {
				k: imgSK
			} = {}
		} = {}
	} = o
	changeAPUtil(dataA, imgAK, 1)
	changeAPUtil(dataP, imgPK, r)
	changeAPUtil(dataS, imgSK, r)

}

exports.isAniVal = isAniVal
exports.injectImageAP = injectImageAP
exports.injectImageScale = injectImageScale
exports.caleImageScale = caleImageScale
exports.caleImageAP = caleImageAP
exports.changeImage = changeImage
exports.injectChangeImageAPS = injectChangeImageAPS
exports.isChangeImg = isChangeImg
exports.deepCopy = deepCopy
exports.changeAPUtil = changeAPUtil
exports.type = type
