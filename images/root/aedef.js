const aeDef = {
	fragments: {
		'user_img_mask': {
			type: 'images',
			props: {}
		},
		'root_points': {
			type: 'contour',
		},
		// 
		'root_sv_1':{
			type: 'survey',
			props: {
				padding: 20
			}        
		},
		'root_sv_2':{
			type: 'survey',
			props: {
				padding: 20
			}        
		},
	}
};

module.exports = aeDef;
