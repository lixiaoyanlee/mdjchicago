
const aeDefSample = {
    fragments: {
        democontour: {
            type: 'contour',
            props: {
                l: { // 线
                    _default: { // 默认
                        padding: 15, // 收缩15
                        gs: { // 渐变描边
                            padding: 40, // 长度40的透明度
                            // or_padding: [20, 40]
                            color: [0,1,0,0,1,1,0,0], //渐变设定
                        }
                    }
                }
            }
        },

        demolanev: {
            type: 'lane',
        },

        demolaneh: {
            type: 'lane',
        },

        demosurveya: {
            type: 'survey',
            props: {
                rot: false, // 不旋转arrow，默认true
                padding: 20, // 收缩20
                t: {
                    size: [140, 60],
                    pos: [0, 0], // 文字定位点相对于线中点的关系（避免设计对不齐，默认0，0）
                    align: [0, 0], // 对齐方式矩阵：
                    // [ -1,  -1]    [ 0, -1]    [ 1, -1]
                    // [ -1,   0]    [ 0,  0]    [ 1,  0]
                    // [ -1,   1]    [ 0,  1]    [ 1,  1]
                }
            }
        },

        demosurveyb: {
            type: 'survey',
            props: {
                padding: 20,
                t: {
                    pos: [0, -20], // 不侵占模式下，文字是按某个边缘对齐的，这里是下边缘中心对齐，离线中心向上20
                }
            }
        },

        demotag1: {
            type: 'tag',
        },

        demoradar2: {
            type: 'radar',
            props: {
                separateTimeLine: false, // false时使用c作为时间点控制，true时使用各个内容的时间点进行控制
                directs: ['cold', 'mature', 'sweet', 'young'],
            }
        }
    }
};

module.exports = aeDefSample;
