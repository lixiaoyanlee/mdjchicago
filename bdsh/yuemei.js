const chicago = require('mdjchicago');
const aeDef = require('./aedef');
const alignedAnimation = require('./output.json');
const imgSize = {
	w: 600,
	h: 1500
}
const isObject = (o) => {
	return typeof o === 'object' && o !== undefined && o !== null
};

const pointsData = (apiRet, pageNum) => {
	const pts = {}
	const pageInfo = isObject(apiRet) ? apiRet.page_info : {}
	const pageNameInfo = isObject(pageInfo) ? pageInfo[`page_${pageNum}_info`] : {}
	const pointsPage = isObject(pageNameInfo) ? pageNameInfo[`points_page_${pageNum}`] : {}
	const points = isObject(pointsPage) ? pointsPage : {}
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
	title: (apiRet, pageNum) => {
		switch (pageNum) {
			case 2:
				return `面部五官分析`;
			case 3:
				return `面部轮廓分析`;
			case 4:
				return `三庭五眼分析`;
			case 5:
				return `面部对称分析`;
		}

	},
	root: {
		'High': '鼻梁偏高',
		'Low': '鼻梁偏低',
		'Normal': '鼻梁适中'
	},
	risorius: {
		1: '有苹果肌',
		0: '无苹果肌'
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
	lipthick: {
		'Thick': '嘴唇偏厚',
		'thin': '嘴唇偏薄',
		'Normal': '嘴唇适中'
	},
	temple: {
		0: '太阳穴饱满',
		1: '太阳穴不饱满' // 太阳穴凹陷
	},
	mandibular: {
		0: '下颌线清晰',
		1: '下颌线不清晰'
	},
	chin: {
		'Sharp': '下巴偏尖',
		'Square': '下巴偏方',
		'Round': '下巴偏圆'
	},

	getDetection: function(apiRet, pageNum) {
		const pageInfo = isObject(apiRet) ? apiRet[`page_${pageNum}_info`] : {};
		const { detection_info }  = pageInfo || {}
		return detection_info;
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
	page5_t_angle: function(apiRet) {
		let num = [1, 2, 3, 4];
		let point = [21, 22, 23, 24];
		let obj = {};
		num.map((item, index) => {
			obj[`page5_t_angle_${item}`] = {
				text: this.makeAngle(null, this.getFeatures(apiRet, 5)[`angle_${item}`]),
				_pos: pointsData(apiRet, 5)[point[index]],
			}
		})
		return obj;
	},
	page5_ri_angle: function(apiRet) {
		let num = [1, 2, 3, 4, 5];
		let point = [6, 7, 8, 9, 10];
		let obj = {};
		num.map((item, index) => {
			obj[`page5_ri_angle${item}`] = {
				s: pointsData(apiRet, 5)['3'],
				e: pointsData(apiRet, 5)[point[index]]
			}
		})
		return obj;
	}
};





const createApiData = (apiRet, divSize, _imgSize) => {
	let pageInfo = isObject(apiRet) ? apiRet.page_info : {};
	let titlePoint = isObject(pageInfo) ? pageInfo.title_point : [null, null];
	let point2 = pointsData(apiRet, 2);
	let point3 = pointsData(apiRet, 3);
	let point4 = pointsData(apiRet, 4);
	let point5 = pointsData(apiRet, 5);
	let features2 = tagMapping.getFeatures(apiRet, 2);
	let features3 = tagMapping.getFeatures(apiRet, 3);
	let features4 = tagMapping.getFeatures(apiRet, 4);

	_imgSize = isObject(_imgSize) ? _imgSize : imgSize;
	divSize = isObject(divSize) ? divSize : {
		h: 1624,
		w: 750,
	};

	let r = 750 / imgSize.w;

	let data = {
		ratio: r,
		fragments: {
			page2_point: {
				p: point2,
			},
			page2_t_title: {
				text: tagMapping.title(apiRet, 2),
				_pos: titlePoint,
			},
			page3_point: {
				p: point3,
			},
			page3_t_title: {
				text: tagMapping.title(apiRet, 3),
				_pos: titlePoint,
			},
			page4_point: {
				p: point4,
			},
			page4_t_title: {
				text: tagMapping.title(apiRet, 4),
				_pos: titlePoint,
			},
			page5_point: {
				p: point5,
			},
			page5_t_title: {
				text: tagMapping.title(apiRet, 5),
				_pos: titlePoint,
			},

			page2_t_root: { //山根
				text: tagMapping.root[features2.root],
				_pos: point2['32'],
			},
			page2_t_risorius: { //苹果肌
				text: tagMapping.risorius[features2.risorius],
				_pos: point2['33'],
			},
			page2_t_lippeak: { // 唇峰
				text: tagMapping.lippeak[features2.lip_peak],
				_pos: point2['31'],
			},
			page2_t_eyelid: { // 双眼皮
				text: tagMapping.eyelid[features2.eyelid_overall],
				_pos: point2['30'],
			},
			page2_t_lipthick: { //嘴唇
				text: tagMapping.lipthick[features2.lip_thickness],
				_pos: point2['34'],
			},

			page3_t_temple: { // 太阳穴
				text: tagMapping.temple[features3.temple],
				_pos: point3['21'],
			},
			page3_t_mandibular: { //下颌线
				text: tagMapping.mandibular[features3.mandibular_line],
				_pos: point3['22'],
			},
			page3_t_chin: { //下巴形状
				text: tagMapping.chin[features3.chin_type],
				_pos: point3['23'],
			},
			page3_sv_zygoma: { // 颧弓宽度
				s: point3['9'],
				e: point3['10'],
				v: tagMapping.makeLength('颧弓宽度', features3.zygoma_length),
			},
			page3_sv_jaw: { // 下颌宽度
				s: point3['12'],
				e: point3['15'],
				v: tagMapping.makeLength('下颌宽度', features3.mandible_width),
			},
			page4_sv_eyelw: { // 左眼宽度 14-15
				s: point4['14'],
				e: point4['15'],
				v: tagMapping.makeLength('左眼宽度', features4.eye_width_left),
			},
			page4_sv_eyerw: { // 右眼宽度 16-17
				s: point4['16'],
				e: point4['17'],
				v: tagMapping.makeLength('右眼宽度', features4.eye_width_right),
			},
			page4_sv_eyein: { // 内眼角间距 36-37
				s: point4['36'],
				e: point4['37'],
				v: tagMapping.makeLength('内眼角间距', features4.eyein_length),
			},
			page4_sv_philtrum: { // 人中长度 28-29
				s: point4['28'],
				e: point4['29'],
				v: tagMapping.makeLength('人中长度', features4.philtrum_length),
			},
			page4_sv_lip: { //嘴唇厚度 30-31
				s: point4['30'],
				e: point4['31'],
				v: tagMapping.makeLength('嘴唇厚度', features4.mouth_height),
			},
			page4_sv_jaw: { // 下巴长度 32 33
				s: point4['32'],
				e: point4['33'],
				v: tagMapping.makeLength('下巴长度', features4.jaw_length),
			},
			page4_sv_facedown: { //下庭长度 34-35
				s: point4['34'],
				e: point4['35'],
				v: tagMapping.makeLength('下庭长度', features4.facedown_length),
			},
			page4_t_facemid: { //中庭长度 38
				text: tagMapping.makeLength('中庭长度', features4.facemid_length),
				_pos: point4['38'],
			},
			page4_ri_3_4: { //
				s: point4['3'],
				e: point4['4'],
			},
			page4_ri_4_5: { //
				s: point4['4'],
				e: point4['5'],
			},
			page5_t_masseter: { //咬肌对称双侧检测 25
				text: '咬肌对称双侧检测',
				_pos: point5['25'],
			},
			page5_t_facelr: { //左右脸角度测量 26
				text: '左右脸角度测量',
				_pos: point5['26'],
			},
			...tagMapping.page5_t_angle(apiRet),
			...tagMapping.page5_ri_angle(apiRet)

		}
	};

	return data
};

const yuemeiRender = (apiRet, divSize) => {
	let apiData = createApiData(apiRet, divSize);
	return chicago.afterEffectRender(aeDef, alignedAnimation, apiData);
};

module.exports = yuemeiRender;
