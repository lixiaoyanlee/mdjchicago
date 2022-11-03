const utils = require('./utils');


const tagInjector = (render, r, assets) => {
    utils.ensureEachPartObj(render.parts.t, (p, i, o, s) => {
        // console.log(`- SubText: ${i}`,p, i, o, s);

        // 对每个text部分，做字符串替换
        utils.injectText(o, render.data[i])
		// console.log(`- SubText: ${i}做字符串替换`,p, i, o, s);
    })
};

module.exports = tagInjector;