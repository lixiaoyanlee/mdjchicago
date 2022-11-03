const chicago = require('mdjchicago');
const aeDef = require('./aedef');
const alignedAnimation = require('./export/aligned');

const tagMapping = {
    face: {
        'Melon': '瓜子脸',
        'Almond': '杏仁脸',
        'Ellipse': '椭圆脸',
        'Senior': '高级脸',
        'Square': '方形脸',
        'Circular': '可爱圆脸',
        'Egg': '鹅蛋脸',
        'Long': '长脸',
        'East': '东方脸',
    },

    lip: {
        'Normal': '标准唇',
        'Dudu': '嘟嘟唇',
        'Thick': '性感厚唇',
        'Smile': '微笑唇',
        'Thin': '薄唇',
    },

    eye: {
        'Normal': '标准眼',
        'Small01': '眼睛偏小',
        'Small02': '小眼睛',
        'Big': '大眼睛',
        'No': '小眼睛',
    },

    tip: {
        'Sharp': '尖下巴',
        'Square': '方下巴',
        'Round': '圆下巴',
    },

    middown: (apiRet) => {
        let desc = '适中';
        let ratio = apiRet.cal_info.three_parts_info.facemid_ratio;
        if (ratio >= 0.58) {
            desc = '偏高';
        } else if (ratio <= 0.51) {
            desc = '偏低';
        }
        return `中下庭比${desc}`;
    },

    eyebrow: {
        'EyebrowO': '欧式高挑眉',
        'EyebrowS': '上扬高挑眉',
        'EyebrowQB': '八字眉',
        'EyebrowZ': '标准一字眉',
        'EyebrowLW': '一字落尾眉',
        'EyebrowLY': '温婉柳叶眉',
        'EyebrowY': '标准剑眉',
    },

    nose: {
        'Normal': '鼻翼标准',
        'Narrow': '鼻翼偏窄',
        'Wide02': '鼻翼略宽',
        'Wide01': '鼻翼较宽',
    },

    makeLength: (t, l) => {
        let v = (l/10).toFixed(2);
        if (t) {
            return `${t}\r${v}cm`;
        } else {
            return `${v}cm`;
        }
    },

    makeAngle: (t, a) => {
        let v = a.toFixed(0);
        if (t) {
            return `${t}${v}°`;
        } else {
            return `${v}°`
        }
    }
};

const pointsData = (apiRet) => {
    let pts = {};
    let points = apiRet.points_info.points;

    for (let k in points) {
        if (!points.hasOwnProperty(k)) {
            continue;
        }

        let v = points[k];
        if (k.startsWith('ldmk')) {
            k = k.slice(4);
            pts[k] = v;
        } else if (k.startsWith('point')) {
            k = k.slice(5);
            pts['c' + k] = v;
        }
    }

    return pts;
};

const makeTypeLowerStr = (info) => {
    const spaces = '      ';
    return (info.style + spaces).slice(0, 6) + '+' + info.score.toFixed(2);
};

const createApiData = (apiRet, divSize) => {
    let pts = pointsData(apiRet);
    let r = 750/apiRet.face_align.size.w;
    let photoHeight = apiRet.face_align.size.h * r;
    let radarX = 375 / r;

    if (!divSize) {
        divSize = {
            h: 1624,
            w: 750,
        }
    }

    let divr = 750 / divSize.w;
    let divHeight = divSize.h * divr;

    let radarY;
    if (divHeight > 250 + photoHeight) {
        // div的高度能放下整张照片
        radarY = (photoHeight + (divHeight - photoHeight) / 2) / r;
    } else {
        // div的高度不够放下整张照片，则按div的大小向上计算
        radarY = (divHeight - 125) / r;
    }


    let data = {
        ratio: r,
        fragments: {
            ldmk: {
                p: pts,
            },
            c3f5: {
                p: pts,
            },
            eyejaw: {
                p: pts,
            },
            eyejawtag: {
                angle: tagMapping.makeAngle(null, apiRet.cal_info.face_info.eye_jaw_angle_right),
                _pos: pts['94'],
            },
            eyenose: {
                p: pts,
            },
            tr1_face: {
                _move: [pts.c41, [radarX - 82, radarY]],
                upper: tagMapping.face[apiRet.cal_info.face_info.face_type],
                lower: makeTypeLowerStr(apiRet.type_info.face_type),
            },
            tr1_lip: {
                _move: [pts.c42, [radarX - 82, radarY]],
                upper: tagMapping.lip[apiRet.cal_info.mouse_info.lip_type],
                lower: makeTypeLowerStr(apiRet.type_info.lip_type),
            },
            tr1_jaw: {
                _move: [pts.c43, [radarX - 82, radarY]],
                upper: tagMapping.makeAngle('下巴角度', apiRet.cal_info.jaw_info.jaw_angle),
                lower: makeTypeLowerStr(apiRet.type_info.jaw_angle),
            },
            tr1_middown: {
                _move: [pts.c44, [radarX + 82, radarY]],
                upper: tagMapping.middown(apiRet),
                lower: makeTypeLowerStr(apiRet.type_info.facemid_result),
            },
            tr1_eye: {
                _move: [pts.c45, [radarX + 82, radarY]],
                upper: tagMapping.eye[apiRet.cal_info.eyes_info.eye_type],
                lower: makeTypeLowerStr(apiRet.type_info.eye_type),
            },
            tr2_eyebrow: {
                _move: [pts.c48, [radarX - 82, radarY]],
                upper: tagMapping.eyebrow[apiRet.cal_info.eyebrow_info.eyebrow_type],
                lower: makeTypeLowerStr(apiRet.type_info.eyebrow_type),
            },
            tr2_nose: {
                _move: [pts.c46, [radarX - 82, radarY]],
                upper: tagMapping.nose[apiRet.cal_info.nose_info.nose_type],
                lower: makeTypeLowerStr(apiRet.type_info.nose_type),
            },
            sh_nose: {
                s: pts.c18,
                e: pts.c19,
                v: tagMapping.makeLength('鼻翼宽度', apiRet.cal_info.nose_info.nose_width),
            },
            sh_eyel: {
                s: pts.c14,
                e: pts.c15,
                v: tagMapping.makeLength('左眼宽度', apiRet.cal_info.eyes_info.eye_width_left),
            },
            sh_eyem: {
                s: pts.c15,
                e: pts.c16,
                v: tagMapping.makeLength('内眼角间距', apiRet.cal_info.eyes_info.eye_width_right),
            },
            sh_eyer: {
                s: pts.c16,
                e: pts.c17,
                v: tagMapping.makeLength('右眼宽度', apiRet.cal_info.eyes_info.eye_width_right),
            },
            sv_mid: {
                s: pts.c34,
                e: pts.c35,
                v: tagMapping.makeLength('中庭长度', apiRet.cal_info.three_parts_info.facemid_length),
            },
            sv_down: {
                s: pts.c36,
                e: pts.c37,
                v: tagMapping.makeLength('下颌长度', apiRet.cal_info.three_parts_info.facedown_length),
            },
            sv_jaw: {
                s: pts.c7,
                e: pts.c38,
                v: tagMapping.makeLength('下颌长度', apiRet.cal_info.face_info.mandible_length),
            },
            sv_middown: {
                s: pts.c39,
                e: pts.c40,
                v: tagMapping.makeLength(null, apiRet.cal_info.three_parts_info.facemid_length + apiRet.cal_info.three_parts_info.facedown_length),
            },
            radar: {
                _pos: [radarX, radarY],
                values: [
                    {
                        cold: 0,
                        mature: 0,
                        sweet: 0,
                        young: 0,
                    }, {
                        cold: apiRet.radar_info.cold.one,
                        mature: apiRet.radar_info.mature.one,
                        sweet: apiRet.radar_info.sweet.one,
                        young: apiRet.radar_info.young.one,
                    }, {
                        cold: apiRet.radar_info.cold.two,
                        mature: apiRet.radar_info.mature.two,
                        sweet: apiRet.radar_info.sweet.two,
                        young: apiRet.radar_info.young.two,
                    }, {
                        cold: apiRet.radar_info.cold.three,
                        mature: apiRet.radar_info.mature.three,
                        sweet: apiRet.radar_info.sweet.three,
                        young: apiRet.radar_info.young.three,
                    }
                ]
            }
        }
    };

    return data
};

const yuemeiRender = (apiRet, divSize) => {
    let apiData = createApiData(apiRet, divSize);
    return chicago.afterEffectRender(aeDef, alignedAnimation, apiData);
};

module.exports = yuemeiRender;