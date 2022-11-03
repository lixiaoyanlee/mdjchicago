const path = require('path');

module.exports = {
    entry: './images/mdjYuemeiAnimation.js',
    output: {
        filename: 'mdj-yuemei-animation1.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'mdjYuemeiAnimation',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
	devServer: {
	    open: true,
	    // openPage: 'http://debug.local.alipay.net:9999/face-tag.html',
	    // host: '127.0.0.0',
	    host: '192.168.1.53',
	    hot: true,
	    port: 2222,
	  },
    mode: 'production',
};