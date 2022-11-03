const crumbEnter = (crumbs, next, idx) => {
    let c = '';
    if (typeof(next) === 'string') {
        c = next;
    } else if (idx !== undefined) {
        c = `${idx}.${next.nm}`;
    } else {
        c = `${next.nm}`;
    }

    crumbs.push(c);
    const path = crumbs.join('/');
    // console.info(`\n\n>>>Enter ${c} [/${path}]`);
    return crumbs;
};

const crumbLeave = (crumbs) => {
    const path = crumbs.join('/');
    const c = crumbs.pop();
    // console.info(`Leave ${c} [/${path}]`);
    return c;
};

const doAdjust = (idx, p, adjust, prefix='') => {
    const oldPos = p.slice();
    p[0] += adjust[0];
    p[1] += adjust[1];
    console.info(`${prefix}${idx}: ${oldPos} -> ${p}`);
};

const ensureEach = (obj, func, arrayKey='a', valueKey='k', multiKey='s') => {
    if (!obj || !obj.hasOwnProperty(valueKey)) {
        return;
    }

    const targets = obj[valueKey];

    if (!Array.isArray(targets) || (obj.hasOwnProperty(arrayKey) && obj[arrayKey] === 0)) {
        func(targets, 0, false);
    } else {
        targets.forEach((target, idx) => {
            if (multiKey) {
                target = target[multiKey];
            }

            func(target, idx, true);
        });
    }
};

const adjustAnchorPosition = (adjust, ks, skipAnchor=false) => {
    const anchorAdjust = (p, a) => {
        newAdj = [p[0]-a[0], p[1]-a[1]];
        a[0] = p[0];
        a[1] = p[1];
        return newAdj;
    };

    if (!ks) {
        return adjust;
    }

    let newAdj = adjust.slice();

    if (ks.a.a !== undefined && ks.a.a !== 0) {
        console.error('calcAdjust: Anchor cannot has any animation define');
        throw Error('calcAdjust');
    }

    // 1. 根据上一层的修正，移动位置点（数值将成为基于0,0的坐标）
    // 2. 移动锚点并计算基于本层的修正
    if (ks.p) {
        ensureEach(ks.p, (s, idx) => {
            doAdjust(idx, s, adjust, 'ks.p.k');
            if (idx === 0 && !skipAnchor) {
                newAdj = anchorAdjust(s, ks.a.k);
            }
        });
    }

    console.info(`calcAdjust: adjust point: ${adjust} -> ${newAdj}`);
    return newAdj;
};

const maskAlign = (crumbs, mask, adjust) => {
    // 蒙版
    if (mask.pt && mask.pt.k && mask.pt.k.v) {
        mask.pt.k.v.forEach((vp, idx) => {
            doAdjust(idx, vp, adjust, 'mask.pt.k');
        });
    }
};

const shapeAlignProcessors = {
    gr: (crumbs, shape, curAdj) => { // 组
        if (shape.it) {
            const groupKs = shape.it.find((subShape) => subShape.ty === 'tr' );
            if (groupKs) {
                curAdj = adjustAnchorPosition(curAdj, groupKs);
            }

            shape.it.forEach((subShape, idx) => {
                if (subShape.ty === 'tr') {
                    return;
                }
                shapeAlign(crumbEnter(crumbs, subShape, idx), subShape, curAdj);
                crumbLeave(crumbs);
            });
        }
    },

    sh: (crumbs, shape, curAdj) => { // 路径
        // 依次修改点位
        ensureEach(shape.ks, (k, ik, isMulti) => {
            if (isMulti) {
                // 此时传入的是ks.k[ik].s
                k.forEach((s, is) => {
                    const prefix = `ks.k${ik}.s${is}.v`;
                    s.v.forEach((v, iv) => {
                        doAdjust(iv, v, curAdj, prefix);
                    });
                });
            } else {
                k.v.forEach((v, iv) => {
                    const prefix = `ks.k${ik}.v`;
                    doAdjust(iv, v, curAdj, prefix);
                });
            }
        });
    },

    el: (crumbs, shape, curAdj) => { // 椭圆
        // 依次修改圆心
        ensureEach(shape.p, (k, ik) => {
            const prefix = 's.k';
            doAdjust(ik, k, curAdj, prefix);
        });
    },

    rc: (crumbs, shape, curAdj) => { // 矩形
        // 起点
        ensureEach(shape.p, (k, ik) => {
            const prefix = 'p.k';
            doAdjust(ik, k, curAdj, prefix);
        });
    },

    sr: (crumbs, shape, curAdj) => { // 正多边形和星型
        // 多边形中心
        ensureEach(shape.p, (k, ik) => {
            const prefix = 'p.k';
            doAdjust(ik, k, curAdj, prefix);
        });
    },

    fl: () => {}, // 填充，无对齐项
    st: () => {}, // 描边，无对齐项
    tm: () => {}, // 修建路径，无对齐项

    gs: (crumbs, shape, curAdj) => { // 渐变描边
        // 起点和终点位置
        ensureEach(shape.s, (k, ik) => {
            doAdjust(ik, k, curAdj, 's');
        });

        ensureEach(shape.e, (k, ik) => {
            doAdjust(ik, k, curAdj, 'e');
        });
    },

    gf: (crumbs, shape, curAdj) => { // 渐变填充
        // 起点和终点位置
        ensureEach(shape.s, (k, ik) => {
            doAdjust(ik, k, curAdj, 's');
        });

        ensureEach(shape.e, (k, ik) => {
            doAdjust(ik, k, curAdj, 'e');
        });
    }
};

const shapeAlign = (crumbs, shape, adjust) => {
    // 形状图层处理
    const curAdj = adjustAnchorPosition(adjust, shape.ks);

    // 根据不同的形状类型，进行对应的具体形状处理
    const processor = shapeAlignProcessors[shape.ty];
    if (processor) {
        processor(crumbs, shape, curAdj);
    } else {
        console.warn(`shapeAlign: unsupported shape type: ${shape.ty}`);
    }
};

const defaultAlignProcessor = (crumbs, layer, adjust, assets) => {
    // 对齐图层
    const curAdj = adjustAnchorPosition(adjust, layer.ks);

    // 对齐蒙版
    if (layer.hasMask && layer.masksProperties) {
        layer.masksProperties.forEach((mask, idx) => {
            maskAlign(crumbEnter(crumbs, mask, idx), mask, curAdj);
            crumbLeave(crumbs);
        });
    }

    // 如果内部含有内容，则遍历内容并对齐
    if (layer.shapes) {
        layer.shapes.forEach((shape, idx) => {
            shapeAlign(crumbEnter(crumbs, shape, idx), shape, curAdj);
            crumbLeave(crumbs);
        });
    }

    return curAdj;
};

const layerAlignProcessors = {
    0: (crumbs, layer, adjust, assets) => {
        const curAdj = defaultAlignProcessor(crumbs, layer, adjust, assets);

        // 如果是对预合成的引用，则找到预合成并递归对齐内部的layers
        if (layer.refId) {
            const asset = assets[layer.refId];
            if (!asset) {
                console.error(`layerAlign: asset not found: ${layer.refId}`);
                throw Error('asset not found');
            }

            if (asset.aligned) {
                console.error(`layerAlign: asset re-enter: ${layer.refId}`);
                throw Error('asset re-enter');
            }

            crumbEnter(crumbs, `asset:${asset.idx}.${layer.refId}`, 0);
            asset.aligned = true;

            if (asset.item.layers) {
                asset.item.layers.forEach((subLayer, idx) => {
                    layerAlign(crumbEnter(crumbs, subLayer, idx), subLayer, curAdj, assets);
                    crumbLeave(crumbs);
                });
            }

            crumbLeave(crumbs);
        }
    },
    5: (crumbs, layer, adjust) => {
        // 对于文字类型，不可以移动锚点（锚点和对齐方式有关联），但位置需要根据上层变化而变化
        // 由于本层的相对坐标系实际上没动，所以蒙版也不应该移动
        adjustAnchorPosition(adjust, layer.ks, true);
    }
};

const layerAlign = (crumbs, layer, adjust, assets) => {
    switch (layer.ty) {
        case 0: // 引用预合成
            console.info('layerAlign: type: reference');
            break;
        case 4: // 形状图层
            console.info('layerAlign: type: shapes');
            break;
        case 5: // 文字图层
            console.info('layerAlign: type: text');
            break;
		case 2: // 图片图层
		    console.info('layerAlign: type: images');
		    break;
        default:
            console.warn(`layerAlign: unsupported layer type: ${layer.ty}`);
            // 不知道是啥图层，但是还是要处理基本信息
    }

    // 对图层类型的特殊处理
    const processor = layerAlignProcessors[layer.ty];
    if (processor) {
        processor(crumbs, layer, adjust, assets);
    } else {
        defaultAlignProcessor(crumbs, layer, adjust, assets);
    }
};

const afterEffectAlign = (r) => {
    // 对齐AE导出数据中的所有锚点和位置
    //   将输入对象中的所有层次型内容的坐标系归零（即将锚点和位置置为相等值）

    // 构建assets字典，跳过下划线开头的内容（不参加对齐）
    const assets = {};
    if (r.assets) {
        r.assets.forEach((item, idx) => {
            if (item.id[0] === '_') {
                return;
            }
            assets[item.id] = {
                idx: idx,
                item: item,
                aligned: false
            };
        });
    }

    const crumbs = [];
    const adjust = [0, 0];

    if (r.layers) {
        r.layers.forEach((layer, idx) => {
            layerAlign(crumbEnter(crumbs, layer, idx), layer, adjust, assets);
            crumbLeave(crumbs);
        });
    }
};

exports.afterEffectAlign = afterEffectAlign;