const yuemeiRender = require('./spirit/apidata.js');

// const styleHtml =

const containerTmpl =
    '<div id="mdjYuemeiContainer" style="display:flex;flex-direction:column;position:relative;overflow:hidden;width:100%;height:100%;    background-color: antiquewhite;">' +
      
        '<div id="mdjYuemeiLottie" style="position:absolute;top:0px;    width: 100%;height: auto;"></div>' +
    '</div>';

const styleInject = () => {
    // 检查lottie是否存在
    if (!window.lottie) {
        console.warn('mdjYuemeiAnimation: Lottie not found in window context, please import before this script');
    }

    // document.head.insertAdjacentHTML('beforeend', styleHtml);
};

styleInject();

let imgSize = {
	w:750,
	h:1624
}
const mdjYuemeiAnimation = (domObj, apiRet, callback) => {
    let domStyles = window.getComputedStyle(domObj);
    let domSize = {
        w: parseInt(domStyles.width),
        h: parseInt(domStyles.height),
    };

    // let imageH = imgSize.h * domSize.w / imgSize.w;

    // 图片高度大于绘图区剪掉1/3宽度，需要'裁剪'图片，否则cutH=0，约等于没有变化
    // let cutH = (imageH - domSize.h ) / 2;
    let calc = {
        // photoTop: -cutH,
        // photoHeight: imageH - cutH, // 上下裁剪的部分实际上是一样高的，所以这里砍掉高度差的一半
        // lottieHeight: domSize.w * 1624 / 750, // lottie的高度，直接用宽度按750/1624计算出来
        animationSize: {
            w: domSize.w,
            h: domSize.h , // 实际动画区域的高度是dom高度+被遮掉的部分
        }
    };
	let containerHtml = containerTmpl;
	// domObj.appendChild(containerHtml)
	 domObj.innerHTML = containerHtml;
    console.log('mdjYuemeiAnimation: position calc', calc);
    let containerObj = document.getElementById('mdjYuemeiContainer');
	
    let lottieParams = {
        container: document.getElementById('mdjYuemeiLottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: yuemeiRender(apiRet),
		// animationData: require('./data.json')
        rendererSettings: {
            progressiveLoad: true,
        },
    };

    let lottieObj = lottie.loadAnimation(lottieParams);
	console.log('lottieObjlottieObjlottieObj',lottieObj)
	lottieObj.play();
    lottieObj.onComplete = () => {
        console.log('mdjYuemeiAnimation: done',lottieObj);
        if (callback) {
            callback(domObj);
        }
    }

};

module.exports = mdjYuemeiAnimation;
