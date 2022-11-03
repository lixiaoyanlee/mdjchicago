const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		'face_type_points':{
			type: 'contour',
		},
		'face_type_sv_1':{
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [30, 0],
				}
			}        
		},
		'face_type_sv_2':{
			type: 'survey',
			props: {
				rot: false,
				padding: 10,
				t: {
					pos: [30, 0],
				}
			}        
		},
	}
};

module.exports = aeDef;
