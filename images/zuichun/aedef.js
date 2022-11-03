const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {
				s: {
					fr: 1
				},
				a:{x:256,y:390}
			}
		},
		'lip_thickness_points': {
			type: 'contour',
		},
		// 
		'lip_thickness_sv_v': {
			type: 'survey',
			props: {
				rot: false,
				padding: 20,
				t: {
					pos: [30, 0],
				}
			}
		},
		'lip_thickness_sv_h': {
			type: 'survey',
			props: {
				padding: 20,
				t: {
					pos: [0, 30],
				}
			}
		}
	}
};

module.exports = aeDef;
