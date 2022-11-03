(() => {
	var e = {
			645: (e, t) => {
				const s = (e, t, s) => {
						let r = "";
						r = "string" == typeof t ? t : void 0 !== s ? `${s}.${t.nm}` : `${t.nm}`, e.push(r);
						const n = e.join("/");
						return console.info(`\n\n>>>Enter ${r} [/${n}]`), e
					},
					r = e => {
						const t = e.join("/"),
							s = e.pop();
						return console.info(`Leave ${s} [/${t}]`), s
					},
					n = (e, t, s, r = "") => {
						const n = t.slice();
						t[0] += s[0], t[1] += s[1], console.info(`${r}${e}: ${n} -> ${t}`)
					},
					a = (e, t, s = "a", r = "k", n = "s") => {
						if (!e || !e.hasOwnProperty(r)) return;
						const a = e[r];
						!Array.isArray(a) || e.hasOwnProperty(s) && 0 === e[s] ? t(a, 0, !1) : a.forEach(((e,
							s) => {
								n && (e = e[n]), t(e, s, !0)
							}))
					},
					o = (e, t, s = !1) => {
						if (!t) return e;
						let r = e.slice();
						if (void 0 !== t.a.a && 0 !== t.a.a) throw console.error(
							"calcAdjust: Anchor cannot has any animation define"), Error("calcAdjust");
						return t.p && a(t.p, ((a, o) => {
							var i, l;
							n(o, a, e, "ks.p.k"), 0 !== o || s || (i = a, l = t.a.k, r = [i[0] - l[
								0], i[1] - l[1]], l[0] = i[0], l[1] = i[1], r = r)
						})), console.info(`calcAdjust: adjust point: ${e} -> ${r}`), r
					},
					i = {
						gr: (e, t, n) => {
							if (t.it) {
								const a = t.it.find((e => "tr" === e.ty));
								a && (n = o(n, a)), t.it.forEach(((t, a) => {
									"tr" !== t.ty && (l(s(e, t, a), t, n), r(e))
								}))
							}
						},
						sh: (e, t, s) => {
							a(t.ks, ((e, t, r) => {
								r ? e.forEach(((e, r) => {
									const a = `ks.k${t}.s${r}.v`;
									e.v.forEach(((e, t) => {
										n(t, e, s, a)
									}))
								})) : e.v.forEach(((e, r) => {
									n(r, e, s, `ks.k${t}.v`)
								}))
							}))
						},
						el: (e, t, s) => {
							a(t.p, ((e, t) => {
								n(t, e, s, "s.k")
							}))
						},
						rc: (e, t, s) => {
							a(t.p, ((e, t) => {
								n(t, e, s, "p.k")
							}))
						},
						sr: (e, t, s) => {
							a(t.p, ((e, t) => {
								n(t, e, s, "p.k")
							}))
						},
						fl: () => {},
						st: () => {},
						tm: () => {},
						gs: (e, t, s) => {
							a(t.s, ((e, t) => {
								n(t, e, s, "s")
							})), a(t.e, ((e, t) => {
								n(t, e, s, "e")
							}))
						},
						gf: (e, t, s) => {
							a(t.s, ((e, t) => {
								n(t, e, s, "s")
							})), a(t.e, ((e, t) => {
								n(t, e, s, "e")
							}))
						}
					},
					l = (e, t, s) => {
						const r = o(s, t.ks),
							n = i[t.ty];
						n ? n(e, t, r) : console.warn(`shapeAlign: unsupported shape type: ${t.ty}`)
					},
					c = (e, t, a, i) => {
						const c = o(a, t.ks);
						return t.hasMask && t.masksProperties && t.masksProperties.forEach(((t, a) => {
							((e, t, s) => {
								t.pt && t.pt.k && t.pt.k.v && t.pt.k.v.forEach(((e, t) => {
									n(t, e, s, "mask.pt.k")
								}))
							})(s(e, t, a), t, c), r(e)
						})), t.shapes && t.shapes.forEach(((t, n) => {
							l(s(e, t, n), t, c), r(e)
						})), c
					},
					p = {
						0: (e, t, n, a) => {
							const o = c(e, t, n);
							if (t.refId) {
								const n = a[t.refId];
								if (!n) throw console.error(`layerAlign: asset not found: ${t.refId}`),
									Error("asset not found");
								if (n.aligned) throw console.error(
									`layerAlign: asset re-enter: ${t.refId}`), Error("asset re-enter");
								s(e, `asset:${n.idx}.${t.refId}`, 0), n.aligned = !0, n.item.layers && n
									.item.layers.forEach(((t, n) => {
										f(s(e, t, n), t, o, a), r(e)
									})), r(e)
							}
						},
						5: (e, t, s) => {
							o(s, t.ks, !0)
						}
					},
					f = (e, t, s, r) => {
						switch (t.ty) {
							case 0:
								console.info("layerAlign: type: reference");
								break;
							case 4:
								console.info("layerAlign: type: shapes");
								break;
							case 5:
								console.info("layerAlign: type: text");
								break;
							case 2:
								console.info("layerAlign: type: images");
								break;
							default:
								console.warn(`layerAlign: unsupported layer type: ${t.ty}`)
						}
						const n = p[t.ty];
						n ? n(e, t, s, r) : c(e, t, s)
					};
				t.afterEffectAlign = e => {
					const t = {};
					e.assets && e.assets.forEach(((e, s) => {
						"_" !== e.id[0] && (t[e.id] = {
							idx: s,
							item: e,
							aligned: !1
						})
					}));
					const n = [],
						a = [0, 0];
					e.layers && e.layers.forEach(((e, o) => {
						f(s(n, e, o), e, a, t), r(n)
					}))
				}
			},
			745: e => {
				const t = {
					constructor: s,
					process(e, t, s, r) {
						this.push(`${s}.${t}`);
						const n = this.path();
						console.log(e, "Enter: ", n), r(), console.log(e, "Leave: ", n), this.pop()
					},
					processMute(e, t, s, r) {
						this.push(`${s}.${t}`), r(), this.pop()
					},
					path() {
						return "/" + this.join("/")
					}
				};

				function s(...e) {
					const t = new Array(...e);
					Object.assign(this, t)
				}
				const r = Object.create(Array.prototype);
				Object.keys(t).map((e => {
					Object.defineProperty(r, e, {
						value: t[e],
						enumerable: !1
					})
				})), s.prototype = r, e.exports = s
			},
			618: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					console.log("angleInjector angleInjector kaishi", e, t, s);
					let n = ((e, t) => {
						let s = {},
							n = e.fragment.props ? e.fragment.props : {
								rw: 90,
								tw: 180
							};
						void 0 === n.rw && (n.rw = 90), void 0 === n.tw && (n.tw = 180);
						for (let n in e.data) "s" != n && "e" !== n && "o" !== n || (s[n] = r
							.makePos(null, e.data[n], t));
						return s.g = n, s
					})(e, t);
					console.log("angleInjector calcr", n);
					let a = function(e, t, s, n, a) {
						let o = r.getAngle4(e, t, s),
							i = r.getRayPointByLength(t, e, n),
							l = r.getRayPointByLength(t, s, n),
							c = {
								x: (i.x + l.x) / 2,
								y: (i.y + l.y) / 2
							},
							p = 1 / Math.cos(o / 2 * Math.PI / 180) * n,
							f = r.getRayPointByLength(t, c, p),
							g = r.getRayPointByLength(t, c, n),
							y = (p - n) / r.getLength(f, c);
						return {
							ps: i,
							pe: l,
							po: g,
							hs: r.getRayPointByRate(f, i, y),
							he: r.getRayPointByRate(f, l, y),
							pt: r.getRayPointByLength(t, f, a),
							angle: o
						}
					}(n.s, n.o, n.e, n.g.rw, n.g.tw);
					if (a.o = n.o, console.log("angleInjector 计算的点值:", e, a, n, s), e.parts.r)
						for (let t in e.parts.r)
							if ("s" == t || "e" === t || "o" === t) {
								let o = e.parts.r[t];
								o && r.ensureEachPartEntry(o, ((e, t, o, i) => {
									r.injectLineWithCalc(o, {
										vs: n.o,
										ve: n.e
									}, s);
									let l = o.ks.r.k;
									if (o.ks.a.k, o.ks.p.k, r.injectPosition(o.ks.a.k, n.o, 1),
										r.injectPosition(o.ks.p.k, n.o, 1), l && Array.isArray(
											l) && 2 == l.length) {
										let [e, t] = l;
										t.s = [a.angle]
									}
								}))
							} if (e.parts.l && e.parts.l.s && r.ensureEachPartEntry(e.parts.l.s, ((e, t, a,
							o) => {
							r.injectLineWithCalc(a, {
								vs: n.s,
								ve: n.o
							}, s)
						})), e.parts.l && e.parts.l.e && r.ensureEachPartEntry(e.parts.l.e, ((e, t, a,
						o) => {
							r.injectLineWithCalc(a, {
								vs: n.o,
								ve: n.e
							}, s)
						})), e.parts.a && e.parts.a._ && r.ensureEachPartEntry(e.parts.a._, ((e, n, o,
						i) => {
							r.injectAngleWithCalc(o, a, s, t)
						})), e.parts.fl && e.parts.fl._ && (a.fl = e.data.fl, r.ensureEachPartEntry(e.parts
							.fl._, ((e, t, n, o) => {
								r.injectAngleWithCalcByFl(n, a, s)
							}))), e.parts.t) {
						let {
							fragment: {
								props: {
									t
								} = {}
							} = {}
						} = e;
						t && "object" == typeof t || (t = {}), t.pos || (t.pos = [0, 0]), t.align || (t
							.align = [0, 0]);
						let s = [a.pt.x + t.pos[0], a.pt.y + t.pos[1]];
						r.ensureEachPartObj(e.parts.t, ((t, n, a, o) => {
							r.injectPosition(a.ks.p.k, s, 1), r.injectText(a, e.data.v)
						}))
					}
				}
			},
			990: e => {
				e.exports = (e, t, s) => {}
			},
			854: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					r.ensureEachPartObj(e.parts.p, ((s, n, a, o) => {
						console.log(`- Point: ${n}`), r.injectPosition(a.ks.p.k, e.data.p[n], t)
					})), r.ensureEachPartObj(e.parts.l, ((n, a, o, i) => {
						console.log(`- Line: ${a}`);
						let [l, c] = a.split("_"), p = null;
						e.fragment.props && e.fragment.props.l && (p = e.fragment.props.l[a] ||
							e.fragment.props.l._default), r.injectLine(o, e.data.p[l], e
							.data.p[c], t, p, s)
					}))
				}
			},
			722: (e, t, s) => {
				const r = s(221),
					n = s(359),
					a = (e, t, s = 1) => {
						if (console.log("caleImage 计算的点值:", e), !e) return;
						let {
							data: {
								img: r,
								p: a,
								a: o,
								s: i
							} = {},
							fragment: {
								props: {
									isChangeA: l,
									a: c,
									s: {
										fr: p
									} = {}
								} = {}
							} = {}
						} = e;
						if (!r || !t) return;
						let f = n.deepCopy(r) || {};
						f.p = a, f.isChangeA = l || !1, f.dataA = o, f.defA = c, f.s = i;
						let {
							assets: g
						} = e;
						f.scale = n.caleImageScale(t, f, g) || [1, 1], console.log(
							"imagesInjector 计算的点值:copyImgcopyImg", f), n.isChangeImg(f.url) ? (n
							.changeImage(t, f, g), n.injectChangeImageAPS(t, f, g, s)) : (n.injectImageAP(t,
							f, s), n.injectImageScale(t, f, s, g, p))
					};
				e.exports = (e, t, s) => {
					console.log("imagesInjector 计算的点值:", e, t, s);
					let {
						parts: {
							img: o,
							img_p: i
						} = {},
						data: {
							img: l,
							p: c,
							masksProperties: p
						} = {},
						root: {
							hasMask: f,
							masksProperties: g
						}
					} = e;
					if ("object" === n.type(o)) {
						const {
							_: s,
							a: i,
							p: l
						} = o;
						"object" === n.type(s) && r.ensureEachPartEntry(s, ((s, r, n, o) => {
							a(e, n, t)
						})), "object" === n.type(i) && r.ensureEachPartEntry(i, ((s, r, n, o) => {
							a(e, n, t)
						}))
					}
					"object" === n.type(i) && ("object" === n.type(i._) ? r.ensureEachPartEntry(i._, ((e, s,
						r, a) => {
						let {
							ks: {
								p: {
									k: o
								} = {}
							} = {}
						} = r;
						n.changeAPUtil(c, o, t)
					})) : r.ensureEachPartObj(i, ((e, s, n, a) => {
						console.log(`- img_p: ${s}`, c[s]), r.injectPosition(n.ks.p.k, c[s],
							t)
					}))), ((e, t, s, a = 1) => {
						e && "array" === n.type(t) && "array" === n.type(s) && t.map((e => {
							if ("object" === n.type(e)) {
								let {
									pt: {
										k: {
											i: t,
											o,
											v: i
										} = {}
									} = {}
								} = e;
								((e, t, s) => {
									"array" === n.type(e) && e.map(((e, n) => {
										r.injectPosition(e, t[n], s)
									}))
								})(i, s, a)
							}
						}))
					})(f, g, p, t)
				}
			},
			359: (e, t, s) => {
				const r = s(221);
				let n = e => ({
						"[object Array]": "array",
						"[object Object]": "object",
						"[object Number]": "number",
						"[object Function]": "function",
						"[object String]": "string",
						"[object Null]": "null",
						"[object Undefined]": "undefined"
					} [Object.prototype.toString.call(e)]),
					a = e => {
						let t;
						return "array" === n(e) ? (t = [], e.map(((e, s) => {
							t[s] = a(e)
						}))) : "object" === n(e) ? (t = {}, Object.keys(e).map((s => {
							t[s] = a(e[s])
						}))) : t = e, t
					};

				function o(e) {
					return null == e
				}

				function i(e) {
					if (Array.isArray(e)) {
						const [t] = e, {
							t: s
						} = t;
						if (!o(s)) return !0
					}
					return !1
				}

				function l(e = {}, t = {}, s = [1, 1], r = 1, n) {
					let {
						x: a = 0,
						y: o = 0
					} = t, {
						x: i = 0,
						y: l = 0
					} = e;
					if (s && Array.isArray(s)) {
						const [r, c] = s;
						n ? (e.x = a * r + i, e.y = o * c + i) : (t.x = (a - i) / r, t.y = (o - l) / c, e.x = a,
							e.y = o)
					}
				}

				function c(e = "") {
					return !("string" != typeof e || !e.startsWith("http") && !e.startsWith("data:image/"))
				}

				function p(e, t, s) {
					i(t) ? r.Type.isArray(e) && e.length === t.length && t.map(((t, n) => {
						r.injectPosition(t.s, e[n], s)
					})) : r.injectPosition(t, e, s)
				}
				t.isAniVal = i, t.injectImageAP = function(e = {}, t = {}, s = 1) {
					let {
						a: n,
						p: a,
						scale: i,
						defA: c,
						dataA: f
					} = t;
					const {
						ks: {
							a: {
								k: g
							} = {},
							p: {}
						} = {}
					} = e;
					if (g && Array.isArray(g)) {
						let {
							x: n,
							y
						} = f || {}, {
							x: d = null,
							y: h = null
						} = c || {};
						const [u, k] = g;
						o(n) || o(y) ? o(d) || o(h) ? 0 === u && 0 === k || "number" != typeof u ||
							"number" != typeof k || r.injectPosition(g, [0, 0], s) : (f = c, l(a, c, i, s, !
								0), r.injectPosition(g, c, 1), t.p = a) : (l(a, f, i, s), r.injectPosition(
								g, f, 1), t.p = a),
							function(e = {}, t = {}, s = 1) {
								const {
									ks: {
										p: {
											k: r
										} = {},
										a: {
											k: n
										} = {}
									} = {}
								} = e, {
									p: a,
									a: o
								} = t;
								a && p(a, r, s)
							}(e, t, s)
					}
				}, t.injectImageScale = function(e = {}, t = {}, s = 1, n = {}, a) {
					const {
						scale: o
					} = t;
					if (o && Array.isArray(o)) {
						let t = o[0],
							n = o[1];
						const {
							ks: {
								s: {
									k: l
								}
							}
						} = e, c = [100 * t, 100 * n];
						if (i(l)) {
							const {
								ks: {
									s: {
										k: t
									} = {}
								} = {}
							} = e;
							if (console.log("injectImageScale 有动画", a, t, c), "number" == typeof a) {
								const e = a - 1,
									{
										s: n
									} = t[e];
								if (n && Array.isArray(n)) {
									const [e, a] = n;
									t.map(((t, n) => {
										const {
											s: o
										} = t;
										if (o && Array.isArray(o)) {
											const [t, n] = o, i = [t / e, n / a];
											console.log("injectImageScale 有动画 更改", o, [c[0] * i[
												0], c[1] * i[1]]), r.injectPosition(o, [c[
												0] * i[0], c[1] * i[1]
											], s)
										}
									}))
								}
							} else {
								const {
									s: e
								} = t[t.length - 1];
								r.injectPosition(e, c, s)
							}
						} else r.injectPosition(l, c, s)
					}
				}, t.caleImageScale = function(e = {}, t = {}, s = {}) {
					let {
						w: r,
						h: a
					} = t;
					if (r || a) {
						let {
							w: t,
							h: o,
							refId: i
						} = e;
						if (!t || !o)
							for (let e in s) e === i && "object" === n(s[e]) && (t = s[e].w, o = s[e].h);
						let l = r / t,
							c = a / o,
							{
								ks: {
									s: {
										k: p
									}
								}
							} = e;
						if (!isNaN(l) && !isNaN(c)) {
							if (l && c) return [l, c];
							if (!l) return [c, c];
							if (!c) return [l, l]
						}
					}
					return [1, 1]
				}, t.caleImageAP = l, t.changeImage = function(e = {}, t = {}, s = {}, r = 1) {
					let {
						url: n,
						w: a,
						h: o
					} = t;
					const {
						ty: i,
						refId: l
					} = e;
					if (2 === i && c(n)) {
						let e = s[l];
						e && (a && (e.w = a), o && (e.h = o), e.p = n, e.e = 1)
					}
				}, t.injectChangeImageAPS = function(e = {}, t = {}, s = {}, r = 1) {
					let {
						a: n,
						p: a,
						scale: o,
						defA: i,
						s: l,
						dataA: c
					} = t;
					const {
						ks: {
							a: {
								k: f
							} = {},
							p: {
								k: g
							} = {},
							s: {
								k: y
							} = {}
						} = {}
					} = e;
					p(c, f, 1), p(a, g, r), p(l, y, r)
				}, t.isChangeImg = c, t.deepCopy = a, t.changeAPUtil = p, t.type = n
			},
			798: (e, t, s) => {
				t.contour = s(854), t.lane = s(190), t.survey = s(765), t.tag = s(253), t.any = s(990), t
					.radar = s(866), t.radial = s(859), t.angle = s(618), t.images = s(722), t.common = {
						movement: s(255)
					}
			},
			190: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					r.ensureEachPartObj(e.parts.l, ((n, a, o, i) => {
						console.log(`- LaneLine: ${a}`);
						let l = null;
						e.fragment.props && e.fragment.props.l && (l = e.fragment.props.l[a] ||
							e.fragment.props.l._default);
						let c = e.data.l[a];
						if (!c) return;
						let p = {
							s: [void 0, void 0],
							e: [void 0, void 0]
						};
						for (let e in [0, 1]) c[e] && ("number" == typeof c[e] ? (p.s[e] = c[e],
							p.e[e] = c[e]) : Array.isArray(c[e]) && (p.s[e] = c[e][0], p
							.e[e] = c[e][1]));
						r.injectLine(o, p.s, p.e, t, l, s)
					}))
				}
			},
			255: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					e.data._move ? r.injectMovement(e.root, e.data._move, t) : e.data._pos && r
						.injectPosition(e.root.ks.p.k, e.data._pos, t)
				}
			},
			866: (e, t, s) => {
				const r = s(221),
					n = (e, t, s) => ({
						t,
						s: {
							s: e.s.s,
							f: e.s.f,
							t: s,
							j: e.s.j,
							tr: e.s.tr,
							lh: e.s.lh,
							ls: e.s.ls,
							fc: e.s.fc.slice()
						}
					});
				e.exports = (e, t, s) => {
					let a = [];
					if (!e.parts.d) return void console.error("invalid radar: no direction line", e.name);
					let o = e.fragment.props.separateTimeLine || !1,
						i = e.parts.c._._objs[0],
						l = i ? r.findFirstShape(i, "sh", s) : null;
					if (o && !l) return void console.error(
						"invalid radar: combined timeline without cover shape", e.name);
					let c = [];
					for (let t of e.fragment.props.directs) {
						let n = e.parts.d[t]._objs[0];
						if (!n) return void console.error("invalid radar dir: ", e.name, t);
						let o = {
							name: t
						};
						e.parts.v && (o.val = e.parts.v[t]._objs[0], o.valSeq = []), e.parts.p && (o.pts = e
							.parts.p[t]._objs[0], o.pts.ks.p.k.forEach(((e, t) => {
								e.to && (e.to = [0, 0, 0]), e.ti && (e.ti = [0, 0, 0])
							})));
						let i = r.findFirstShape(n, "sh", s);
						if (!i) return void console.error("invalid radar dir shape: ", e.name, t);
						o.dir = {
								s: i.ks.k.v[0],
								e: i.ks.k.v[1]
							}, o.dir.w = o.dir.e[0] - o.dir.s[0], o.dir.h = o.dir.e[1] - o.dir.s[1], n.ks.o
							.k = 0, a.push(o)
					}
					o || ((e, t) => {
						let s = [];
						e.ks.k.forEach(((e, t) => {
							s.push(e.t)
						}));
						for (let e of t) {
							if (e.val) {
								let t = e.val.t.d.k[0],
									r = [];
								for (let e of s) r.push(n(t, e, t.s.t));
								e.val.t.d.k = r
							}
							if (e.pts) {
								e.pts.ks.p.a = 1;
								let t = [];
								for (let e of s) t.push({
									i: {
										x: .833,
										y: .833
									},
									o: {
										x: .167,
										y: .167
									},
									t: e,
									s: [0, 0, 0],
									to: [0, 0, 0],
									ti: [0, 0, 0]
								});
								e.pts.ks.p.k = t
							}
						}
					})(l, a);
					for (let t = 0; t < e.data.values.length - 1; t++) {
						let s = [],
							o = [];
						for (let i of a) {
							let a = e.data.values[t][i.name],
								l = e.data.values[t + 1][i.name],
								c = [i.dir.s[0] + i.dir.w * a / 100, i.dir.s[1] + i.dir.h * a / 100],
								p = [i.dir.s[0] + i.dir.w * l / 100, i.dir.s[1] + i.dir.h * l / 100],
								f = 2 * t,
								g = 2 * t + 1;
							if (i.pts && (r.injectPosition(i.pts.ks.p.k[f].s, c, 1), r.injectPosition(i.pts
									.ks.p.k[g].s, p, 1)), i.val) {
								let e = i.val.t.d.k[f],
									t = i.val.t.d.k[g],
									s = (l - a) / (t.t - e.t),
									r = a,
									o = Math.round(a).toFixed(0);
								e.s.t = o, i.valSeq.push(e);
								for (let a = e.t + 1; a < t.t; a++) {
									r += s;
									let t = Math.round(r).toFixed(0);
									t !== o && (i.valSeq.push(n(e, f + a, t)), o = t)
								}
								t.s.t = Math.round(l).toFixed(0), i.valSeq.push(t)
							}
							s.push(c), o.push(p)
						}
						c.push(s, o)
					}
					l && l.ks.k.forEach(((e, t) => {
						e.s[0].v = c[t]
					}));
					for (let e of a) e.val && (e.val.t.d.k = e.valSeq)
				}
			},
			859: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					console.log("radialInjector--render, r, assets::", e, t, s);
					let n = e.fragment.props ? e.fragment.props : {
						padding: 0
					};
					void 0 === n.padding && (n.padding = 0);
					let a = r.lineCalc(null, null, e.data.s, e.data.e, t, n);
					console.log("calc", JSON.stringify(a), e.data.s, e.data.e);
					let o = r.getAngle(a.vs, a.ve);
					a.c = {
						x: a.vs.x,
						y: a.vs.y
					}, e.parts.l && r.ensureEachPartEntry(e.parts.l._, ((e, t, n, o) => {
						r.injectLineWithCalc(n, a, s)
					})), e.parts.a && r.ensureEachPartEntry(e.parts.a._, ((e, t, s, i) => {
						r.injectMovement(s, [a.vs, a.ve], 1), s.ks && s.ks.r && !1 !== n.rot &&
							(s.ks.r.k = o)
					}))
				}
			},
			765: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					console.log("suveryInjector 线箭头", e, t, s);
					let n = e.fragment.props ? e.fragment.props : {
						padding: 10
					};
					void 0 === n.padding && (n.padding = 10);
					let a = r.lineCalc(null, null, e.data.s, e.data.e, t, n);
					console.log("calc", JSON.stringify(a), e.data.s, e.data.e);
					let o = r.getAngle(a.vs, a.ve);
					a.c = {
						x: (a.vs.x + a.ve.x) / 2,
						y: (a.vs.y + a.ve.y) / 2
					};
					let i = ((e, t, s) => {
						if (!t) return {
							m: {},
							lsc: e.c,
							lec: e.c
						};
						t.pos || (t.pos = [0, 0]), t.align || (t.align = [0, 0]);
						let n = [e.c.x + t.pos[0], e.c.y + t.pos[1]];
						if (!t.size) return {
							m: r.makePos(null, n, 1),
							lsc: e.c,
							lec: e.c
						};
						let a = n[0] + t.size[0] * (t.align[0] - 1) / 2,
							o = n[0] + t.size[0] * (t.align[0] + 1) / 2,
							i = n[1] + t.size[1] * (t.align[1] - 1) / 2,
							l = n[1] + t.size[1] * (t.align[1] + 1) / 2,
							c = [
								[e.vs.x, e.vs.y],
								[e.ve.x, e.ve.y]
							],
							p = r.getLineCross(c, [
								[a, i],
								[o, i]
							], !0),
							f = r.getLineCross(c, [
								[a, l],
								[o, l]
							], !0),
							g = r.getLineCross(c, [
								[a, i],
								[a, l]
							], !0),
							y = r.getLineCross(c, [
								[o, i],
								[o, l]
							], !0),
							d = p || f || g || y,
							h = y || g || f || p;
						if (d && h) {
							let e = !1;
							return e = s > 0 && s < 180 ? d[1] > h[1] : s < 0 && s > -180 ? h[1] >
								d[1] : 0 === s ? d[0] > h[0] : h[0] > d[0], e && ([d, h] = [h,
								d]), {
									m: r.makePos(null, n, 1),
									lsc: r.makePos(null, d, 1),
									lec: r.makePos(null, h, 1)
								}
						}
						return {
							m: r.makePos(null, n, 1),
							lsc: e.c,
							lec: e.c
						}
					})(a, e.fragment.props.t, o);
					if (e.parts.l && e.parts.l._) {
						let t = a.ga.slice(0, 8);
						t.push(0, 1), t.push(...a.ga.slice(-4)), r.ensureEachPartEntry(e.parts.l._, ((e, n,
							o, i) => {
							r.injectLineWithCalc(o, {
								...a,
								ga: t
							}, s)
						}))
					} else {
						let t = a.ga.slice(0, 8);
						t.push(0, 1), t.push(...a.ga.slice(-4));
						for (let [n, o, l] of [
								[e.parts.l.s, i.lsc, a.vs],
								[e.parts.l.e, i.lec, a.ve]
							]) r.ensureEachPartEntry(n, ((e, n, a, i) => {
							console.log("suvery line inject:: ", a, o, l), r.injectLineWithCalc(
								a, {
									vs: o,
									ve: l,
									ga: t
								}, s), console.log("after inject::", a)
						}))
					}
					e.parts.a && e.parts.a.s && r.ensureEachPartEntry(e.parts.a.s, ((e, t, s, l) => {
						r.injectMovement(s, [i.lsc, a.vs], 1), s.ks && s.ks.r && !1 !== n.rot &&
							(s.ks.r.k = o)
					})), e.parts.a && e.parts.a.e && r.ensureEachPartEntry(e.parts.a.e, ((e, t, s,
					l) => {
						r.injectMovement(s, [i.lec, a.ve], 1), s.ks && s.ks.r && !1 !== n.rot &&
							(s.ks.r.k = o)
					})), e.parts.t && r.ensureEachPartObj(e.parts.t, ((t, s, n, a) => {
						r.injectPosition(n.ks.p.k, i.m, 1), r.injectText(n, e.data.v)
					}))
				}
			},
			253: (e, t, s) => {
				const r = s(221);
				e.exports = (e, t, s) => {
					r.ensureEachPartObj(e.parts.t, ((t, s, n, a) => {
						console.log(`- SubText: ${s}`, t, s, n, a), r.injectText(n, e.data[s]),
							console.log(`- SubText: ${s}做字符串替换`, t, s, n, a)
					}))
				}
			},
			221: (e, t) => {
				const s = (e, t, n) => {
						let a = null;
						if (e.refId) {
							let r = n[e.refId];
							if (r)
								for (let e of r.layers)
									if (a = s(e, t, n), a) return a
						} else if (e.shapes)
							for (let s of e.shapes)
								if (a = r(s, t), a) return a;
						return null
					},
					r = (e, t) => {
						if (e.ty === t) return e;
						if ("gr" === e.ty && e.it)
							for (let s of e.it) {
								let e = r(s, t);
								if (e) return e
							}
						return null
					},
					n = (e, t, n) => "number" == typeof e.ty ? s(e, t, n) : r(e, t, n),
					a = (e, t, s, r) => {
						console.log("ensureEachPartEntry innner", e, t, s, r), e._objs ? e._objs.forEach((e => {
							t(s, r, e, null)
						})) : t(s, r, null, e)
					},
					o = (e, t, s) => {
						let r, n;
						t ? Array.isArray(t) ? (r = t[0], n = t[1]) : (r = t.x, n = t.y) : (r = void 0, n =
							void 0);
						let a = e ? {
							x: e[0],
							y: e[1]
						} : {
							x: void 0,
							y: void 0
						};
						return null != r && (a.x = r * s), null != n && (a.y = n * s), a
					},
					i = (e, t, s) => {
						if (!e || !t) return;
						let r = o(e, t, s);
						e[0] = r.x, e[1] = r.y
					},
					l = (e, t, s, r, n, a) => {
						s = o(e, s, n), r = o(t, r, n);
						let i = a && a.gs && a.gs.color ? a.gs.color.slice() : [0, 1, 1, 1, 1, 1, 1, 1];
						if (a) {
							(e => {
								if (!e._adjusted) {
									for (let t of [e, e.gs]) t && t.padding && ("number" == typeof t
										.padding ? t.padding = {
											s: t.padding,
											e: t.padding
										} : Array.isArray(t.padding) || (t.padding = {
											s: t.padding.s || 0,
											e: t.padding.e || 0
										}));
									e._adjusted = !0
								}
							})(a);
							let e = r.x - s.x,
								t = r.y - s.y,
								n = (e ** 2 + t ** 2) ** .5;
							a.padding && (s.x += e / n * a.padding.s, s.y += t / n * a.padding.s, r.x -= e / n *
									a.padding.e, r.y -= t / n * a.padding.e, n -= a.padding.s, n -= a.padding.e
									), a.gs && a.gs.padding ? Array.isArray(a.gs.padding) ? i.push(...a.gs
									.padding) : (i.push(0, 0, a.gs.padding.s / n, 1), i.push(1 - a.gs.padding
									.e / n, 1, 1, 0)) : i.push(0, 0, .1, 1, .9, 1, 1, 0)
						} else i.push(0, 0, .1, 1, .9, 1, 1, 0);
						return {
							vs: s,
							ve: r,
							ga: i
						}
					},
					c = (e, t) => {
						let s = t.x - e.x,
							r = t.y - e.y;
						return 0 == r ? s > 0 ? 0 : -180 : 180 * Math.atan2(r, s) / Math.PI
					},
					p = (e, t) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)),
					f = function() {
						for (var e = {}, t = ["String", "Object", "Number", "Array", "Undefined", "Function",
								"Null", "Symbol"
							], s = 0; s < t.length; s++) ! function(t) {
							e["is" + t] = function(e) {
								return Object.prototype.toString.call(e) === "[object " + t + "]"
							}
						}(t[s]);
						return e
					}();
				t.isLayer = e => "number" == typeof e.ty, t.findFirstShape = n, t.ensureEachPartObj = (e,
				t) => {
					for (let s in e) {
						if (!e.hasOwnProperty(s)) continue;
						let r = e[s];
						a(r, t, e, s)
					}
				}, t.ensureEachPartEntry = a, t.injectPosition = i, t.injectLine = (e, t, s, r, a, o) => {
					let c = n(e, "sh", o),
						p = n(e, "gs", o);
					if (c) {
						let [e, n] = c.ks.k.v, o = l(e, n, t, s, r, a);
						i(e, o.vs, 1), i(n, o.ve, 1), p && (i(p.s.k, o.vs, 1), i(p.e.k, o.ve, 1), p.g.k.k =
							o.ga)
					}
				}, t.injectLineWithCalc = (e, t, s) => {
					let r = n(e, "sh", s),
						a = n(e, "gs", s);
					if (r) {
						let [e, s] = r.ks.k.v;
						i(e, t.vs, 1), i(s, t.ve, 1), a && (i(a.s.k, t.vs, 1), i(a.e.k, t.ve, 1), a.g.k.k =
							t.ga)
					}
				}, t.injectText = (e, t) => {
					if (e && e.t && e.t.d && e.t.d.k)
						for (let s of e.t.d.k) {
							let e = s.s;
							if (t)
								if ("string" == typeof t) e.t = t;
								else
									for (let s in t) t.hasOwnProperty(s) && (e.t = e.t.replace(`{${s}}`, t[
										s]))
						}
				}, t.lineCalc = l, t.Type = f, t.injectMovement = (e, t, s) => {
					if (e && t)
						if (e.ks && e.ks.p && 0 !== e.ks.p.a && e.ks.p.k && Array.isArray(e.ks.p.k) && e.ks
							.p.k.length === t.length) {
							for (let r in e.ks.p.k)
								if (e.ks.p.k.hasOwnProperty(r)) {
									let n = e.ks.p.k[r];
									i(n.s, t[r], s), n.to && (n.to = [0, 0, 0]), n.ti && (n.ti = [0, 0, 0])
								}
						} else console.error(`injectMovement: invalid movement ks[${e.nm}] vs kps[${t}]`)
				}, t.makePos = o, t.getAngle = c, t.getLength = p, t.getAngle3 = (e, t, s) => c(t, e) - c(t,
					s), t.getAngle4 = (e, t, s) => {
					let r = p(t, e),
						n = p(t, s),
						a = p(e, s),
						o = (Math.pow(r, 2) + Math.pow(n, 2) - Math.pow(a, 2)) / (2 * r * n);
					return -Math.round(180 * Math.acos(o) / Math.PI)
				}, t.getRayPointByLength = (e, t, s, r) => {
					r || (r = p(e, t));
					let n = s / r;
					return {
						x: e.x + (t.x - e.x) * n,
						y: e.y + (t.y - e.y) * n
					}
				}, t.getRayPointByRate = (e, t, s) => ({
					x: e.x + (t.x - e.x) * s,
					y: e.y + (t.y - e.y) * s
				}), t.getLineCross = (e, t, s) => {
					let [r, n] = e[0], [a, o] = e[1], [i, l] = t[0], [c, p] = t[1], f = (o - n) * r + (r -
						a) * n, g = (p - l) * i + (i - c) * l, y = (a - r) * (p - l) - (c - i) * (o - n);
					if (0 === y) return null;
					let d = (g * (a - r) - f * (c - i)) / y,
						h = (g * (o - n) - f * (p - l)) / y;
					return s && (Math.abs(r - a) > 1 && (d < Math.min(r, a) - 1 || d > Math.max(r, a) +
						1) || d < Math.min(i, c) - 1 || d > Math.max(i, c) + 1 || Math.abs(n - o) > 1 &&
						(h < Math.min(n, o) - 1 || h > Math.max(n, o) + 1) || h < Math.min(l, p) - 1 ||
						h > Math.max(l, p) + 1) ? null : [d, h]
				}, t.injectAngleWithCalc = (e, t, s, r) => {
					let a = n(e, "sh", s),
						o = n(e, "gs", s);
					if (a) {
						let [e, s, r] = a.ks.k.v;
						i(e, t.ps, 1), i(s, t.po, 1), i(r, t.pe, 1);
						let [n, l, c] = a.ks.k.i;
						i(n, [0, 0], 1), i(l, [t.hs.x - t.po.x, t.hs.y - t.po.y], 1), i(c, [0, 0], 1);
						let [p, f, g] = a.ks.k.o;
						i(p, [0, 0], 1), i(f, [t.he.x - t.po.x, t.he.y - t.po.y], 1), i(g, [0, 0], 1), o &&
							(i(o.s.k, t.vs, 1), i(o.e.k, t.ve, 1), o.g.k.k = t.ga)
					}
				}, t.injectAngleByLine = (e, t, s) => {
					let r = n(e, "sh", s),
						a = n(e, "gs", s);
					if (r) {
						let [e, s] = r.ks.k.v;
						i(e, t.vs, 1), i(s, t.ve, 1), a && (i(a.s.k, t.vs, 1), i(a.e.k, t.ve, 1), a.g.k.k =
							t.ga)
					}
				}, t.injectAngleWithCalcByFl = (e, t, s) => {
					let r = n(e, "sh", s),
						a = (n(e, "gs", s), n(e, "fl", s));
					if (r) {
						let [e, s, n, o] = r.ks.k.v;
						i(e, t.ps, 1), i(s, t.o, 1), i(o, t.po, 1), i(n, t.pe, 1);
						let [l, c, p, f] = r.ks.k.i;
						i(l, [0, 0], 1), i(c, [0, 0], 1), i(p, [0, 0], 1), i(f, [t.he.x - t.po.x, t.he.y - t
							.po.y
						], 1);
						let [g, y, d, h] = r.ks.k.o;
						i(g, [0, 0], 1), i(y, [0, 0], 1), i(d, [0, 0], 1), i(h, [t.hs.x - t.po.x, t.hs.y - t
							.po.y
						], 1), a && (a.c.k = t.fl)
					}
				}
			},
			175: (e, t, s) => {
				const r = s(745),
					n = s(798),
					a = (e, t, s, r) => {
						if (!t.nm || !t.nm.startsWith(s.name + "-") && !t.nm.startsWith("@-")) return;
						let n = s.parts;
						t.nm.split("-").slice(1).forEach((e => {
							const t = e.split(":"),
								s = t[0],
								r = t[1] || "_";
							n.hasOwnProperty(s) || (n[s] = {}), n[s].hasOwnProperty(r) || (n[s][
							r] = {}), n = n[s][r]
						})), n.hasOwnProperty("_objs") || (n._objs = []), t._mdj_objtype = r, n._objs.push(
							t), console.log(`Collected: ${t.nm} from: ${e.path()}`)
					},
					o = (e, t, s, r, n, o, l) => {
						if (t && (t.root !== s && a(e, s, t, "layer"), s.hasMask && s.masksProperties && s
								.masksProperties.forEach(((s, r) => {
									e.processMute("layerInnerWalk.mask", s.nm, r, (() => {
										a(e, s, t, "mask")
									}))
								})), s.shapes), s.refId) {
							const a = l[s.refId];
							a && e.processMute("layerInnerWalk.asset", "asset", a.id, (() => {
								i(e, t, a.layers, r, n, o, l)
							}))
						}
					},
					i = (e, t, s, r, n, a, i) => {
						Array.isArray(s) && s.forEach(((s, l) => {
							r && "object" == typeof r && r.hasOwnProperty(s.nm) ? e.process(
								"layerWalk", s.nm, l, (() => {
									const t = {
										name: s.nm,
										root: s,
										fragment: r[s.nm],
										data: n[s.nm] || {},
										parts: {},
										assets: i
									};
									o(e, t, s, r, n, a, i), a[t.name] = t
								})) : e.processMute("layerWalk", s.nm, l, (() => {
								o(e, t, s, r, n, a, i)
							}))
						}))
					};
				t.afterEffectRender = (e, t, s) => {
					console.log("---afterEffectRenderafterEffectRender--");
					const a = s.ratio || 1,
						o = {};
					t.assets && t.assets.forEach((e => {
						o[e.id] = e
					}));
					const l = new r;
					console.log("--------crumbs---------", l);
					const c = {};
					i(l, null, t.layers, e.fragments, s.fragments, c, o);
					for (const e in c) {
						if (!c.hasOwnProperty(e)) continue;
						const t = c[e];
						console.log("Injecting fragment: ", t.name, t.fragment.type);
						const s = n[t.fragment.type];
						s ? s(t, a, o) : console.error("invalid injector for fragment:", t.name), n.common
							.movement(t, a, o)
					}
					return t
				}
			}
		},
		t = {};

	function s(r) {
		var n = t[r];
		if (void 0 !== n) return n.exports;
		var a = t[r] = {
			exports: {}
		};
		return e[r](a, a.exports, s), a.exports
	}
	var r, n = {};
	(r = n).afterEffectAlign = s(645).afterEffectAlign, r.afterEffectRender = s(175).afterEffectRender, window
		.lottieMyAnimation = n
})();
