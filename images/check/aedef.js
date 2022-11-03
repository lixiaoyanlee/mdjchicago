const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		page1_points: {
			type: 'contour',
		},
		page2_points: {
			type: 'contour',
		},

		page3_points: {
			type: 'contour',
		},

		page1_t_root: { //山根
			type: 'tag'
		},
		page1_t_lippeak: { // 唇峰
			type: 'tag'
		},
		page1_t_eyelid: { // 双眼皮
			type: 'tag'
		},

		page2_angle: { //黄金三角度数
			type: 'angle',
			props:  {
				rw:20,
				tw:40
			}
		},

		page2_sv_1: { // 颧弓宽度
			type: 'survey',
			props: {
				padding: 10,
				t: {
					pos: [0, 20],
					align: [0, 0],
				}
			}
		},
		page2_sv_2: { // 下颌宽度
			type: 'survey',
			props: {
				// rot: false, 
				padding: 10,
				t: {
					pos: [0, 20],
					align: [0, 0],
				}
			}
		},

		page3_t_wyjqglb1: { //外眼角颧骨留白 左边 35
			type: 'tag'
		},
		page3_t_wyjqglb2: { //外眼角颧骨留白 右边 37
			type: 'tag'
		},
		page3_t_yjkd1: { //眼睛宽度 左边 33
			type: 'tag'
		},
		page3_t_yjkd2: { //眼睛宽度 右边 34
			type: 'tag'
		},
		page3_t_nyjjj: { // 内眼角间距 36
			type: 'tag'
		},
		page3_sv_1: { // page3_sv_1 ---page3_sv_6 五眼分割线
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_2: { // 
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_3: { // 
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_4: { // page3_sv_1 ---page3_sv_6 五眼分割线
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_5: { //
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_6: { // 
			type: 'radial',
			props: {
				rot: false
			}
		},
		page3_sv_7: { // 人中长度 25-26
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [20, 0],
				}
			}
		},
		page3_sv_8: { //嘴唇厚度 
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [20, 0],
				}
			}
		},
		page3_sv_9: { // 下巴长度 
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [20, 0],
				}
			}
		},
		page3_sv_10: { //下庭长度 34-35
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [20, 0],
				}
			}
		}

	}
};

module.exports = aeDef;
