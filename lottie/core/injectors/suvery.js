const utils = require('./utils');

const surveyMaskCalc = (calc, t, angle) => {
    if (!t) {
        return {
            m: {},
            lsc: calc.c,
            lec: calc.c,
        }
    }

    if (!t.pos) {
        t.pos = [0, 0]
    }

    if (!t.align) {
        t.align = [0, 0]
    }

    // 想象中的反向蒙版的定位点和四条边
    let mpos = [calc.c.x + t.pos[0], calc.c.y + t.pos[1]];
    if (!t.size) {
        return {
            m: utils.makePos(null, mpos, 1),
            lsc: calc.c,
            lec: calc.c,
        }
    }

    let ml = mpos[0] + t.size[0] * (t.align[0] - 1) / 2;
    let mr = mpos[0] + t.size[0] * (t.align[0] + 1) / 2;
    let mt = mpos[1] + t.size[1] * (t.align[1] - 1) / 2;
    let mb = mpos[1] + t.size[1] * (t.align[1] + 1) / 2;

    // 找到线与四条边的交点
    let line = [[calc.vs.x, calc.vs.y], [calc.ve.x, calc.ve.y]];
    let ct = utils.getLineCross(line, [[ml, mt], [mr, mt]], true);
    let cb = utils.getLineCross(line, [[ml, mb], [mr, mb]], true);
    let cl = utils.getLineCross(line, [[ml, mt], [ml, mb]], true);
    let cr = utils.getLineCross(line, [[mr, mt], [mr, mb]], true);

    // 实际上最多能找到两个交点，只有一种情况四个值都在——正好从角上穿过。
    // 下面的顺序可以保证这种情况下取得不同的两个点位
    let c1 = ct || cb || cl || cr;
    let c2 = cr || cl || cb || ct;

    // 当然，也有可能一个交点都没有
    if (c1 && c2) {
        let revert = false;

        // 根据线的方向，取不同的交点组合
        if (angle > 0 && angle < 180) {
            // 从下向上（屏幕上从上向下）
            // y值较大的那个是终点，另一个是终点
            revert = c1[1] > c2[1];
        } else if (angle < 0 && angle > -180) {
            revert = c2[1] > c1[1];
        } else if (angle === 0) {
            // 从左向右，x值较大的是终点
            revert = c1[0] > c2[0];
        } else {
            revert = c2[0] > c1[0];
        }

        if (revert) {
            [c1, c2] = [c2, c1];
        }

        return {
            m: utils.makePos(null, mpos, 1),
            lsc: utils.makePos(null, c1, 1),
            lec: utils.makePos(null, c2, 1),
        }
    } else {
        return {
            m: utils.makePos(null, mpos, 1),
            lsc: calc.c,
            lec: calc.c,
        }
    }
};

const suveryInjector = (render, r, assets) => {
    // 两种可能形式：
    // 1) 设计确定标签不会挡住线 (只有一个l:_)
    // 2) 设计确定标签会挡住线(l:s, l:e)
// // console.log('suveryInjector 线箭头',render, r, assets)
    let g = render.fragment.props ? render.fragment.props : { padding: 10}; // 默认两端缩进10
    if (g.padding === undefined) {
        g.padding = 10;
    }

    let calc = utils.lineCalc(null, null, render.data.s, render.data.e, r, g); // 计算缩进
    // // // console.log('calc', JSON.stringify(calc), render.data.s, render.data.e);

    // 根据起止点计算角度，角度的取值是-180-180
    let angle = utils.getAngle(calc.vs, calc.ve);

    calc.c = {
        x: (calc.vs.x + calc.ve.x) / 2,
        y: (calc.vs.y + calc.ve.y) / 2,
    };

    let mask = surveyMaskCalc(calc, render.fragment.props.t, angle);

    if (render.parts.l && render.parts.l._) {
		let ga = calc.ga.slice(0, 8);
		ga.push(0, 1,);
		ga.push(...calc.ga.slice(-4));
        // 只有一条线
        // 把线的端点定位好（只有一头一尾）
        utils.ensureEachPartEntry(render.parts.l._, (p, i, o, s) => {
            utils.injectLineWithCalc(o, {...calc, ga: ga}, assets);
        });
    }
    else {
        // 两条线，各自的起点是不能有透明度渐变的
        // calc.ga 前8个值（颜色）不动，后面的值要修改成[0,1,x,1,1,0]
        let ga = calc.ga.slice(0, 8);
        ga.push(0, 1,);
        ga.push(...calc.ga.slice(-4));

        for (let [line, ls, le] of [[render.parts.l.s, mask.lsc, calc.vs], [render.parts.l.e, mask.lec, calc.ve]])
        {
            utils.ensureEachPartEntry(line, (p, i, o, s) => {
                // // console.log('suvery line inject:: ', o, ls, le);
				utils.injectLineWithCalc(o, {vs: ls, ve: le, ga: ga}, assets);
                // // console.log('after inject::', o);
			});
        }
    }

    // 现在线已经整理完毕，需要对两侧的箭头设定路径
    if (render.parts.a && render.parts.a.s) {
        utils.ensureEachPartEntry(render.parts.a.s, (p, i, o, s) => {
            utils.injectMovement(o, [mask.lsc, calc.vs], 1);
            if (o.ks && o.ks.r && g.rot !== false) {
                o.ks.r.k = angle;
            }
        });
    }

    if (render.parts.a && render.parts.a.e) {
        utils.ensureEachPartEntry(render.parts.a.e, (p, i, o, s) => {
            utils.injectMovement(o, [mask.lec, calc.ve], 1);
            if (o.ks && o.ks.r && g.rot !== false) {
                o.ks.r.k = angle;
            }
        });
    }

    // 最后，对齐text
    if (render.parts.t)  {
        utils.ensureEachPartObj(render.parts.t, (p, i, o, s) => {
            utils.injectPosition(o.ks.p.k, mask.m, 1);
            utils.injectText(o, render.data.v);
        });
    }
};

module.exports = suveryInjector;