
const fName = [
	'page2_point',
	'page3_point',
	'page4_point',
	'page5_point',
	'page2_t_title',
	'page3_t_title',
	'page4_t_title',
	'page5_t_title',
	'page2_t_root',
	'page2_t_risorius',
	'page2_t_eyelid',
	'page2_t_lippeak',
	'page2_t_lipthick',
	'page3_point',
	'page3_t_temple',
	'page3_t_mandibular',
	'page3_t_chin',
	'page3_sv_zygoma',
	'page3_sv_jaw',
	'page4_sv_eyelw',
	'page4_sv_eyerw',
	'page4_sv_eyein',
	'page4_sv_philtrum',
	'page4_sv_lip',
	'page4_sv_jaw',
	'page4_sv_facedown',
	'page4_t_facemid',
	'page4_ri_3_4',
	'page4_ri_4_5',
	'page5_t_masseter',
	'page5_t_facelr',
	'page5_t_angle_1',
	'page5_t_angle_2',
	'page5_t_angle_3',
	'page5_t_angle_4',
	'page5_ri_angle1',
	'page5_ri_angle2',
	'page5_ri_angle3',
	'page5_ri_angle4',
	'page5_ri_angle5'
];

function getT(item){
	if(item.indexOf('_t_') > -1){
		return {type: 'tag'};
	}else if(item.indexOf('_point') > -1){
		return {type: 'contour'};
	}else if(item.indexOf('_sv_') > -1){
		return {type: 'survey'};
	}else if(item.indexOf('_ri_') > -1){
		return {type: 'radial'};
	}else {
		return {type: 'any'};
	}
}
function getFragmentObj(){
	let obj = {};
	fName.map((item,index)=>{
		obj[item] = getT(item);
	})
	return obj;
}

const aeDef = {
	fragments: {
		...getFragmentObj(),
		page3_sv_zygoma: { // 颧弓宽度
			type: 'survey',
			props: {
				padding: 10,
				t: {
					size: [145, 64],
					pos: [0, 0],
					align: [0, 0],
				}
			}
		},
		page3_sv_jaw: { // 
			type: 'survey',
			props: {
				// rot: false, 
				padding: 10,
				t: {
					size: [95, 64],
					pos: [0, 0],
					align: [0, 0],
				}
			}
		},
		page4_sv_eyelw: { // 左眼宽度 14-15
			type: 'survey',
			props: {
				// rot: false, 
				padding: 10,
				t: {
					pos: [0, -10],
				}
			}
		},
		page4_sv_eyerw: { // 右眼宽度 16-17
			type: 'survey',
			props: {
				// rot: false, 
				padding: 10,
				t: {
					pos: [0, -10],
				}
			}
		},
		page4_sv_eyein: { // 内眼角间距 36-37
			type: 'survey',
			props: {
				// rot: false, 
				padding: 10,
				t: {
					pos: [0, 10],
				}
			}
		},
		page4_sv_philtrum: { // 人中长度 28-29
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [25, 0],
				}
			}
		},
		page4_sv_lip: { //嘴唇厚度 30-31
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [25, 0],
				}
			}
		},
		page4_sv_jaw: { // 下巴长度 32 33
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [25, 0],
				}
			}
		},
		page4_sv_facedown: { //下庭长度 34-35
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [25, 0],
				}
			}
		},
		page4_ri_3_4: { //
			type: 'radial',
			props: {
				rot: false
			}
		},
		page4_ri_4_5: { //
			type: 'radial',
			props: {
				rot: false,
				padding: 10
			}
		},
		page5_ri_angle2: {
			type: 'radial',
			props: {
				padding: 10
			}
		},
		page5_ri_angle4: {
			type: 'radial',
			props: {
				padding: 10
			}
		}
	}
};

module.exports = aeDef;
