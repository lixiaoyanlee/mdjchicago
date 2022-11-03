const utils = require('./utils');


const radialInjector = (render, r, assets) => {
	
	// // console.log('radialInjector--render, r, assets::',render, r, assets)
    let g = render.fragment.props ? render.fragment.props : { padding: 0}; // 默认不缩进10
    if (g.padding === undefined) {
        g.padding = 0;
    }

    let calc = utils.lineCalc(null, null, render.data.s, render.data.e, r, g); // 计算缩进
    // // // console.log('calc', JSON.stringify(calc), render.data.s, render.data.e);

    // 根据起止点计算角度，角度的取值是-180-180
    let angle = utils.getAngle(calc.vs, calc.ve);

    calc.c = {
        x: calc.vs.x ,
        y: calc.vs.y,
    };

    

    if (render.parts.l) {
        // 只有一条线
        // 把线的端点定位好（只有一头一尾）
        utils.ensureEachPartEntry(render.parts.l._, (p, i, o, s) => {
            utils.injectLineWithCalc(o, calc, assets);
        });
    }
    

    // 现在线已经整理完毕，需要对箭头设定路径
    if (render.parts.a) {
        utils.ensureEachPartEntry(render.parts.a._, (p, i, o, s) => {
            utils.injectMovement(o, [calc.vs, calc.ve], 1);
            if (o.ks && o.ks.r && g.rot !== false) {
                o.ks.r.k = angle;
            }
        });
    }

};

module.exports = radialInjector;