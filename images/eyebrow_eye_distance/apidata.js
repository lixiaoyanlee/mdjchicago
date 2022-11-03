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

const createApiData = (apiRet, divSize, _imgSize) => {
	const {eyebrow_eye_distance_info:{center_point,magnification,original_points_eyebrow_eye_distance,resize_points_eyebrow_eye_distance}={},align_img} = mockData;
	
	console.log(center_point,magnification,original_points_eyebrow_eye_distance,'createApiData mockData')
	let pts = pointsData(resize_points_eyebrow_eye_distance);
	
	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	divSize = isObject(divSize) ? divSize : {
		h: 750,
		w: 750,
	};
	let r = 750 / imgSize.w;
	let sc = isNaN(Number(magnification)*100) ? undefined : Number(magnification)*100
	// rgb(125 89 171)
	console.log('createApiDatacreateApiData', r, divSize,pts)
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
			'eyebrow_eye_distance_points': {
				p: pts,
			},
			// 
			'eyebrow_eye_distance_sv_v':{
				s: pts['5'],
				e: pts['6'],
				v: '1.5cm',        
			},
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
