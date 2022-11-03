const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		'ica_dfi_dfi_points': {
			type: 'contour',
		},
		// 
		'ica_dfi_dfi_angle': {
			type: 'angle',
			props: {
				rw:45,
				tw:90
			}
		},
		'ica_dfi_ica_points': {
			type: 'contour',
		},
		// 
		'ica_dfi_ica_angle': {
			type: 'angle',
			props: {
			}
		}
	}
};

module.exports = aeDef;
