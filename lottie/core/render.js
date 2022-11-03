const Crumbs = require('./crumbs');
const injectors = require('./injectors');

const subNameCheck = (crumbs, obj, render, ty) => {
    if (!obj.nm || !(obj.nm.startsWith(render.name + '-') || obj.nm.startsWith('@-'))) {
        return;
    }

    let parts = render.parts;
    const levels = obj.nm.split('-').slice(1);

    levels.forEach((l) => {
        const ti = l.split(':');
        const t = ti[0];
        const i = ti[1] || '_';

        if (!parts.hasOwnProperty(t)) {
            parts[t] = {};
        }

        if (!parts[t].hasOwnProperty(i)) {
            parts[t][i] = {};
        }

        parts = parts[t][i];
    });

    if (!parts.hasOwnProperty('_objs')) {
        parts._objs = [];
    }

    obj._mdj_objtype = ty;
    parts._objs.push(obj);

    // // console.log(`Collected: ${obj.nm} from: ${crumbs.path()}`);
};

const shapeInnerWalk = (crumbs, render, shape, assets) => {
    subNameCheck(crumbs, shape, render, 'shape.' + shape.ty);

    if (shape.ty === 'gr' && shape.it) {
        shape.it.forEach((subShape, idx) => {
            crumbs.processMute('shapeInnerWalk.subshape', subShape.nm, idx, () => {
                shapeInnerWalk(crumbs, render, shape, assets);
            });
        });
    }
};

const layerInnerWalk = (crumbs, render, layer, fragmentDefs, dataset, renders, assets) => {
    // 对于感兴趣的层，找到所有感兴趣的内容
    // 内容可能是子层级，shape，蒙版

    if (render) {
        // 是已经命中的层级
        // 如果不是顶层，则首先看自己是否应该收录
        if (render.root !== layer) {
            subNameCheck(crumbs, layer, render, 'layer');
        }

        // 检查所有蒙版
        if (layer.hasMask && layer.masksProperties) {
            layer.masksProperties.forEach((mask, idx) => {
                crumbs.processMute('layerInnerWalk.mask', mask.nm, idx, () => {
                    subNameCheck(crumbs, mask, render, 'mask');
                });
            });
        }

        // 如果有shapes，检查所有shapes
        if (layer.shapes) {

        }
    }

    // 如果是ref，则检查所有子层级
    if (layer.refId) {
        const asset = assets[layer.refId];
        if (asset) {
            crumbs.processMute('layerInnerWalk.asset', 'asset', asset.id, () => {
                layersWalk(crumbs, render, asset.layers, fragmentDefs, dataset, renders, assets);
            });
        }
    }

};

const layersWalk = (crumbs, render, layers, fragmentDefs, dataset, renders, assets) => {
    // 遍历所有层，找到感兴趣的层
	if(!Array.isArray(layers))return;
    layers.forEach((layer, idx) => {
        if (fragmentDefs && typeof fragmentDefs ==='object' && fragmentDefs.hasOwnProperty(layer.nm)) {
            crumbs.process('layerWalk', layer.nm, idx, () => {
                const newRender = {
                    name: layer.nm,
                    root: layer,
                    fragment: fragmentDefs[layer.nm],
                    data: dataset[layer.nm] || {},
                    parts: {},
                    assets: assets
                };

                layerInnerWalk(crumbs, newRender, layer, fragmentDefs, dataset, renders, assets);
                renders[newRender.name] = newRender;
            });
        } else {
            crumbs.processMute('layerWalk', layer.nm, idx, () => {
                layerInnerWalk(crumbs, render, layer, fragmentDefs, dataset, renders, assets);
            });
        }
    });
};

const afterEffectRender = (aeDef, aeAnimation, apiData) => {
    // 根据def中的定义，把ae数据中感兴趣的内容抽出来，结合apiData中的数据进行和API数据匹配
    // r = apiData中的坐标放大率
    // // console.log('---afterEffectRenderafterEffectRender--');
    const r = apiData.ratio || 1.0;

    // 创建assets查找表
    const assets = {};
    if (aeAnimation.assets) {
        aeAnimation.assets.forEach((asset) => {
            assets[asset.id] = asset;
        });
    }

    const crumbs = new Crumbs();
    // // console.log('--------crumbs---------',crumbs);
    // 创建renders查找表
    const renders = {};

    layersWalk(crumbs, null, aeAnimation.layers, aeDef.fragments, apiData.fragments, renders, assets);

    for (const rn in renders) {
        // 对每个查找到的render，调用相应type的injector
        if (!renders.hasOwnProperty(rn)) {
            continue;
        }

        const render = renders[rn];
        // // console.log('Injecting fragment: ', render.name, render.fragment.type);

        const injector = injectors[render.fragment.type];
        if (injector) {
            injector(render, r, assets);
        } else {
            console.error('invalid injector for fragment:', render.name);
        }

        injectors.common.movement(render, r, assets);
    }

    return aeAnimation;
};

exports.afterEffectRender = afterEffectRender;