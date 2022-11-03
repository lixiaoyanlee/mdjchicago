const mdjChicago = require('mdjchicago');
const fs = require('fs');
const path = require('path');

const createApiData = (apiRet) => {
    let apiData = {
        ratio: 2,
        fragments: {
            democontour: {
                p: {
                    1: apiRet.data.animation.landmark.contour_right1,
                    2: apiRet.data.animation.landmark.contour_right5,
                    3: apiRet.data.animation.landmark.contour_right9,
                    4: apiRet.data.animation.landmark.contour_right13,
                    5: apiRet.data.animation.landmark.contour_chin,
                }
            },

            demolanev: {
                l: {
                    1: [apiRet.data.animation.survey.eye.divide.vertical[0], null],
                    2: [apiRet.data.animation.survey.eye.divide.vertical[1], null],
                    3: [apiRet.data.animation.survey.eye.divide.vertical[2], null],
                    4: [apiRet.data.animation.survey.eye.divide.vertical[3], null],
                    5: [apiRet.data.animation.survey.eye.divide.vertical[4], null],
                    6: [apiRet.data.animation.survey.eye.divide.vertical[5], null],
                }
            },

            demolaneh: {
                l: {
                    1: [null, apiRet.data.animation.survey.court.divide.horizontal[1]],
                    2: [null, apiRet.data.animation.survey.court.divide.horizontal[2]],
                    3: [[5, 370], apiRet.data.animation.survey.court.divide.horizontal[3]],
                }
            },

            demosurveya: {
                s: [apiRet.data.animation.survey.eye.divide.vertical[5] + 20, 100],
                e: [apiRet.data.animation.survey.eye.divide.vertical[5] - 150, 300],
                v: {
                    l: 'a.24',
                }
            },

            demosurveyb: {
                s: [apiRet.data.animation.survey.eye.divide.vertical[0], apiRet.data.animation.survey.court.divide.horizontal[0] - 100],
                e: [apiRet.data.animation.survey.eye.divide.vertical[5], apiRet.data.animation.survey.court.divide.horizontal[0] - 100],
                v: {
                    w: 'b.24',
                }
            },

            demotag1: {
                upper: {
                    u: '胖脸',
                },
                lower: {
                    lt: 'sweet',
                    lv: '22.24',
                },
                _move: [[20, 20], [375/2 - 50, 812/2 - 50]], //整体位移
            },

            demoradar2: {
                _pos: [375/2, 812*0.9],
                values: [
                    {
                        cold: 0,
                        mature: 0,
                        sweet: 0,
                        young: 0,
                    }, {
                        cold: 8,
                        mature: 10,
                        sweet: 5,
                        young: 12,
                    }, {
                        cold: 35,
                        mature: 70,
                        sweet: 24,
                        young: 42,
                    }, {
                        cold: 70,
                        mature: 82,
                        sweet: 65,
                        young: 88,
                    }
                ]
            }
        }
    };
    return apiData;
};

const main = () => {
    let aeDef = require('./demo/sampledata/aedef');
    let apiRet = require('./demo/model_data.json'); // API返回的结果

    //let apiData = require('./demo/sampledata/apidata'); // 参照用的data，但我们此出处使用真实的模特点位计算
    let apiData = createApiData(apiRet);

    let buf = fs.readFileSync('./demo/aeproject/data.json');
    let aeAnimation = JSON.parse(buf.toString());

    mdjChicago.afterEffectAlign(aeAnimation);
    let align = JSON.stringify(aeAnimation, null, 2);

    aeAnimation = mdjChicago.afterEffectRender(aeDef, aeAnimation, apiData);

    let output = JSON.stringify(aeAnimation, null, 2);
    let html = fs.readFileSync(path.join(__dirname, 'demo', 'tmpl.html'));
    html = html.toString().replace('___ANIMATIONDATA___', output);
    fs.writeFileSync(path.join(__dirname, 'demo', 'output', 'render.html'), html);
    fs.writeFileSync(path.join(__dirname, 'demo', 'output', 'render.json'), output);
    fs.writeFileSync(path.join(__dirname, 'demo', 'output', 'align.json'), align);
};

main();