! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define &&
		define.amd ? define(['lottieMyChiago'], t) : "object" == typeof exports ? exports.lottieMyChiago = t() : e
		.lottieMyChiago = t()
}("undefined" != typeof self ? self : this, (function() {
	return (() => {
		var e = {
				416: (e, t) => {
					const s = (e, t, s) => {
							let r = "";
							r = "string" == typeof t ? t : void 0 !== s ? `${s}.${t.nm}` :
								`${t.nm}`, e.push(r);
							const a = e.join("/");
							return console.info(`\n\n>>>Enter ${r} [/${a}]`), e
						},
						r = e => {
							const t = e.join("/"),
								s = e.pop();
							return console.info(`Leave ${s} [/${t}]`), s
						},
						a = (e, t, s, r = "") => {
							const a = t.slice();
							t[0] += s[0], t[1] += s[1], console.info(`${r}${e}: ${a} -> ${t}`)
						},
						n = (e, t, s = "a", r = "k", a = "s") => {
							if (!e || !e.hasOwnProperty(r)) return;
							const n = e[r];
							!Array.isArray(n) || e.hasOwnProperty(s) && 0 === e[s] ? t(n, 0, !1) : n
								.forEach(((e, s) => {
									a && (e = e[a]), t(e, s, !0)
								}))
						},
						o = (e, t, s = !1) => {
							if (!t) return e;
							let r = e.slice();
							if (void 0 !== t.a.a && 0 !== t.a.a) throw console.error(
									"calcAdjust: Anchor cannot has any animation define"),
								Error("calcAdjust");
							return t.p && n(t.p, ((n, o) => {
								var i, l;
								a(o, n, e, "ks.p.k"), 0 !== o || s || (i = n, l = t.a.k,
									r = [i[0] - l[0], i[1] - l[1]], l[0] = i[0], l[
										1] = i[1], r = r)
							})), console.info(`calcAdjust: adjust point: ${e} -> ${r}`), r
						},
						i = {
							gr: (e, t, a) => {
								if (t.it) {
									const n = t.it.find((e => "tr" === e.ty));
									n && (a = o(a, n)), t.it.forEach(((t, n) => {
										"tr" !== t.ty && (l(s(e, t, n), t, a), r(e))
									}))
								}
							},
							sh: (e, t, s) => {
								n(t.ks, ((e, t, r) => {
									r ? e.forEach(((e, r) => {
										const n = `ks.k${t}.s${r}.v`;
										e.v.forEach(((e, t) => {
											a(t, e, s, n)
										}))
									})) : e.v.forEach(((e, r) => {
										a(r, e, s, `ks.k${t}.v`)
									}))
								}))
							},
							el: (e, t, s) => {
								n(t.p, ((e, t) => {
									a(t, e, s, "s.k")
								}))
							},
							rc: (e, t, s) => {
								n(t.p, ((e, t) => {
									a(t, e, s, "p.k")
								}))
							},
							sr: (e, t, s) => {
								n(t.p, ((e, t) => {
									a(t, e, s, "p.k")
								}))
							},
							fl: () => {},
							st: () => {},
							tm: () => {},
							gs: (e, t, s) => {
								n(t.s, ((e, t) => {
									a(t, e, s, "s")
								})), n(t.e, ((e, t) => {
									a(t, e, s, "e")
								}))
							},
							gf: (e, t, s) => {
								n(t.s, ((e, t) => {
									a(t, e, s, "s")
								})), n(t.e, ((e, t) => {
									a(t, e, s, "e")
								}))
							}
						},
						l = (e, t, s) => {
							const r = o(s, t.ks),
								a = i[t.ty];
							a ? a(e, t, r) : console.warn(
								`shapeAlign: unsupported shape type: ${t.ty}`)
						},
						p = (e, t, n, i) => {
							const p = o(n, t.ks);
							return t.hasMask && t.masksProperties && t.masksProperties.forEach(((t,
								n) => {
								((e, t, s) => {
									t.pt && t.pt.k && t.pt.k.v && t.pt.k.v.forEach((
										(e, t) => {
											a(t, e, s, "mask.pt.k")
										}))
								})(s(e, t, n), t, p), r(e)
							})), t.shapes && t.shapes.forEach(((t, a) => {
								l(s(e, t, a), t, p), r(e)
							})), p
						},
						c = {
							0: (e, t, a, n) => {
								const o = p(e, t, a);
								if (t.refId) {
									const a = n[t.refId];
									if (!a) throw console.error(
											`layerAlign: asset not found: ${t.refId}`),
										Error("asset not found");
									if (a.aligned) throw console.error(
											`layerAlign: asset re-enter: ${t.refId}`),
										Error("asset re-enter");
									s(e, `asset:${a.idx}.${t.refId}`, 0), a.aligned = !0, a.item
										.layers && a.item.layers.forEach(((t, a) => {
											f(s(e, t, a), t, o, n), r(e)
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
							const a = c[t.ty];
							a ? a(e, t, s, r) : p(e, t, s)
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
						const a = [],
							n = [0, 0];
						e.layers && e.layers.forEach(((e, o) => {
							f(s(a, e, o), e, n, t), r(a)
						}))
					}
				},
				465: e => {
					const t = {
						constructor: s,
						process(e, t, s, r) {
							this.push(`${s}.${t}`), this.path(), r(), this.pop()
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
				629: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						let a = ((e, t) => {
								let s = {},
									a = e.fragment.props ? e.fragment.props : {
										rw: 90,
										tw: 180
									};
								void 0 === a.rw && (a.rw = 90), void 0 === a.tw && (a.tw =
									180);
								for (let a in e.data) "s" != a && "e" !== a && "o" !== a ||
									(s[a] = r.makePos(null, e.data[a], t));
								return s.g = Object.assign({}, a), s
							})(e, t),
							n = function(e, t, s, a, n) {
								let o = r.getAngle4(e, t, s),
									i = r.getRayPointByLength(t, e, a),
									l = r.getRayPointByLength(t, s, a),
									p = {
										x: (i.x + l.x) / 2,
										y: (i.y + l.y) / 2
									},
									c = 1 / Math.cos(o / 2 * Math.PI / 180) * a,
									f = r.getRayPointByLength(t, p, c),
									y = r.getRayPointByLength(t, p, a),
									d = (c - a) / r.getLength(f, p);
								return {
									ps: i,
									pe: l,
									po: y,
									hs: r.getRayPointByRate(f, i, d),
									he: r.getRayPointByRate(f, l, d),
									pt: r.getRayPointByLength(t, f, n),
									angle: o
								}
							}(a.s, a.o, a.e, a.g.rw, a.g.tw);
						if (n.o = {
								...a.o
							}, e.parts.r)
							for (let t in e.parts.r)
								if ("s" == t || "e" === t || "o" === t) {
									let o = e.parts.r[t];
									o && r.ensureEachPartEntry(o, ((e, t, o, i) => {
										r.injectLineWithCalc(o, {
											vs: a.o,
											ve: a.e
										}, s);
										let l = o.ks.r.k;
										if (o.ks.a.k, o.ks.p.k, r.injectPosition(o
												.ks.a.k, a.o, 1), r.injectPosition(o
												.ks.p.k, a.o, 1), l && Array
											.isArray(l) && 2 == l.length) {
											let [e, t] = l;
											t.s = [n.angle]
										}
									}))
								} if (e.parts.l && e.parts.l.s && r.ensureEachPartEntry(e.parts
								.l.s, ((e, t, n, o) => {
									r.injectLineWithCalc(n, {
										vs: a.s,
										ve: a.o
									}, s)
								})), e.parts.l && e.parts.l.e && r.ensureEachPartEntry(e.parts.l
								.e, ((e, t, n, o) => {
									r.injectLineWithCalc(n, {
										vs: a.o,
										ve: a.e
									}, s)
								})), e.parts.a && e.parts.a._ && r.ensureEachPartEntry(e.parts.a
								._, ((e, a, o, i) => {
									r.injectAngleWithCalc(o, n, s, t)
								})), e.parts.fl && e.parts.fl._ && (n.fl = e.data.fl, r
								.ensureEachPartEntry(e.parts.fl._, ((e, t, a, o) => {
									r.injectAngleWithCalcByFl(a, n, s)
								}))), e.parts.t) {
							let {
								fragment: {
									props: {
										t
									} = {}
								} = {}
							} = e;
							t && "object" == typeof t || (t = {}), t.pos || (t.pos = [0, 0]), t
								.align || (t.align = [0, 0]);
							let s = [n.pt.x + t.pos[0], n.pt.y + t.pos[1]];
							r.ensureEachPartObj(e.parts.t, ((t, a, n, o) => {
								r.injectPosition(n.ks.p.k, s, 1), r.injectText(n, e
									.data.v)
							}))
						}
					}
				},
				943: e => {
					e.exports = (e, t, s) => {}
				},
				154: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						r.ensureEachPartObj(e.parts.p, ((s, a, n, o) => {
							r.injectPosition(n.ks.p.k, e.data.p[a], t)
						})), r.ensureEachPartObj(e.parts.l, ((a, n, o, i) => {
							let [l, p] = n.split("_"), c = null;
							e.fragment.props && e.fragment.props.l && (c = e
								.fragment.props.l[n] || e.fragment.props.l
								._default), r.injectLine(o, e.data.p[l], e.data
								.p[p], t, c, s)
						}))
					}
				},
				406: (e, t, s) => {
					const r = s(781),
						a = s(324),
						n = (e, t, s = 1) => {
							if (!e) return;
							let {
								data: {
									img: r,
									p: n,
									a: o,
									s: i
								} = {},
								fragment: {
									props: {
										isChangeA: l,
										a: p,
										s: {
											fr: c
										} = {}
									} = {}
								} = {}
							} = e;
							if (!r || !t) return;
							let f = a.deepCopy(r) || {};
							f.p = n, f.isChangeA = l || !1, f.dataA = o, f.defA = p, f.s = i;
							let {
								assets: y
							} = e;
							f.scale = a.caleImageScale(t, f, y) || [1, 1], a.isChangeImg(f.url) ? (a
								.changeImage(t, f, y), a.injectChangeImageAPS(t, f, y, s)) : (a
								.injectImageAP(t, f, s), a.injectImageScale(t, f, s, y, c))
						};
					e.exports = (e, t, s) => {
						let {
							parts: {
								img: o,
								img_p: i
							} = {},
							data: {
								img: l,
								p,
								masksProperties: c
							} = {},
							root: {
								hasMask: f,
								masksProperties: y
							}
						} = e;
						if ("object" === a.type(o)) {
							const {
								_: s,
								a: i,
								p: l
							} = o;
							"object" === a.type(s) && r.ensureEachPartEntry(s, ((s, r, a,
							o) => {
								n(e, a, t)
							})), "object" === a.type(i) && r.ensureEachPartEntry(i, ((s, r,
								a, o) => {
								n(e, a, t)
							}))
						}
						"object" === a.type(i) && ("object" === a.type(i._) ? r
							.ensureEachPartEntry(i._, ((e, s, r, n) => {
								let {
									ks: {
										p: {
											k: o
										} = {}
									} = {}
								} = r;
								a.changeAPUtil(p, o, t)
							})) : r.ensureEachPartObj(i, ((e, s, a, n) => {
								r.injectPosition(a.ks.p.k, p[s], t)
							}))), ((e, t, s, n = 1) => {
							e && "array" === a.type(t) && "array" === a.type(s) && t
								.map((e => {
									if ("object" === a.type(e)) {
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
											"array" === a.type(e) && e.map((
												(e, a) => {
													r.injectPosition(
														e, t[a],
														s)
												}))
										})(i, s, n)
									}
								}))
						})(f, y, c, t)
					}
				},
				324: (e, t, s) => {
					const r = s(781);
					let a = e => ({
							"[object Array]": "array",
							"[object Object]": "object",
							"[object Number]": "number",
							"[object Function]": "function",
							"[object String]": "string",
							"[object Null]": "null",
							"[object Undefined]": "undefined"
						} [Object.prototype.toString.call(e)]),
						n = e => {
							let t;
							return "array" === a(e) ? (t = [], e.map(((e, s) => {
								t[s] = n(e)
							}))) : "object" === a(e) ? (t = {}, Object.keys(e).map((s => {
								t[s] = n(e[s])
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

					function l(e = {}, t = {}, s = [1, 1], r = 1, a) {
						let {
							x: n = 0,
							y: o = 0
						} = t, {
							x: i = 0,
							y: l = 0
						} = e;
						if (s && Array.isArray(s)) {
							const [r, p] = s;
							a ? (e.x = n * r + i, e.y = o * p + i) : (t.x = (n - i) / r, t.y = (o -
								l) / p, e.x = n, e.y = o)
						}
					}

					function p(e = "") {
						return !("string" != typeof e || !e.startsWith("http") && !e.startsWith(
							"data:image/"))
					}

					function c(e, t, s) {
						i(t) ? r.Type.isArray(e) && e.length === t.length && t.map(((t, a) => {
							r.injectPosition(t.s, e[a], s)
						})) : r.injectPosition(t, e, s)
					}
					t.isAniVal = i, t.injectImageAP = function(e = {}, t = {}, s = 1) {
						let {
							a,
							p: n,
							scale: i,
							defA: p,
							dataA: f
						} = t;
						const {
							ks: {
								a: {
									k: y
								} = {},
								p: {}
							} = {}
						} = e;
						if (y && Array.isArray(y)) {
							let {
								x: a,
								y: d
							} = f || {}, {
								x: h = null,
								y: g = null
							} = p || {};
							const [u, k] = y;
							o(a) || o(d) ? o(h) || o(g) ? 0 === u && 0 === k || "number" !=
								typeof u || "number" != typeof k || r.injectPosition(y, [0, 0],
									s) : (f = p, l(n, p, i, s, !0), r.injectPosition(y, p, 1), t
									.p = n) : (l(n, f, i, s), r.injectPosition(y, f, 1), t.p =
									n),
								function(e = {}, t = {}, s = 1) {
									const {
										ks: {
											p: {
												k: r
											} = {},
											a: {
												k: a
											} = {}
										} = {}
									} = e, {
										p: n,
										a: o
									} = t;
									n && c(n, r, s)
								}(e, t, s)
						}
					}, t.injectImageScale = function(e = {}, t = {}, s = 1, a = {}, n) {
						const {
							scale: o
						} = t;
						if (o && Array.isArray(o)) {
							let t = o[0],
								a = o[1];
							const {
								ks: {
									s: {
										k: l
									}
								}
							} = e, p = [100 * t, 100 * a];
							if (i(l)) {
								const {
									ks: {
										s: {
											k: t
										} = {}
									} = {}
								} = e;
								if ("number" == typeof n) {
									const e = n - 1,
										{
											s: a
										} = t[e];
									if (a && Array.isArray(a)) {
										const [e, n] = a;
										t.map(((t, a) => {
											const {
												s: o
											} = t;
											if (o && Array.isArray(o)) {
												const [t, a] = o, i = [t / e, a /
												n];
												r.injectPosition(o, [p[0] * i[0], p[
													1] * i[1]], s)
											}
										}))
									}
								} else {
									const {
										s: e
									} = t[t.length - 1];
									r.injectPosition(e, p, s)
								}
							} else r.injectPosition(l, p, s)
						}
					}, t.caleImageScale = function(e = {}, t = {}, s = {}) {
						let {
							w: r,
							h: n
						} = t;
						if (r || n) {
							let {
								w: t,
								h: o,
								refId: i
							} = e;
							if (!t || !o)
								for (let e in s) e === i && "object" === a(s[e]) && (t = s[e].w,
									o = s[e].h);
							let l = r / t,
								p = n / o,
								{
									ks: {
										s: {
											k: c
										}
									}
								} = e;
							if (!isNaN(l) && !isNaN(p)) {
								if (l && p) return [l, p];
								if (!l) return [p, p];
								if (!p) return [l, l]
							}
						}
						return [1, 1]
					}, t.caleImageAP = l, t.changeImage = function(e = {}, t = {}, s = {}, r =
						1) {
						let {
							url: a,
							w: n,
							h: o
						} = t;
						const {
							ty: i,
							refId: l
						} = e;
						if (2 === i && p(a)) {
							let e = s[l];
							e && (n && (e.w = n), o && (e.h = o), e.p = a, e.e = 1)
						}
					}, t.injectChangeImageAPS = function(e = {}, t = {}, s = {}, r = 1) {
						let {
							a,
							p: n,
							scale: o,
							defA: i,
							s: l,
							dataA: p
						} = t;
						const {
							ks: {
								a: {
									k: f
								} = {},
								p: {
									k: y
								} = {},
								s: {
									k: d
								} = {}
							} = {}
						} = e;
						c(p, f, 1), c(n, y, r), c(l, d, r)
					}, t.isChangeImg = p, t.deepCopy = n, t.changeAPUtil = c, t.type = a
				},
				27: (e, t, s) => {
					t.contour = s(154), t.lane = s(529), t.survey = s(741), t.tag = s(965), t.any =
						s(943), t.radar = s(420), t.radial = s(971), t.angle = s(629), t.images = s(
							406), t.common = {
							movement: s(782)
						}
				},
				529: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						r.ensureEachPartObj(e.parts.l, ((a, n, o, i) => {
							let l = null;
							e.fragment.props && e.fragment.props.l && (l = e
								.fragment.props.l[n] || e.fragment.props.l
								._default);
							let p = e.data.l[n];
							if (!p) return;
							let c = {
								s: [void 0, void 0],
								e: [void 0, void 0]
							};
							for (let e in [0, 1]) p[e] && ("number" == typeof p[e] ?
								(c.s[e] = p[e], c.e[e] = p[e]) : Array.isArray(
									p[e]) && (c.s[e] = p[e][0], c.e[e] = p[e][
									1]));
							r.injectLine(o, c.s, c.e, t, l, s)
						}))
					}
				},
				782: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						e.data._move ? r.injectMovement(e.root, e.data._move, t) : e.data
							._pos && r.injectPosition(e.root.ks.p.k, e.data._pos, t)
					}
				},
				420: (e, t, s) => {
					const r = s(781),
						a = (e, t, s) => ({
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
						let n = [];
						if (!e.parts.d) return void console.error(
							"invalid radar: no direction line", e.name);
						let o = e.fragment.props.separateTimeLine || !1,
							i = e.parts.c._._objs[0],
							l = i ? r.findFirstShape(i, "sh", s) : null;
						if (o && !l) return void console.error(
							"invalid radar: combined timeline without cover shape", e
							.name);
						let p = [];
						for (let t of e.fragment.props.directs) {
							let a = e.parts.d[t]._objs[0];
							if (!a) return void console.error("invalid radar dir: ", e.name, t);
							let o = {
								name: t
							};
							e.parts.v && (o.val = e.parts.v[t]._objs[0], o.valSeq = []), e.parts
								.p && (o.pts = e.parts.p[t]._objs[0], o.pts.ks.p.k.forEach(((e,
									t) => {
									e.to && (e.to = [0, 0, 0]), e.ti && (e.ti = [0,
										0, 0
									])
								})));
							let i = r.findFirstShape(a, "sh", s);
							if (!i) return void console.error("invalid radar dir shape: ", e
								.name, t);
							o.dir = {
									s: i.ks.k.v[0],
									e: i.ks.k.v[1]
								}, o.dir.w = o.dir.e[0] - o.dir.s[0], o.dir.h = o.dir.e[1] - o
								.dir.s[1], a.ks.o.k = 0, n.push(o)
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
									for (let e of s) r.push(a(t, e, t.s.t));
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
						})(l, n);
						for (let t = 0; t < e.data.values.length - 1; t++) {
							let s = [],
								o = [];
							for (let i of n) {
								let n = e.data.values[t][i.name],
									l = e.data.values[t + 1][i.name],
									p = [i.dir.s[0] + i.dir.w * n / 100, i.dir.s[1] + i.dir.h *
										n / 100
									],
									c = [i.dir.s[0] + i.dir.w * l / 100, i.dir.s[1] + i.dir.h *
										l / 100
									],
									f = 2 * t,
									y = 2 * t + 1;
								if (i.pts && (r.injectPosition(i.pts.ks.p.k[f].s, p, 1), r
										.injectPosition(i.pts.ks.p.k[y].s, c, 1)), i.val) {
									let e = i.val.t.d.k[f],
										t = i.val.t.d.k[y],
										s = (l - n) / (t.t - e.t),
										r = n,
										o = Math.round(n).toFixed(0);
									e.s.t = o, i.valSeq.push(e);
									for (let n = e.t + 1; n < t.t; n++) {
										r += s;
										let t = Math.round(r).toFixed(0);
										t !== o && (i.valSeq.push(a(e, f + n, t)), o = t)
									}
									t.s.t = Math.round(l).toFixed(0), i.valSeq.push(t)
								}
								s.push(p), o.push(c)
							}
							p.push(s, o)
						}
						l && l.ks.k.forEach(((e, t) => {
							e.s[0].v = p[t]
						}));
						for (let e of n) e.val && (e.val.t.d.k = e.valSeq)
					}
				},
				971: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						let a = e.fragment.props ? e.fragment.props : {
							padding: 0
						};
						void 0 === a.padding && (a.padding = 0);
						let n = r.lineCalc(null, null, e.data.s, e.data.e, t, a),
							o = r.getAngle(n.vs, n.ve);
						n.c = {
							x: n.vs.x,
							y: n.vs.y
						}, e.parts.l && r.ensureEachPartEntry(e.parts.l._, ((e, t, a,
						o) => {
							r.injectLineWithCalc(a, n, s)
						})), e.parts.a && r.ensureEachPartEntry(e.parts.a._, ((e, t, s,
							i) => {
								r.injectMovement(s, [n.vs, n.ve], 1), s.ks && s.ks.r &&
									!1 !== a.rot && (s.ks.r.k = o)
							}))
					}
				},
				741: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						let a = e.fragment.props ? e.fragment.props : {
							padding: 10
						};
						void 0 === a.padding && (a.padding = 10);
						let n = r.lineCalc(null, null, e.data.s, e.data.e, t, a),
							o = r.getAngle(n.vs, n.ve);
						n.c = {
							x: (n.vs.x + n.ve.x) / 2,
							y: (n.vs.y + n.ve.y) / 2
						};
						let i = ((e, t, s) => {
							if (!t) return {
								m: {},
								lsc: e.c,
								lec: e.c
							};
							t.pos || (t.pos = [0, 0]), t.align || (t.align = [0, 0]);
							let a = [e.c.x + t.pos[0], e.c.y + t.pos[1]];
							if (!t.size) return {
								m: r.makePos(null, a, 1),
								lsc: e.c,
								lec: e.c
							};
							let n = a[0] + t.size[0] * (t.align[0] - 1) / 2,
								o = a[0] + t.size[0] * (t.align[0] + 1) / 2,
								i = a[1] + t.size[1] * (t.align[1] - 1) / 2,
								l = a[1] + t.size[1] * (t.align[1] + 1) / 2,
								p = [
									[e.vs.x, e.vs.y],
									[e.ve.x, e.ve.y]
								],
								c = r.getLineCross(p, [
									[n, i],
									[o, i]
								], !0),
								f = r.getLineCross(p, [
									[n, l],
									[o, l]
								], !0),
								y = r.getLineCross(p, [
									[n, i],
									[n, l]
								], !0),
								d = r.getLineCross(p, [
									[o, i],
									[o, l]
								], !0),
								h = c || f || y || d,
								g = d || y || f || c;
							if (h && g) {
								let e = !1;
								return e = s > 0 && s < 180 ? h[1] > g[1] : s < 0 && s >
									-180 ? g[1] > h[1] : 0 === s ? h[0] > g[0] : g[0] >
									h[0], e && ([h, g] = [g, h]), {
										m: r.makePos(null, a, 1),
										lsc: r.makePos(null, h, 1),
										lec: r.makePos(null, g, 1)
									}
							}
							return {
								m: r.makePos(null, a, 1),
								lsc: e.c,
								lec: e.c
							}
						})(n, e.fragment.props.t, o);
						if (e.parts.l && e.parts.l._) {
							let t = n.ga.slice(0, 8);
							t.push(0, 1), t.push(...n.ga.slice(-4)), r.ensureEachPartEntry(e
								.parts.l._, ((e, a, o, i) => {
									r.injectLineWithCalc(o, {
										...n,
										ga: t
									}, s)
								}))
						} else {
							let t = n.ga.slice(0, 8);
							t.push(0, 1), t.push(...n.ga.slice(-4));
							for (let [a, o, l] of [
									[e.parts.l.s, i.lsc, n.vs],
									[e.parts.l.e, i.lec, n.ve]
								]) r.ensureEachPartEntry(a, ((e, a, n, i) => {
								r.injectLineWithCalc(n, {
									vs: o,
									ve: l,
									ga: t
								}, s)
							}))
						}
						e.parts.a && e.parts.a.s && r.ensureEachPartEntry(e.parts.a.s, ((e, t,
							s, l) => {
							r.injectMovement(s, [i.lsc, n.vs], 1), s.ks && s.ks.r &&
								!1 !== a.rot && (s.ks.r.k = o)
						})), e.parts.a && e.parts.a.e && r.ensureEachPartEntry(e.parts.a.e,
							((e, t, s, l) => {
								r.injectMovement(s, [i.lec, n.ve], 1), s.ks && s.ks.r &&
									!1 !== a.rot && (s.ks.r.k = o)
							})), e.parts.t && r.ensureEachPartObj(e.parts.t, ((t, s, a,
							n) => {
								r.injectPosition(a.ks.p.k, i.m, 1), r.injectText(a, e
									.data.v)
							}))
					}
				},
				965: (e, t, s) => {
					const r = s(781);
					e.exports = (e, t, s) => {
						r.ensureEachPartObj(e.parts.t, ((t, s, a, n) => {
							r.injectText(a, e.data[s])
						}))
					}
				},
				781: (e, t) => {
					const s = (e, t, a) => {
							let n = null;
							if (e.refId) {
								let r = a[e.refId];
								if (r)
									for (let e of r.layers)
										if (n = s(e, t, a), n) return n
							} else if (e.shapes)
								for (let s of e.shapes)
									if (n = r(s, t), n) return n;
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
						a = (e, t, a) => "number" == typeof e.ty ? s(e, t, a) : r(e, t, a),
						n = (e, t, s, r) => {
							e._objs ? e._objs.forEach((e => {
								t(s, r, e, null)
							})) : t(s, r, null, e)
						},
						o = (e, t, s) => {
							let r, a;
							t ? Array.isArray(t) ? (r = t[0], a = t[1]) : (r = t.x, a = t.y) : (r =
								void 0, a = void 0);
							let n = e ? {
								x: e[0],
								y: e[1]
							} : {
								x: void 0,
								y: void 0
							};
							return null != r && (n.x = r * s), null != a && (n.y = a * s), n
						},
						i = (e, t, s) => {
							if (!e || !t) return;
							let r = o(e, t, s);
							e[0] = r.x, e[1] = r.y
						},
						l = (e, t, s, r, a, n) => {
							s = o(e, s, a), r = o(t, r, a);
							let i = n && n.gs && n.gs.color ? n.gs.color.slice() : [0, 1, 1, 1, 1,
								1, 1, 1
							];
							if (n) {
								(e => {
									if (!e._adjusted) {
										for (let t of [e, e.gs]) t && t.padding && ("number" ==
											typeof t.padding ? t.padding = {
												s: t.padding,
												e: t.padding
											} : Array.isArray(t.padding) || (t.padding = {
												s: t.padding.s || 0,
												e: t.padding.e || 0
											}));
										e._adjusted = !0
									}
								})(n);
								let e = r.x - s.x,
									t = r.y - s.y,
									a = (e ** 2 + t ** 2) ** .5;
								n.padding && (s.x += e / a * n.padding.s, s.y += t / a * n.padding
										.s, r.x -= e / a * n.padding.e, r.y -= t / a * n.padding.e,
										a -= n.padding.s, a -= n.padding.e), n.gs && n.gs.padding ?
									Array.isArray(n.gs.padding) ? i.push(...n.gs.padding) : (i.push(
										0, 0, n.gs.padding.s / a, 1), i.push(1 - n.gs.padding
										.e / a, 1, 1, 0)) : i.push(0, 0, .1, 1, .9, 1, 1, 0)
							} else i.push(0, 0, .1, 1, .9, 1, 1, 0);
							return {
								vs: s,
								ve: r,
								ga: i
							}
						},
						p = (e, t) => {
							let s = t.x - e.x,
								r = t.y - e.y;
							return 0 == r ? s > 0 ? 0 : -180 : 180 * Math.atan2(r, s) / Math.PI
						},
						c = (e, t) => Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)),
						f = function() {
							for (var e = {}, t = ["String", "Object", "Number", "Array",
									"Undefined", "Function", "Null", "Symbol"
								], s = 0; s < t.length; s++) ! function(t) {
								e["is" + t] = function(e) {
									return Object.prototype.toString.call(e) ===
										"[object " + t + "]"
								}
							}(t[s]);
							return e
						}();
					t.isLayer = e => "number" == typeof e.ty, t.findFirstShape = a, t
						.ensureEachPartObj = (e, t) => {
							for (let s in e) {
								if (!e.hasOwnProperty(s)) continue;
								let r = e[s];
								n(r, t, e, s)
							}
						}, t.ensureEachPartEntry = n, t.injectPosition = i, t.injectLine = (e, t, s,
							r, n, o) => {
							let p = a(e, "sh", o),
								c = a(e, "gs", o);
							if (p) {
								let [e, a] = p.ks.k.v, o = l(e, a, t, s, r, n);
								i(e, o.vs, 1), i(a, o.ve, 1), c && (i(c.s.k, o.vs, 1), i(c.e.k, o
									.ve, 1), c.g.k.k = o.ga)
							}
						}, t.injectLineWithCalc = (e, t, s) => {
							let r = a(e, "sh", s),
								n = a(e, "gs", s);
							if (r) {
								let [e, s] = r.ks.k.v;
								i(e, t.vs, 1), i(s, t.ve, 1), n && (i(n.s.k, t.vs, 1), i(n.e.k, t
									.ve, 1), n.g.k.k = t.ga)
							}
						}, t.injectText = (e, t) => {
							if (e && e.t && e.t.d && e.t.d.k)
								for (let s of e.t.d.k) {
									let e = s.s;
									if (t)
										if ("string" == typeof t) e.t = t;
										else
											for (let s in t) t.hasOwnProperty(s) && (e.t = e.t
												.replace(`{${s}}`, t[s]))
								}
						}, t.lineCalc = l, t.Type = f, t.injectMovement = (e, t, s) => {
							if (e && t)
								if (e.ks && e.ks.p && 0 !== e.ks.p.a && e.ks.p.k && Array.isArray(e
										.ks.p.k) && e.ks.p.k.length === t.length) {
									for (let r in e.ks.p.k)
										if (e.ks.p.k.hasOwnProperty(r)) {
											let a = e.ks.p.k[r];
											i(a.s, t[r], s), a.to && (a.to = [0, 0, 0]), a.ti && (a
												.ti = [0, 0, 0])
										}
								} else console.error(
									`injectMovement: invalid movement ks[${e.nm}] vs kps[${t}]`)
						}, t.makePos = o, t.getAngle = p, t.getLength = c, t.getAngle3 = (e, t,
						s) => p(t, e) - p(t, s), t.getAngle4 = (e, t, s) => {
							let r = c(t, e),
								a = c(t, s),
								n = c(e, s),
								o = (Math.pow(r, 2) + Math.pow(a, 2) - Math.pow(n, 2)) / (2 * r *
								a);
							return -Math.round(180 * Math.acos(o) / Math.PI)
						}, t.getRayPointByLength = (e, t, s, r) => {
							r || (r = c(e, t));
							let a = s / r;
							return {
								x: e.x + (t.x - e.x) * a,
								y: e.y + (t.y - e.y) * a
							}
						}, t.getRayPointByRate = (e, t, s) => ({
							x: e.x + (t.x - e.x) * s,
							y: e.y + (t.y - e.y) * s
						}), t.getLineCross = (e, t, s) => {
							let [r, a] = e[0], [n, o] = e[1], [i, l] = t[0], [p, c] = t[1], f = (o -
									a) * r + (r - n) * a, y = (c - l) * i + (i - p) * l, d = (n -
								r) * (c - l) - (p - i) * (o - a);
							if (0 === d) return null;
							let h = (y * (n - r) - f * (p - i)) / d,
								g = (y * (o - a) - f * (c - l)) / d;
							return s && (Math.abs(r - n) > 1 && (h < Math.min(r, n) - 1 || h > Math
									.max(r, n) + 1) || h < Math.min(i, p) - 1 || h > Math.max(i,
									p) + 1 || Math.abs(a - o) > 1 && (g < Math.min(a, o) - 1 ||
									g > Math.max(a, o) + 1) || g < Math.min(l, c) - 1 || g >
								Math.max(l, c) + 1) ? null : [h, g]
						}, t.injectAngleWithCalc = (e, t, s, r) => {
							let n = a(e, "sh", s),
								o = a(e, "gs", s);
							if (n) {
								let [e, s, r] = n.ks.k.v;
								i(e, t.ps, 1), i(s, t.po, 1), i(r, t.pe, 1);
								let [a, l, p] = n.ks.k.i;
								i(a, [0, 0], 1), i(l, [t.hs.x - t.po.x, t.hs.y - t.po.y], 1), i(p, [
									0, 0
								], 1);
								let [c, f, y] = n.ks.k.o;
								i(c, [0, 0], 1), i(f, [t.he.x - t.po.x, t.he.y - t.po.y], 1), i(y, [
									0, 0
								], 1), o && (i(o.s.k, t.vs, 1), i(o.e.k, t.ve, 1), o.g.k.k = t
									.ga)
							}
						}, t.injectAngleByLine = (e, t, s) => {
							let r = a(e, "sh", s),
								n = a(e, "gs", s);
							if (r) {
								let [e, s] = r.ks.k.v;
								i(e, t.vs, 1), i(s, t.ve, 1), n && (i(n.s.k, t.vs, 1), i(n.e.k, t
									.ve, 1), n.g.k.k = t.ga)
							}
						}, t.injectAngleWithCalcByFl = (e, t, s) => {
							let r = a(e, "sh", s),
								n = (a(e, "gs", s), a(e, "fl", s));
							if (r) {
								let [e, s, a, o] = r.ks.k.v;
								i(e, t.ps, 1), i(s, t.o, 1), i(o, t.po, 1), i(a, t.pe, 1);
								let [l, p, c, f] = r.ks.k.i;
								i(l, [0, 0], 1), i(p, [0, 0], 1), i(c, [0, 0], 1), i(f, [t.he.x - t
									.po.x, t.he.y - t.po.y
								], 1);
								let [y, d, h, g] = r.ks.k.o;
								i(y, [0, 0], 1), i(d, [0, 0], 1), i(h, [0, 0], 1), i(g, [t.hs.x - t
									.po.x, t.hs.y - t.po.y
								], 1), n && (n.c.k = t.fl)
							}
						}
				},
				124: (e, t, s) => {
					const r = s(465),
						a = s(27),
						n = (e, t, s, r) => {
							if (!t.nm || !t.nm.startsWith(s.name + "-") && !t.nm.startsWith("@-"))
								return;
							let a = s.parts;
							t.nm.split("-").slice(1).forEach((e => {
									const t = e.split(":"),
										s = t[0],
										r = t[1] || "_";
									a.hasOwnProperty(s) || (a[s] = {}), a[s].hasOwnProperty(
										r) || (a[s][r] = {}), a = a[s][r]
								})), a.hasOwnProperty("_objs") || (a._objs = []), t._mdj_objtype =
								r, a._objs.push(t)
						},
						o = (e, t, s, r, a, o, l) => {
							if (t && (t.root !== s && n(0, s, t, "layer"), s.hasMask && s
									.masksProperties && s.masksProperties.forEach(((s, r) => {
										e.processMute("layerInnerWalk.mask", s.nm, r, (
									() => {
											n(0, s, t, "mask")
										}))
									})), s.shapes), s.refId) {
								const n = l[s.refId];
								n && e.processMute("layerInnerWalk.asset", "asset", n.id, (() => {
									i(e, t, n.layers, r, a, o, l)
								}))
							}
						},
						i = (e, t, s, r, a, n, i) => {
							Array.isArray(s) && s.forEach(((s, l) => {
								r && "object" == typeof r && r.hasOwnProperty(s.nm) ? e
									.process("layerWalk", s.nm, l, (() => {
										const t = {
											name: s.nm,
											root: s,
											fragment: r[s.nm],
											data: a[s.nm] || {},
											parts: {},
											assets: i
										};
										o(e, t, s, r, a, n, i), n[t.name] = t
									})) : e.processMute("layerWalk", s.nm, l, (() => {
										o(e, t, s, r, a, n, i)
									}))
							}))
						};
					t.afterEffectRender = (e, t, s) => {
						const n = s.ratio || 1,
							o = {};
						t.assets && t.assets.forEach((e => {
							o[e.id] = e
						}));
						const l = new r,
							p = {};
						i(l, null, t.layers, e.fragments, s.fragments, p, o);
						for (const e in p) {
							if (!p.hasOwnProperty(e)) continue;
							const t = p[e],
								s = a[t.fragment.type];
							s ? s(t, n, o) : console.error("invalid injector for fragment:", t
								.name), a.common.movement(t, n, o)
						}
						return t
					}
				}
			},
			t = {};

		function s(r) {
			var a = t[r];
			if (void 0 !== a) return a.exports;
			var n = t[r] = {
				exports: {}
			};
			return e[r](n, n.exports, s), n.exports
		}
		var r = {};
		return (() => {
			var e = r;
			e.afterEffectAlign = s(416).afterEffectAlign, e.afterEffectRender = s(124)
				.afterEffectRender
		})(), r
	})()
}));
