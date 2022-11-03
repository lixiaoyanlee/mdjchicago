const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		'eyebrow_eye_distance_points': {
			type: 'contour',
		},
		// 
		'eyebrow_eye_distance_sv_v':{
			type: 'survey',
			props: {
				rot: false,
				padding: 20,
				t: {
					pos: [30, 0],
				}
			}        
		},
	}
};

module.exports = aeDef;
