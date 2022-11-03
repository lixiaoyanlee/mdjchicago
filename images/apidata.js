const chicago = require('../core/index.js');
const aeDef = require('./aedef');
const alignedAnimation = require('./output.json');
const mockData = require('./zuichun');
const imgSize = {
	w: 750,
	h: 1624
}
const isObject = (o) => {
	return typeof o === 'object' && o !== undefined && o !== null
};

const p1 = {
	x: 24,
	y: 12
};

const p2 = {
	x: 652,
	y: 160
};
const p = {
	x: 0,
	y: 0
};
const e = {
	x: 500,
	y: 800
};
const rw = 90;
const tw = 180;

const createApiData = (apiRet, divSize, _imgSize) => {
	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	divSize = isObject(divSize) ? divSize : {
		h: 1624,
		w: 750,
	};

	let r = 750 / imgSize.w;
	// rgb(125 89 171)
	console.log('createApiDatacreateApiData', r, divSize)
	let data = {
		ratio: r,
		fragments: {
			'user_img_mask': {
				img:512,h:512,url:'',}, //需要替换的图片地址 base64或者网络地址},
				p:{x:256,y:256,fr:2}, //移动到位置
				a:{x,256,y:390}, // 锚点
				s:{ // 缩放
					fr:2, 
					a:p, //以哪个锚点点缩放
					s:3.3 //缩放的倍数
				}
			},
			// 'moose-s': {
			// 	src:s
			// },
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
