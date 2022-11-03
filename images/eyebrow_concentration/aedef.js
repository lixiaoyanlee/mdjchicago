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
		'eyebrow_concentration_points': {
			type: 'contour',
		},
		
		'eyebrow_concentration_box':{
			type: 'images',
		}
	}
};

module.exports = aeDef;
