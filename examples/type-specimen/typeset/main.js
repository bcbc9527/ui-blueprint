(function () {
  var D = window.TYPE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  var root = document.documentElement;
  var stack = function (cssVar) { return getComputedStyle(root).getPropertyValue(cssVar).trim(); };

  /* ---------- 主题 ---------- */
  var themeBtn = $('#theme');
  function paintTheme() {
    var dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? '切换为浅色主题' : '切换为深色主题');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('typeset-theme', next); } catch (e) {}
    paintTheme();
  });
  paintTheme();

  /* ---------- 字形解剖 ---------- */
  var glyph = $('#glyph'), ring = $('#ring'), gf = $('#glyphFonts'), featBox = $('#features');
  function setGlyphFont(f) {
    glyph.style.setProperty('--glyph-font', 'var(' + f.css + ')');
    glyph.style.setProperty('--glyph-weight', f.weight);
    gf.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === f.id)); });
  }
  D.glyphFonts.forEach(function (f, i) {
    var b = el('button', 'chip'); b.type = 'button'; b.dataset.id = f.id; b.textContent = f.name; b.style.fontFamily = 'var(' + f.css + ')';
    b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', function () { setGlyphFont(f); });
    gf.appendChild(b);
  });
  setGlyphFont(D.glyphFonts[0]);
  function selectFeature(id) {
    featBox.querySelectorAll('.feature').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === id)); });
    var f = D.features.filter(function (x) { return x.id === id; })[0];
    ring.hidden = false; ring.style.setProperty('--x', f.at[0] + '%'); ring.style.setProperty('--y', f.at[1] + '%');
  }
  D.features.forEach(function (f) {
    var li = el('li'); var b = el('button', 'feature'); b.type = 'button'; b.dataset.id = f.id; b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<span class="feature__name"></span><span class="feature__text"></span>';
    $('.feature__name', b).textContent = f.name; $('.feature__text', b).textContent = f.text;
    b.addEventListener('click', function () { selectFeature(f.id); });
    li.appendChild(b); featBox.appendChild(li);
  });
  selectFeature(D.features[0].id);

  /* ---------- 历史 ---------- */
  D.history.forEach(function (h) {
    var li = el('li', '', '<span class="timeline__when"></span><div><strong class="timeline__title"></strong><p class="timeline__text"></p></div>');
    $('.timeline__when', li).textContent = h.when; $('.timeline__title', li).textContent = h.title; $('.timeline__text', li).textContent = h.text;
    $('#timeline').appendChild(li);
  });

  /* ---------- 明朝体与黑体 ---------- */
  var cmp = $('.compare'), cmpIn = $('#cmpSize');
  $('#cmpMincho').textContent = $('#cmpGothic').textContent = D.compare.sample;
  $('#cmpMinchoZh').textContent = $('#cmpGothicZh').textContent = D.compare.sampleZh;
  function cmpUpdate() {
    var v = Number(cmpIn.value);
    cmp.style.setProperty('--cmp-size', (v / 16) + 'rem');
    $('#cmpSizeOut').textContent = v + ' px';
    $('#cmpHintText').textContent = v < 14
      ? '字号只有 ' + v + 'px：明朝体的细横线已经开始发虚。可以把字重提到 500 以上，或者在这个尺寸改用黑体。'
      : v < 20 ? v + 'px 可以阅读，但横线仍偏细；长时间阅读时，黑体会更省力。'
      : v + 'px：字号足够大，横细竖粗的节奏和收笔的“鱗”都清晰可见。';
  }
  cmpIn.addEventListener('input', cmpUpdate); cmpUpdate();

  /* ---------- 试排台 ---------- */
  var T = D.tester, st = { font: 0, size: 56, weight: 500, lead: 1.6, track: 0, dir: 'h' };
  var prev = $('#preview'), txt = $('#textIn'), fchips = $('#fontChips'), pchips = $('#presets');
  function nearest(list, w) { return list.reduce(function (a, b) { return Math.abs(b - w) < Math.abs(a - w) ? b : a; }); }
  T.fonts.forEach(function (f, i) {
    var b = el('button', 'chip'); b.type = 'button'; b.textContent = f.name; b.style.fontFamily = 'var(' + f.css + ')';
    b.setAttribute('aria-pressed', String(i === 0)); b.addEventListener('click', function () { st.font = i; apply(); });
    fchips.appendChild(b);
  });
  T.presets.forEach(function (p, i) {
    var b = el('button', 'chip'); b.type = 'button'; b.textContent = p.label; b.dataset.id = p.id; b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () { txt.value = p.text; paintPresets(p.id); apply(); });
    pchips.appendChild(b);
  });
  function paintPresets(id) { pchips.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === id)); }); }
  txt.value = T.presets[0].text;
  function cssText(f, eff) {
    var lines = ['font-family: ' + stack(f.css) + ';', 'font-weight: ' + eff + ';', 'font-size: ' + st.size + 'px;', 'line-height: ' + st.lead + ';', 'letter-spacing: ' + st.track + 'em;'];
    if (st.dir === 'v') lines.push('writing-mode: vertical-rl;');
    return lines.join('\n');
  }
  function apply() {
    var f = T.fonts[st.font], eff = nearest(f.weights, st.weight);
    prev.style.setProperty('--tester-font', 'var(' + f.css + ')');
    prev.style.setProperty('--tester-weight', eff);
    prev.style.setProperty('--tester-size', (st.size / 16) + 'rem');
    prev.style.setProperty('--tester-lead', st.lead);
    prev.style.setProperty('--tester-track', st.track + 'em');
    prev.dataset.dir = st.dir;
    prev.lang = f.id === 'song' ? 'zh-Hans' : 'ja';
    prev.textContent = txt.value;
    fchips.querySelectorAll('button').forEach(function (b, i) { b.setAttribute('aria-pressed', String(i === st.font)); });
    $('#fontNote').textContent = f.note;
    $('#sizeOut').textContent = st.size + ' px';
    $('#weightOut').textContent = st.weight + (eff !== st.weight ? '（此字体最接近 ' + eff + '）' : '');
    $('#leadOut').textContent = st.lead.toFixed(1);
    $('#trackOut').textContent = st.track.toFixed(2) + ' em';
    $('#snippet').textContent = cssText(f, eff);
    $('#dir').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.dir === st.dir)); });
  }
  [['sizeIn', 'size'], ['weightIn', 'weight'], ['leadIn', 'lead'], ['trackIn', 'track']].forEach(function (pair) {
    $('#' + pair[0]).addEventListener('input', function () { st[pair[1]] = Number(this.value); apply(); });
  });
  txt.addEventListener('input', function () { paintPresets(''); apply(); });
  $('#dir').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { st.dir = b.dataset.dir; apply(); } });
  var copyLabel = $('#copyLabel'), copyTimer;
  $('#copy').addEventListener('click', function () {
    var done = function (m) { copyLabel.textContent = m; clearTimeout(copyTimer); copyTimer = setTimeout(function () { copyLabel.textContent = '复制 CSS'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText($('#snippet').textContent).then(function () { done('已复制'); }, function () { done('复制失败，请手动选取'); });
    else done('复制失败，请手动选取');
  });
  apply();

  /* ---------- 竖排 ---------- */
  $('#vText').textContent = D.vertical.text;
  $('#vCap').textContent = D.vertical.title + '，字体：Shippori Mincho';
  $('#vDir').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    $('#vFig').dataset.dir = b.dataset.dir;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
  });
  $('#vFig').dataset.dir = 'v';

  /* ---------- 用法建议 ---------- */
  D.tips.forEach(function (t) {
    var li = el('li', 'card tip', '<span class="tip__icon">' + window.Icon(t.icon) + '</span><strong class="tip__title"></strong><p class="tip__text"></p>');
    $('.tip__title', li).textContent = t.title; $('.tip__text', li).textContent = t.text;
    $('#tipList').appendChild(li);
  });
})();
