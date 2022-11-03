const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		'degree_fissure_inclination_points': {
			type: 'contour',
		},
		// 
		'degree_fissure_inclination_angle': {
			type: 'angle',
			props: {
				rw:45,
				tw:90
			}
		}
	}
};

module.exports = aeDef;
