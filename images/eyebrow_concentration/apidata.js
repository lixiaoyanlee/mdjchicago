const chicago = require('../../core/index.js');
const aeDef = require('./aedef');
const alignedAnimation = require('../output.json');
const mockData = require('../checkAni.json');
const imgSize = {
	w: 512,
	h: 512
}
const isObject = (o) => {
	return typeof o === 'object' && o !== undefined && o !== null
};

const pointsData = (apiRet, pageNum) => {
	const pts = {}
	const points = isObject(apiRet) ? apiRet : {}
	for (let k in points) {
		if (!points.hasOwnProperty(k)) {
			continue;
		}

		let v = points[k];
		if (k.startsWith('point')) {
			k = k.slice(5);
			// pts['c' + k] = v;
			pts[k] = v;
		}
	}

	return pts;
};
const tagMapping = {
	

	getFeatures: function(apiRet, pageName) {
		const pageInfo = isObject(apiRet) ? apiRet.page_info : {};
		const pageNameInfo = pageInfo[`page_${pageName}_info`];
		let features = isObject(pageNameInfo) ? pageNameInfo[[`features_page_${pageName}`]] : {};
		return features;
	},
	sv: function(apiRet, pageName, s, e, t, l) {
		const d = this.getFeatures(apiRet, pageName)[l];
		return {
			s: pointsData(apiRet, pageName)[s],
			e: pointsData(apiRet, pageName)[e],
			v: tagMapping.makeLength(t, d),
		}
	},
	makeLength: (t, l, type) => {
		try {
			let v = (l / 10).toFixed(2);
			if (t) {
				return `${t}\r${v}cm`;
			} else {
				return `${v}cm`;
			}
		} catch (e) {
			//TODO handle the exception
			return ``;
		}

	},

	makeAngle: (t, a) => {
		try {
			let v = a.toFixed(1);
			if (t) {
				return `${t}${v}°`;
			} else {
				return `${v}°`
			}
		} catch (e) {
			//TODO handle the exception
			return ``
		}

	},
	t_angle: function(apiRet) {
		let num = [1, 2, 3, 4];
		let point = [21, 22, 23, 24];
		let obj = {};
		num.map((item, index) => {
			obj[`face_style_t_angle_${item}`] = {
				text: this.makeAngle(null, this.getFeatures(apiRet, 5)[`angle_${item}`]),
				_pos: pointsData(apiRet, 5)[point[index]],
			}
		})
		return obj;
	},
	ri_angle: function(pts={}) {
		let num = [1, 2, 3, 4, 5];
		let point = [6, 7, 8, 9, 10];
		let obj = {};
		num.map((item, index) => {
			obj[`face_style_ri_angle${item}`] = {
				s: pts['3'],
				e: pts[point[index]]
			}
		})
		return obj;
	}
};

const getLineCross = (l1, l2, seg) => {
	console.log(l1, l2, seg,'getLineCrossge计算两条线的交点tLineCross')
	// 计算两条线的交点, seg = 是否以线段方式求解
	let {x:x1, y:y1} = l1[0];
	let {x:x2, y:y2} = l1[1];
	let {x:x3, y:y3} = l2[0];
	let {x:x4, y:y4} = l2[1];

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


const createApiData = (apiRet, divSize, _imgSize) => {
	const {eyebrow_concentration_info:{center_point,magnification,points}={},align_img} = mockData || {};
	
	console.log(center_point,magnification,points,'createApiData mockData')
	let pts = pointsData(points);
	console.log(pts,'createApiData ptspts')
	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	divSize = isObject(divSize) ? divSize : {
		h: 750,
		w: 750,
	};
	let r = 750 / imgSize.w;
	let sc = isNaN(Number(magnification)*100) ? undefined : Number(magnification)*100
	// rgb(125 89 171)
	console.log('createApiDatacreateApiData', r, divSize)
	
	let rt = getLineCross([pts['1'],pts['2']],[pts['5'],pts['6']],true); //右上
	let lt = getLineCross([pts['1'],pts['2']],[pts['3'],pts['4']],true); // 左上
	let lb = getLineCross([pts['7'],pts['8']],[pts['3'],pts['4']],true); // 右下
	let rb = getLineCross([pts['7'],pts['8']],[pts['5'],pts['6']],true); // 右下
	
	console.log('相交点的计算', rt,lt,lb,rb)
	let data = {
		ratio: r,
		fragments: {
			'user_img_mask': {
				img:{w:512,h:512,url:align_img,scale:r}, //需要替换的图片地址 base64或者网络地址},
				p:[ // 如果是数组
					{fr:1,...center_point},
					{fr:2,x:256,y:256},
					{fr:3,x:256,y:256},
					{fr:4,...center_point},
				], //位置
				a:center_point,
				s:[ // 如果是数组
					[100,100],
					[sc,sc],
					[sc,sc],
					[100,100],
				]
			},
			
			'eyebrow_concentration_points': {
				p: pts,
			},
			'eyebrow_concentration_box':{
				img:{w:0,h:pts['4'].y-pts['3'].y}, //需要替换的图片地址 base64或者网络地址},
				p:[ // 如果是数组
					{fr:1,...pts['3']},
					{fr:2,x:pts['2'].x+156,y:pts['2'].y}
				],
				a:{
					x:156,
					y:0
				},
				masksProperties:[rt,lt,lb,rb]
			}
		}
	};

	return data
};

const yuemeiRender = (apiRet, divSize) => {
	let apiData = createApiData(apiRet, divSize);
	console.log('yuemeiRenderyuemeiRender apiData', apiData, aeDef)
	return chicago.afterEffectRender(aeDef, alignedAnimation, apiData);
};

module.exports = yuemeiRender;
