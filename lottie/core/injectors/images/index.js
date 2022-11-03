const utils = require('../utils');
const imageUtils = require('./utils');


const caleImage = (render, o, r = 1) => {
	if (!render) {
		return
	}

	let {
		data: {
			img,
			p,
			a: imgA,
			s: dataS
		} = {},
		fragment: {
			props: {
				isChangeA,
				a: defA,
				s: {
					fr
				} = {}
			} = {}
		} = {}
	} = render

	if (!img || !o) {
		return
	}
	let copyImg = imageUtils.deepCopy(img) || {}
	copyImg.p = p;
	copyImg.isChangeA = isChangeA || false
	copyImg.dataA = imgA
	copyImg.defA = defA
	copyImg.s = dataS
	


	let {
		assets
	} = render
	copyImg.scale = imageUtils.caleImageScale(o, copyImg, assets) || [1, 1]
	
	
	if (imageUtils.isChangeImg(copyImg.url)) {
		imageUtils.changeImage(o, copyImg, assets)
		imageUtils.injectChangeImageAPS(o, copyImg, assets, r)
	} else {
		imageUtils.injectImageAP(o, copyImg, r)
		imageUtils.injectImageScale(o, copyImg, r, assets, fr)
	}
}

const injectImagesMask = (mask,masksPropertiesData,r)=>{
	if(imageUtils.type(mask) === 'array'){
		mask.map((inner,index)=>{
			utils.injectPosition(inner,masksPropertiesData[index],r)
		})
		
	}
}

const calcImagesMask = (hasMaskRoot,masksPropertiesRoot,masksPropertiesData,r=1)=>{
	if(hasMaskRoot && imageUtils.type(masksPropertiesRoot) === 'array'  && imageUtils.type(masksPropertiesData) === 'array'){
		masksPropertiesRoot.map(item=>{
			if(imageUtils.type(item) === 'object'){
				let {pt:{k:{i:maskI,o:maskO,v:maskV}={}}={}} = item
				// injectImagesMask(maskI,masksPropertiesData,r)
				// injectImagesMask(maskO,masksPropertiesData,r)
				injectImagesMask(maskV,masksPropertiesData,r)
			}
		})
	}
}
const imagesInjector = (render, r, assets) => {

	let {
		parts: {
			img,
			img_p
		} = {},
		data: {
			img: imgData,
			p: pData,
			masksProperties:masksPropertiesData
		} = {},root:{hasMask:hasMaskRoot,masksProperties:masksPropertiesRoot}
	} = render
	if (imageUtils.type(img) === 'object') {
		const {
			_: img_,
			a: imgA,
			p: imgP
		} = img
		// 图片调整
		if (imageUtils.type(img_) === 'object') {
			utils.ensureEachPartEntry(img_, (p, i, o, s) => {
				caleImage(render, o, r)
			});
		}
		if (imageUtils.type(imgA) === 'object') {
			// 图片调整
			utils.ensureEachPartEntry(imgA, (p, i, o, s) => {
				caleImage(render, o, r)
			});

		}


	}

	// 只需要更改位置的图片
	if (imageUtils.type(img_p) === 'object') {
		if(imageUtils.type(img_p._) === 'object'){
			utils.ensureEachPartEntry(img_p._, (p, i, o, s) => {
			    let {ks: {p: {k: imgPK} = {}} = {}} = o
				imageUtils.changeAPUtil(pData, imgPK, r)
			});
		}else{
			utils.ensureEachPartObj(img_p, (p, i, o, s) => {
				// // console.logle.log(`- img_p: ${i}`, pData[i]);
				utils.injectPosition(o.ks.p.k, pData[i], r)
			})
		}
	}
	
	calcImagesMask(hasMaskRoot,masksPropertiesRoot,masksPropertiesData,r);

};

module.exports = imagesInjector;
