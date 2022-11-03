const utils = require('./utils');

const contourInjector = (render, r, assets) => {
    // 对所有的点做调整
    utils.ensureEachPartObj(render.parts.p, (p, i, o, s) => {
        // console.log(`- Point: ${i}`);
        utils.injectPosition(o.ks.p.k, render.data.p[i], r);
    });

    // 对所有的线做调整
    utils.ensureEachPartObj(render.parts.l, (p, i, o, s) => {
        // console.log(`- Line: ${i}`);

        // 线的表达方式是l:n1_n2
        let [is, ie] = i.split('_');
        let g = null;
        if (render.fragment.props && render.fragment.props.l) {
            g = render.fragment.props.l[i] || render.fragment.props.l._default;
        }

        utils.injectLine(o, render.data.p[is], render.data.p[ie], r, g, assets);
    })
};

module.exports = contourInjector;