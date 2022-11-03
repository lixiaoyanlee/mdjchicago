const utils = require('./utils');


const laneInjector = (render, r, assets) => {
    // 对所有的线做调整
    utils.ensureEachPartObj(render.parts.l, (p, i, o, s) => {
        console.log(`- LaneLine: ${i}`);

        let g = null;
        if (render.fragment.props && render.fragment.props.l) {
            g = render.fragment.props.l[i] || render.fragment.props.l._default;
        }

        let d = render.data.l[i];
        if (!d) {
            return;
        }

        // 单值应用到双侧一致，两个值应用到起止
        let v = {
            s: [undefined, undefined],
            e: [undefined, undefined],
        };

        for (let dr in [0, 1]) {
            if (!d[dr]) {
                continue;
            }

            if (typeof(d[dr]) === 'number') {
                // 是一个值
                v.s[dr] = d[dr];
                v.e[dr] = d[dr];
            } else if (Array.isArray(d[dr])) {
                // 数组，分别赋值给起止点
                v.s[dr] = d[dr][0];
                v.e[dr] = d[dr][1];
            }
        }

        utils.injectLine(o, v.s, v.e, r, g, assets);
    })
};

module.exports = laneInjector;