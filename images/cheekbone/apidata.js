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
	const {cheekbone_info:{center_point,magnification,original_points_cheekbone}={},align_img} = mockData;
	
	console.log(center_point,magnification,original_points_cheekbone,'createApiData mockData')
	let pts = pointsData(original_points_cheekbone);
	
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
			
			'cheekbone_img_l': {
				img:{w:(pts['2'].x-pts['1'].x),h:(pts['3'].y-pts['1'].y)},
				p:pts['1'],a:{x:(pts['2'].x+pts['1'].x)/2,y:(pts['3'].y+pts['1'].y)/2}
			},
			'cheekbone_img_r': {
				img:{w:(pts['6'].x-pts['5'].x),h:(pts['7'].y-pts['5'].y)},
				p:pts['5'],a:{x:(pts['6'].x+pts['5'].x)/2,y:(pts['7'].y+pts['5'].y)/2}
			},
			// 
			'cheekbone_twinkle':{
				p:pts     
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
