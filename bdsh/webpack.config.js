const path = require('path');

module.exports = {
    entry: './bdsh/mdjYuemeiAnimation.js',
    output: {
        filename: 'mdj-yuemei-animation1.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'mdjYuemeiAnimation',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },

    mode: 'production',
};