const path = require('path');

module.exports = {
    entry: './yuemei/mdjYuemeiAnimation.js',
    output: {
        filename: 'mdj-yuemei-animation.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'mdjYuemeiAnimation',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },

    mode: 'production',
};