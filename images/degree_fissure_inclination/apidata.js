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



const createApiData = (apiRet, divSize, _imgSize) => {
	const {degree_fissure_inclination_info:{center_point,magnification,points,eye_angle}={},align_img} = mockData;
	
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
			
			'degree_fissure_inclination_points': {
				p: pts,
			},
			// 
			'degree_fissure_inclination_angle':{
				s:pts['3'],
				o:pts['2'],
				e:pts['1'],
				v:tagMapping.makeLength(null, eye_angle),     
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
