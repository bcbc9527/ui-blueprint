/* 程序生成的画面:抽象“剧照”与剪影“肖像”。它们是占位图,日后可直接换成真实图片。 */
(function () {
  var uid = 0;

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function f(n) { return Math.round(n * 10) / 10; }

  function grad(id, c1, c2, vertical) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (vertical === false ? 1 : 0) + '" y2="' + (vertical === false ? 0 : 1) + '">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>';
  }

  /* 半身剪影:rim 为侧逆光的描边色,x/y 为肩线中心与底边 */
  function figure(x, y, s, fill, rim, hair) {
    var body = 'M' + f(x - 30 * s) + ',' + f(y) +
      ' C' + f(x - 30 * s) + ',' + f(y - 26 * s) + ' ' + f(x - 14 * s) + ',' + f(y - 32 * s) + ' ' + f(x - 5 * s) + ',' + f(y - 34 * s) +
      ' L' + f(x + 5 * s) + ',' + f(y - 34 * s) +
      ' C' + f(x + 14 * s) + ',' + f(y - 32 * s) + ' ' + f(x + 30 * s) + ',' + f(y - 26 * s) + ' ' + f(x + 30 * s) + ',' + f(y) + ' Z';
    var cy = y - 48 * s, rx = 11 * s, ry = 14 * s;
    var neck = '<rect x="' + f(x - 5 * s) + '" y="' + f(y - 40 * s) + '" width="' + f(10 * s) + '" height="' + f(12 * s) + '"/>';
    var head = '<ellipse cx="' + f(x) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '"/>';
    var hairPath = '<path d="M' + f(x - rx * 1.06) + ',' + f(cy + ry * 0.1) + ' C' + f(x - rx * 1.2) + ',' + f(cy - ry * 1.35) + ' ' + f(x + rx * 1.2) + ',' + f(cy - ry * 1.35) + ' ' + f(x + rx * 1.06) + ',' + f(cy + ry * 0.1) +
      ' C' + f(x + rx * 0.7) + ',' + f(cy - ry * 0.5) + ' ' + f(x - rx * 0.7) + ',' + f(cy - ry * 0.5) + ' ' + f(x - rx * 1.06) + ',' + f(cy + ry * 0.1) + ' Z"/>';
    var longHair = hair === 'long'
      ? '<path d="M' + f(x - rx * 1.08) + ',' + f(cy) + ' L' + f(x - rx * 1.25) + ',' + f(y - 24 * s) + ' L' + f(x - rx * 0.5) + ',' + f(y - 30 * s) + ' L' + f(x - rx * 0.6) + ',' + f(cy + ry * 0.4) + ' Z M' + f(x + rx * 1.08) + ',' + f(cy) + ' L' + f(x + rx * 1.25) + ',' + f(y - 24 * s) + ' L' + f(x + rx * 0.5) + ',' + f(y - 30 * s) + ' L' + f(x + rx * 0.6) + ',' + f(cy + ry * 0.4) + ' Z"/>'
      : '';
    var shape = '<path d="' + body + '"/>' + neck + head + hairPath + longHair;
    var d = Math.max(1, s * 0.55);
    return '<g fill="' + rim + '" transform="translate(' + f(-d) + ' 0)" opacity=".85">' + shape + '</g><g fill="' + fill + '">' + shape + '</g>';
  }

  function dark(c) { return c; }

  var scenes = {
    sea: function (p, id, r) {
      var hy = 108, lx = p.fx * 300, out = '';
      out += '<defs>' + grad(id + 's', p.a, p.b) + grad(id + 'w', p.b, p.g) + '</defs>';
      out += '<rect width="300" height="' + hy + '" fill="url(#' + id + 's)"/>';
      out += '<circle cx="' + f(lx) + '" cy="' + (hy - 6) + '" r="34" fill="' + p.c + '" opacity=".55" filter="url(#blur6)"/>';
      out += '<rect y="' + hy + '" width="300" height="' + (200 - hy) + '" fill="url(#' + id + 'w)"/>';
      for (var i = 0; i < 8; i++) {
        var w = 70 - i * 7 + r() * 8;
        out += '<rect x="' + f(lx - w / 2 + (r() - 0.5) * 8) + '" y="' + f(hy + 3 + i * 11) + '" width="' + f(w) + '" height="2.4" rx="1.2" fill="' + p.c + '" opacity="' + f(0.55 - i * 0.055) + '"/>';
      }
      if (p.boat) out += '<g fill="' + p.g + '"><path d="M' + f(lx + 52) + ',' + (hy + 1) + ' l22,0 l-4,6 l-14,0 z"/><rect x="' + f(lx + 61) + '" y="' + (hy - 14) + '" width="1.6" height="15"/><path d="M' + f(lx + 62.6) + ',' + (hy - 14) + ' l9,12 l-9,0 z"/></g>';
      if (p.fig) out += figure(60, 215, 1.25, p.g, p.c);
      return out;
    },
    window: function (p, id, r) {
      var out = '<defs>' + grad(id + 'b', p.a, p.g) + grad(id + 'w', p.c, p.b) + '</defs>';
      out += '<rect width="300" height="200" fill="url(#' + id + 'b)"/>';
      var wx = 168, wy = 26, ww = 96, wh = 116;
      out += '<polygon points="' + wx + ',' + (wy + wh) + ' ' + (wx + ww) + ',' + (wy + wh) + ' 300,200 70,200" fill="' + p.c + '" opacity="' + (p.day ? 0.28 : 0.12) + '"/>';
      out += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="url(#' + id + 'w)"/>';
      out += '<rect x="' + (wx + ww / 2 - 1.5) + '" y="' + wy + '" width="3" height="' + wh + '" fill="' + p.g + '"/><rect x="' + wx + '" y="' + (wy + wh * 0.45) + '" width="' + ww + '" height="3" fill="' + p.g + '"/>';
      out += '<rect x="' + (wx - 4) + '" y="' + (wy - 4) + '" width="' + (ww + 8) + '" height="' + (wh + 8) + '" fill="none" stroke="' + p.g + '" stroke-width="4"/>';
      out += figure(p.fx * 300, 232, 1.7, p.g, p.c);
      return out;
    },
    street: function (p, id, r) {
      var out = '<defs>' + grad(id + 'b', p.a, p.b) + '</defs><rect width="300" height="200" fill="url(#' + id + 'b)"/>';
      for (var i = 0; i < 16; i++) {
        var col = i % 3 === 0 ? p.c2 : p.c;
        out += '<circle cx="' + f(r() * 300) + '" cy="' + f(26 + r() * 100) + '" r="' + f(5 + r() * 14) + '" fill="' + col + '" opacity="' + f(0.35 + r() * 0.4) + '" filter="url(#blur6)"/>';
      }
      out += '<rect y="140" width="300" height="60" fill="' + p.g + '"/>';
      for (var j = 0; j < 5; j++) out += '<rect x="' + f(r() * 240) + '" y="' + (146 + j * 10) + '" width="' + f(30 + r() * 50) + '" height="2" fill="' + p.c + '" opacity=".35"/>';
      out += figure(p.fx * 300, 178, 0.95, p.g, p.c);
      return out;
    },
    field: function (p, id, r) {
      var out = '<defs>' + grad(id + 's', p.a, p.b) + grad(id + 'g', p.g, p.g) + '</defs>';
      out += '<rect width="300" height="200" fill="url(#' + id + 's)"/>';
      out += '<rect y="128" width="300" height="72" fill="' + p.g + '"/>';
      out += '<rect y="128" width="300" height="3" fill="' + p.c + '" opacity=".35"/>';
      if (p.station) {
        var sx = 214;
        out += '<g fill="#2a3330"><rect x="' + sx + '" y="84" width="2.4" height="46"/><rect x="' + (sx + 22) + '" y="84" width="2.4" height="46"/><rect x="' + (sx - 3) + '" y="64" width="32" height="22" fill="' + p.c + '"/><rect x="' + (sx - 3) + '" y="64" width="32" height="3" /><rect x="' + (sx + 12) + '" y="40" width="1.8" height="24"/><path d="M' + (sx + 13) + ',40 l16,4 l-16,4 z"/></g>';
      } else {
        out += '<g fill="#2a3330" opacity=".55"><rect x="40" y="70" width="2" height="62"/><rect x="250" y="76" width="2" height="56"/><rect x="30" y="76" width="24" height="1.6"/><rect x="240" y="82" width="24" height="1.6"/></g><path d="M41,78 Q145,100 251,84" stroke="#2a3330" stroke-opacity=".5" fill="none"/>';
      }
      out += figure(p.fx * 300, p.fig ? 164 : 160, p.fig ? 0.8 : 0.62, '#222a28', p.c);
      return out;
    },
    closeup: function (p, id, r) {
      var out = '<defs>' + grad(id + 'b', p.a, p.b) + '<radialGradient id="' + id + 'l" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="' + p.c + '" stop-opacity=".95"/><stop offset="1" stop-color="' + p.c + '" stop-opacity="0"/></radialGradient></defs>';
      out += '<rect width="300" height="200" fill="url(#' + id + 'b)"/><circle cx="212" cy="64" r="82" fill="url(#' + id + 'l)"/>';
      out += '<circle cx="212" cy="64" r="9" fill="' + p.c + '"/>';
      out += '<rect y="150" width="300" height="50" fill="' + p.g + '"/><rect y="150" width="300" height="2.4" fill="' + p.c + '" opacity=".4"/>';
      for (var i = 0; i < 6; i++) out += '<circle cx="' + f(120 + i * 22 + r() * 6) + '" cy="' + f(156 + r() * 8) + '" r="' + f(2 + r() * 3) + '" fill="' + p.c + '" opacity=".5"/>';
      out += figure(p.fx * 300, 250, 2.3, p.g, p.c);
      return out;
    },
    room: function (p, id, r) {
      var out = '<defs>' + grad(id + 'b', p.a, p.b) + '</defs><rect width="300" height="200" fill="url(#' + id + 'b)"/>';
      for (var i = 0; i < 3; i++) {
        var x = 60 + i * 84;
        out += '<rect x="' + x + '" y="0" width="1.4" height="34" fill="' + p.g + '"/><path d="M' + (x - 14) + ',48 a14.7,14 0 0 1 29,0 z" fill="' + p.g + '"/>';
        out += '<circle cx="' + (x + 0.7) + '" cy="52" r="18" fill="' + p.c + '" opacity=".6" filter="url(#blur6)"/>';
      }
      out += figure(p.fx * 300, 150, 1.25, p.g, p.c);
      out += '<rect y="128" width="300" height="72" fill="' + p.g + '"/><rect y="128" width="300" height="2.6" fill="' + p.c + '" opacity=".5"/>';
      if (p.steam) for (var k = 0; k < 4; k++) out += '<ellipse cx="' + f(40 + r() * 220) + '" cy="' + f(90 + r() * 30) + '" rx="' + f(18 + r() * 16) + '" ry="' + f(8 + r() * 8) + '" fill="' + p.c + '" opacity=".28" filter="url(#blur6)"/>';
      return out;
    },
  };

  /* 3:2 的“剧照”,viewBox 为 300×200 */
  function still(work) {
    var id = 'st' + (uid++);
    var r = rng(hash(work.id));
    var inner = scenes[work.look.scene](work.look, id, r);
    return '<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + work.title + ' 的示意画面" xmlns="http://www.w3.org/2000/svg">' +
      inner +
      '<rect width="300" height="200" fill="#808080" filter="url(#grain)" opacity=".3" style="mix-blend-mode:overlay"/>' +
      '<rect width="300" height="200" fill="url(#vig)"/></svg>';
  }

  /* 3:4 / 4:5 的背光剪影肖像,viewBox 为 400×500 */
  function portrait(opts) {
    var id = 'pt' + (uid++);
    var bg = opts.bg || ['#8d979a', '#4a5558'];
    var out = '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + (opts.label || '肖像示意图') + '" xmlns="http://www.w3.org/2000/svg"><defs>' +
      grad(id + 'b', bg[0], bg[1]) +
      '<radialGradient id="' + id + 'h" cx="0.58" cy="0.38" r="0.55"><stop offset="0" stop-color="#f3f6f4" stop-opacity=".85"/><stop offset="1" stop-color="#f3f6f4" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="500" fill="url(#' + id + 'b)"/><rect width="400" height="500" fill="url(#' + id + 'h)"/>' +
      figure(opts.x || 200, 540, opts.s || 5.4, '#161d1b', '#dfe7e4', opts.hair) +
      '<rect width="400" height="500" fill="#808080" filter="url(#grain)" opacity=".32" style="mix-blend-mode:overlay"/>' +
      '<rect width="400" height="500" fill="url(#vig)"/></svg>';
    return out;
  }

  window.Art = { still: still, portrait: portrait, rng: rng, hash: hash };
})();
