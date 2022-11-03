const path = require('path');

module.exports = {
    entry: './lottie/core/index.js',
	entry: './core/index.js',
    output: {
        filename: 'mdjLottieChicagoAnimation.js',
        path: path.resolve(__dirname, 'dist2'),
        libraryTarget: 'amd',
        library: 'mdjLottieChicagoAnimation',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },

    mode: 'production',
};