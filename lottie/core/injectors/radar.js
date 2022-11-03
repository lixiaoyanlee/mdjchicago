const utils = require('./utils');

const textFrameCopy = (f, t, text) => {
    return {
        t: t,
        s: {
            s: f.s.s,
            f: f.s.f,
            t: text,
            j: f.s.j,
            tr: f.s.tr,
            lh: f.s.lh,
            ls: f.s.ls,
            fc: f.s.fc.slice(),
        }
    };
};

const injectTimeLine = (coverSh, directs) => {
    let keyFrames = [];
    coverSh.ks.k.forEach((k, ik) => {
        keyFrames.push(k.t);
    });

    for (let dg of directs) {
        if (dg.val) {
            let valTmpl = dg.val.t.d.k[0];
            let valSeq = [];
            for (let t of keyFrames) {
                valSeq.push(textFrameCopy(valTmpl, t, valTmpl.s.t));
            }
            dg.val.t.d.k = valSeq;
        }

        if (dg.pts) {
            let p = dg.pts.ks.p;
            p.a = 1;

            let kspSeq = [];
            for (let t of keyFrames) {
                kspSeq.push({
                    i: {x: 0.833, y: 0.833},
                    o: {x: 0.167, y: 0.167},
                    t: t,
                    s: [0,0,0],
                    to: [0,0,0],
                    ti: [0,0,0],
                })
            }

            dg.pts.ks.p.k = kspSeq;
        }
    }
};

const radarInjector = (render, r, assets) => {
    let directs = [];

    if (!render.parts.d) {
        console.error('invalid radar: no direction line', render.name);
        return;
    }

    let sepTimeLine = render.fragment.props.separateTimeLine || false;

    let cover = render.parts.c._._objs[0];
    let coverSh = cover ? utils.findFirstShape(cover, 'sh', assets) : null;
    if (sepTimeLine && !coverSh) {
        console.error('invalid radar: combined timeline without cover shape', render.name);
        return;
    }

    let coverSeq = [];

    // 根据定义中的方向，找到n个方向的点，参考线
    for (let d of render.fragment.props.directs) {
        let dir = render.parts.d[d]._objs[0];
        if (!dir) {
            console.error('invalid radar dir: ', render.name, d);
            return;
        }

        let dg = {
            name: d,
        };

        if (render.parts.v) {
            dg.val = render.parts.v[d]._objs[0];
            dg.valSeq = [];
        }

        if (render.parts.p) {
            dg.pts = render.parts.p[d]._objs[0];
            dg.pts.ks.p.k.forEach((k, ik) => {
                if (k.to) {
                    k.to = [0, 0, 0];
                }

                if (k.ti) {
                    k.ti = [0, 0, 0];
                }
            })
        }

        let sh = utils.findFirstShape(dir, 'sh', assets);
        if (!sh) {
            console.error('invalid radar dir shape: ', render.name, d);
            return;
        }

        // 找到起止点，并将辅助线的透明度置零
        dg.dir = {
            s: sh.ks.k.v[0],
            e: sh.ks.k.v[1],
        };

        dg.dir.w = dg.dir.e[0] - dg.dir.s[0];
        dg.dir.h = dg.dir.e[1] - dg.dir.s[1];
        dir.ks.o.k = 0;

        directs.push(dg);
    }

    if (!sepTimeLine) {
        injectTimeLine(coverSh, directs);
    }

    for (let step = 0; step < render.data.values.length - 1; step++) {
        let cs = [];
        let ce = [];

        for (let dg of directs) {
            // 对每个过程方向，修改c, p, v
            let is = render.data.values[step][dg.name];
            let ie = render.data.values[step + 1][dg.name];

            let ps = [dg.dir.s[0] + dg.dir.w * is / 100, dg.dir.s[1] + dg.dir.h * is / 100];
            let pe = [dg.dir.s[0] + dg.dir.w * ie / 100, dg.dir.s[1] + dg.dir.h * ie / 100];

            let ts = step * 2;
            let te = step * 2 + 1;

            // 如果有p，则修改p
            if (dg.pts) {
                utils.injectPosition(dg.pts.ks.p.k[ts].s, ps, 1.0);
                utils.injectPosition(dg.pts.ks.p.k[te].s, pe, 1.0);
            }

            // 如果有v，则计算v在这一部分的变化
            if (dg.val) {
                let fs = dg.val.t.d.k[ts];
                let fe = dg.val.t.d.k[te];
                let frameScore = (ie - is) / (fe.t - fs.t); // 步进分数

                let score = is;
                let curScore = Math.round(is).toFixed(0);
                fs.s.t = curScore;
                dg.valSeq.push(fs);

                for (let f = fs.t + 1; f < fe.t; f++) {
                    score = score + frameScore;
                    let ss = Math.round(score).toFixed(0);
                    if (ss !== curScore) {
                        dg.valSeq.push(textFrameCopy(fs, ts + f, ss));
                        curScore = ss;
                    }
                }

                fe.s.t = Math.round(ie).toFixed(0);
                dg.valSeq.push(fe);
            }

            // cover 这一方向的点位
            cs.push(ps);
            ce.push(pe);
        }

        // cover的内容
        coverSeq.push(cs, ce);
    }

    if (coverSh) {
        // cover 部分
        coverSh.ks.k.forEach((k, ik) => {
            k.s[0].v = coverSeq[ik];
        })
    }

    for (let dg of directs) {
        // 个方向的文字部分
        if (dg.val) {
            dg.val.t.d.k = dg.valSeq;
        }
    }
};

module.exports = radarInjector;