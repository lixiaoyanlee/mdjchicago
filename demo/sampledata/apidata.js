const apiDataSample = {
    ratio: 1.0,
    fragments: {
        'democontour': {
            p: {
                1: [100, 100],
                2: [200, 200],
                3: [300, 240],
                4: [400, 320],
                5: {x:500, y:400},
            }
        },

        'demolaneh': {
            // 横向泳道
            l: {
                1: [null, 100],
                2: [null, 200],
                3: [[10, 740], 300],
            }
        },

        'demolanev': {
            // 纵向泳道
            l: {
                1: [100, null],
                2: [200, null],
                3: [300, null],
                4: [400, null],
                5: [500, null],
                6: [600, null],
            }
        },

        'demosurveya': {
            // 测量箭头线
            s: [50, 100],
            e: [150, 100],
            v: {
                l: '2.24',
            }
        },

        'demosurveyb': {
            // 测量箭头线
            s: [30, 200],
            e: [170, 200],
            v: {
                w: '3.24',
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

        demotag2: {
            _pos: [50, 50], //整体定位但不位移
        },

        demoradar2: {
            _pos: [375/2, 812*0.7],
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

module.exports = apiDataSample;