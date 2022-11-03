const utils = require('./utils');

const movementInjector = (render, r, assets) => {
    if (render.data._move) {
        utils.injectMovement(render.root, render.data._move, r);
    } else if (render.data._pos) {
        utils.injectPosition(render.root.ks.p.k, render.data._pos, r);
    }
};

module.exports = movementInjector;