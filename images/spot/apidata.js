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
	const {spot_info:{center_point,magnification,original_points_spot,points}={},align_img} = mockData;
	
	console.log(center_point,magnification,'createApiData mockData')
	let pts = pointsData(points);
	
	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	divSize = isObject(divSize) ? divSize : {
		h: 750,
		w: 750,
	};
	let r = 750 / imgSize.w;
	let sc = isNaN(Number(magnification)*100) ? undefined : Number(magnification)*100
	// rgb(125 89 171)
	console.log('createApiDatacreateApiData', r, divSize)
	let data = {
		ratio: r,
		fragments: {
			'user_img_mask': {
				img:{w:512,h:512,url:align_img,scale:r}, //需要替换的图片地址 base64或者网络地址},
				p:center_point, //位置
				a:center_point,
				s:[100,100]
			},
			'spot_move_r': {
				p:[ // 如果是数组
					{fr:1,...pts['1']},
					{fr:2,...pts['3']},
					{fr:3,...pts['3']},
					{fr:4,...pts['5']},
				],
			},
			'spot_move_l': {
				p:[ // 如果是数组
					{fr:1,...pts['1']},
					{fr:2,...pts['2']},
					{fr:3,...pts['2']},
					{fr:4,...pts['4']},
				],
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
