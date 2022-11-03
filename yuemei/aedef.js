const aeDef = {
    fragments: {
        ldmk: {
            type: 'contour',
        },
        c3f5: {
            type: 'contour',
        },
        eyejaw: {
            type: 'contour',
            props: {
                l: {
                    '1_c1': {
                        gs: {
                            padding: [0, 1, 0.9, 1, 1, 0]
                        }
                    },
                    '1_c47': {
                        gs: {
                            padding: [0, 1, 0.9, 1, 1, 0]
                        }
                    }
                }
            }
        },
        eyejawtag: {
            type: 'tag',
        },
        eyenose: {
            type: 'contour',
        },
        tr1_face: {
            type: 'tag',
        },
        tr1_lip: {
            type: 'tag',
        },
        tr1_jaw: {
            type: 'tag',
        },
        tr1_middown: {
            type: 'tag',
        },
        tr1_eye: {
            type: 'tag',
        },
        tr2_eyebrow: {
            type: 'tag',
        },
        tr2_nose: {
            type: 'tag',
        },
        sh_nose: {
            type: 'survey',
            props: {
                padding: 10,
                t: {
                    pos: [0, -5],
                }
            }
        },
        sh_eyel: {
            type: 'survey',
            props: {
                padding: 10,
                t: {
                    pos: [0, -5],
                }
            }
        },
        sh_eyer: {
            type: 'survey',
            props: {
                padding: 10,
                t: {
                    pos: [0, -5],
                }
            }
        },
        sh_eyem: {
            type: 'survey',
            props: {
                padding: 10,
                t: {
                    pos: [0, -5],
                }
            }
        },
        sv_mid: {
            type: 'survey',
            props: {
                rot: false,
                padding: 10,
                t: {
                    size: [60, 50],
                    pos: [0, 0],
                    align: [0, 0],
                }
            }
        },
        sv_down: {
            type: 'survey',
            props: {
                rot: false,
                padding: 10,
                t: {
                    size: [60, 50],
                    pos: [0, 0],
                    align: [0, 0],
                }
            }
        },
        sv_jaw: {
            type: 'survey',
            props: {
                rot: false,
                padding: 10,
                t: {
                    size: [60, 50],
                    pos: [0, 0],
                    align: [0, 0],
                }
            }
        },
        sv_middown: {
            type: 'survey',
            props: {
                rot: false,
                padding: 10,
                t: {
                    size: [60, 30],
                    pos: [0, 0],
                    align: [0, 0],
                }
            }
        },
        radar: {
            type: 'radar',
            props: {
                separateTimeLine: false, // false时使用c作为时间点控制，true时使用各个内容的时间点进行控制
                directs: ['cold', 'mature', 'sweet', 'young'],
            }
        }
    }
};

module.exports = aeDef;
