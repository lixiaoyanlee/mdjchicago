const chicago = require('../../core/index.js');
const aeDef = require('./aedef');
const alignedAnimation = require('../output.json');
const mockData = require('../loading.json');
const imgSize = {
	w: 512,
	h: 512
}
const isObject = (o) => {
	return typeof o === 'object' && o !== undefined && o !== null
};

const pointsData = (apiRet, pageNum) => {
	const pts = {}
	const pageInfo = isObject(apiRet) ? apiRet[`page_${pageNum}_info`] : {};
	const { points }  = pageInfo || {}
	
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
	
	root: {
		'High': '鼻梁偏高',
		'Low': '鼻梁偏低',
		'Normal': '鼻梁适中'
	},
	
	lippeak: {
		'Yes': '唇峰明显',
		'No': '无唇峰',
		'No_obvious': '唇峰不明显'
	},
	eyelid: {
		'Single': '单眼皮',
		'Double': '双眼皮'
	},
	
	
	getDetection: function(apiRet, pageNum) {
		const pageInfo = isObject(apiRet) ? apiRet[`page_${pageNum}_info`] : {};
		const { detection_info }  = pageInfo || {}
		return detection_info;
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

	}
};





const createApiData = (apiRet, divSize, _imgSize) => {
		console.log('createApiData kaishi ',mockData)
	apiRet = mockData.animation || {}
	console.log('createApiData',apiRet)
	
	let {align_img} = mockData || {};
	
	let point1 = pointsData(apiRet, 1);
	let point2 = pointsData(apiRet, 2);
	let point3 = pointsData(apiRet, 3);
	
	let features1 = tagMapping.getDetection(apiRet, 1);
	let features2 = tagMapping.getDetection(apiRet, 2);
	let features3 = tagMapping.getDetection(apiRet, 3);

	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	
	divSize = isObject(divSize) ? divSize : {
		h: 750,
		w: 750,
	};

	let r = 750 / _imgSize.w;
console.log('....',divSize,r)
	let data = {
		ratio: r,
		fragments: {
			'user_img_mask': {
				img:{w:512,h:512,url:align_img,scale:r}, //需要替换的图片地址 base64或者网络地址},
				p:{x:256,y:256}, //位置
				a:{x:256,y:256},
				s:[100,100]
			},
			page1_points: {
				p: point1,
			},
			page2_points: {
				p: point2,
			},
			
			page3_points: {
				p: point3,
			},
			
			page1_t_root: { //山根
				text: tagMapping.root[features1.root],
				_pos: point1['32'],
			},
			page1_t_lippeak: { // 唇峰
				text: tagMapping.lippeak[features1.lip_peak],
				_pos: point1['34'],
			},
			page1_t_eyelid: { // 双眼皮
				text: tagMapping.eyelid[features1.eyelid.l],
				_pos: point1['33'],
			},
			
			page2_angle:{ //黄金三角度数
				s:point2['9'],
				o:point2['11'],
				e:point2['10'],
				v:tagMapping.makeAngle(null,features2.golden_triangle)
			},
			
			page2_sv_1: { // 颧弓宽度
				s: point2['2'],
				e: point2['6'],
				v: tagMapping.makeLength('颧弓宽度', features2.zygoma_length),
			},
			page2_sv_2: { // 下颌宽度
				s: point2['3'],
				e: point2['7'],
				v: tagMapping.makeLength('下颌宽度', features2.mandible_width),
			},
			
			page3_t_wyjqglb1: { //外眼角颧骨留白 左边 35
				text: tagMapping.makeLength('外眼角颧骨留白', features3.lefteye_empty_length),
				// _pos: point3['35'],
				_pos: {x:(point3['14'].x+point3['16'].x)/2,y:point3['14'].y+30}
			},
			page3_t_wyjqglb2: { //外眼角颧骨留白 右边 37
				text: tagMapping.makeLength('外眼角颧骨留白', features3.righteye_empty_length),
				// _pos: point3['37'],
				_pos: {x:(point3['22'].x+point3['24'].x)/2,y:point3['22'].y+30},
			},
			page3_t_yjkd1: { //眼睛宽度 左边 33
				text: tagMapping.makeLength('眼睛宽度', features3.eye_width_left),
				// _pos: point3['33'],
				_pos: {x:(point3['15'].x+point3['17'].x)/2,y:point3['15'].y-30},
			},
			page3_t_yjkd2: { //眼睛宽度 右边 34
				text: tagMapping.makeLength('眼睛宽度', features3.eye_width_right),
				// _pos: point3['34']
				_pos: {x:(point3['19'].x+point3['21'].x)/2,y:point3['19'].y-30},
			},
			page3_t_nyjjj: { // 内眼角间距 36
				text: tagMapping.makeLength('内眼角间距', features3.eyein_length),
				// _pos: point3['36']
				_pos: {x:(point3['18'].x+point3['20'].x)/2,y:point3['18'].y+30},
			},
			page3_sv_1: { // page3_sv_1 ---page3_sv_6 五眼分割线
				s: point3['13'],
				e: point3['14']
			},
			page3_sv_2: { // 
				s: point3['15'],
				e: point3['16']
			},
			page3_sv_3: { // 
				s: point3['17'],
				e: point3['18']
			},
			page3_sv_4: { // page3_sv_1 ---page3_sv_6 五眼分割线
				s: point3['19'],
				e: point3['20']
			},
			page3_sv_5: { //
				s: point3['21'],
				e: point3['22']
			},
			page3_sv_6: { // 
				s: point3['23'],
				e: point3['24']
			},
			page3_sv_7: { // 人中长度 25-26
				s: point3['25'],
				e: point3['26'],
				v: tagMapping.makeLength('人中长度', features3.philtrum_length),
			},
			page3_sv_8: { //嘴唇厚度 
				s: point3['27'],
				e: point3['28'],
				v: tagMapping.makeLength('嘴唇厚度', features3.mouth_height),
			},
			page3_sv_9: { // 下巴长度 
				s: point3['29'],
				e: point3['30'],
				v: tagMapping.makeLength('下巴长度', features3.jaw_length),
			},
			page3_sv_10: { //下庭长度 34-35
				s: point3['31'],
				e: point3['32'],
				v: tagMapping.makeLength('下庭长度', features3.facedown_length),
			}
		}
	};

	return data
};

const yuemeiRender = (apiRet, divSize) => {
	let apiData = createApiData(apiRet, divSize);
	return chicago.afterEffectRender(aeDef, alignedAnimation, apiData);
};

module.exports = yuemeiRender;
