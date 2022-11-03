const chicago = require('../core/index.js');
const aeDef = require('./aedef');
const alignedAnimation = require('./output.json');
const imgSize = {
	w: 750,
	h: 1624
}
const isObject = (o) => {
	return typeof o === 'object' && o !== undefined && o !== null
};

const s1 = {
	x: 10,
	y: 1000
};

const s = {
	x: 100,
	y: 600
};
const o = {
	x: 200,
	y: 1000
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
	console.log('createApiDatacreateApiData',r,divSize)
	let data = {
		ratio: r,
		fragments: {
			angle: {
				// r:s,
				s,
				o,
				e,
				v:'哈哈哈哈',
				fl:[125/255, 89/255, 171/255, 1]
			},
			angle1: {
				s:s1,
				o,
				e:s,
				v:'第二个',
				fl:[125/255, 89/255, 171/255, 1]  
			},
			// angle2: {
			// 	r:{0:o,1:s1,2:s},
			// 	s:s1,
			// 	o,
			// 	e:s,
			// 	v:'第三个',
			// 	fl:[125/255, 89/255, 171/255, 1]
			// }
			}
	};

	return data
};

const yuemeiRender = (apiRet, divSize) => {
	let apiData = createApiData(apiRet, divSize);
	console.log('yuemeiRenderyuemeiRender apiData',apiData,aeDef)
	return chicago.afterEffectRender(aeDef, alignedAnimation, apiData);
};

module.exports = yuemeiRender;
