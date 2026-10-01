(function () {
  var A = window.ACTOR;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- 手绘红圈:每部作品一条固定的、略有抖动的路径 ---------- */
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function scribbleCircle(seed) {
    var r = rng(hash(seed));
    var n = 64, pts = [], phase = r() * 6.28, start = r() * 6.28;
    for (var i = 0; i <= n; i++) {
      var t = i / n, a = start + t * (6.28 + 0.55);
      var k = 1 + 0.045 * Math.sin(2 * a + phase) + 0.03 * t;
      pts.push((50 + 48 * k * Math.cos(a)).toFixed(1) + ',' + (50 + 43 * k * Math.sin(a)).toFixed(1));
    }
    return 'M' + pts.join(' L');
  }

  /* ---------- 肖像区 ---------- */
  $('#nameZh').textContent = A.name;
  $('#nameEn').textContent = A.nameEn;
  $('#lede').textContent = A.lede;
  $('#portraitImg').innerHTML = window.Art.portrait({ img: A.portraitImg, label: A.name + ' 的肖像(占位图)' });
  A.facts.forEach(function (f) { $('#facts').append(el('dt', '', f[0]), el('dd', '', f[1])); });

  var follow = $('#follow'), status = $('#status'), statusTimer;
  function say(msg) { status.textContent = msg; clearTimeout(statusTimer); statusTimer = setTimeout(function () { status.textContent = ''; }, 2600); }
  follow.addEventListener('click', function () {
    var on = follow.getAttribute('aria-pressed') !== 'true';
    follow.setAttribute('aria-pressed', String(on));
    follow.textContent = on ? '已关注' : '关注';
    follow.classList.toggle('btn-primary', !on);
    say(on ? '已关注' + A.name : '已取消关注');
  });
  $('#share').addEventListener('click', function () {
    var url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { say('链接已复制'); }, function () { say('无法复制,请手动复制地址栏中的链接'); });
    } else { say('无法复制,请手动复制地址栏中的链接'); }
  });

  /* ---------- 联系印样 ---------- */
  var works = A.works.slice().sort(function (a, b) { return b.year - a.year; });
  var PER_STRIP = 4, frames = [], viewed = null, filter = 'all';

  function frameEl(w, i) {
    var li = el('div', 'frame');
    var btn = el('button', 'frame__btn');
    btn.type = 'button';
    btn.setAttribute('aria-label', '查看《' + w.title + '》,' + w.year + ' 年' + w.type + (w.signature ? ',代表作' : ''));
    btn.innerHTML = window.Art.still(w);

    var over = document.createElementNS(SVGNS, 'svg');
    over.setAttribute('class', 'frame__marks');
    over.setAttribute('viewBox', '0 0 100 100');
    over.setAttribute('preserveAspectRatio', 'none');
    over.setAttribute('aria-hidden', 'true');
    var html = '';
    if (w.signature) html += '<path class="mark mark--circle" d="' + scribbleCircle(w.id) + '"/>';
    html += '<g class="x-g"><path class="mark" d="M6,6 L94,94 M94,6 L6,94"/></g>';
    over.innerHTML = html;
    btn.appendChild(over);
    btn.appendChild(el('span', 'frame__crop', '<i class="corner corner--tl"></i><i class="corner corner--tr"></i><i class="corner corner--br"></i><i class="corner corner--bl"></i>'));

    var cap = el('div', 'frame__cap');
    cap.innerHTML = '<span class="frame__title"></span><span class="frame__meta"></span>';
    $('.frame__title', cap).textContent = w.title;
    $('.frame__meta', cap).textContent = w.year + ' 年 ' + w.type;

    li.append(btn, cap);
    btn.addEventListener('click', function () { open(i); });
    frames.push({ w: w, root: li, btn: btn });
    return li;
  }

  var strips = $('#strips');
  for (var s = 0; s < works.length; s += PER_STRIP) {
    var chunk = works.slice(s, s + PER_STRIP);
    var sec = el('section', 'strip');
    var years = chunk[0].year === chunk[chunk.length - 1].year ? chunk[0].year : chunk[chunk.length - 1].year + '–' + chunk[0].year;
    var h = el('h3', 'strip__label');
    h.textContent = years;
    var track = el('div', 'strip__track');
    chunk.forEach(function (w, j) { track.appendChild(frameEl(w, s + j)); });
    sec.append(h, el('div', 'strip__film'));
    $('.strip__film', sec).appendChild(track);
    strips.appendChild(sec);
  }

  function applyFilter() {
    var shown = 0;
    frames.forEach(function (f) {
      var off = filter !== 'all' && f.w.type !== filter;
      f.root.toggleAttribute('data-off', off);
      f.btn.disabled = off;
      if (!off) shown++;
    });
    $('#count').textContent = filter === 'all' ? '共 ' + frames.length + ' 部' : filter + ' ' + shown + ' 部,其余 ' + (frames.length - shown) + ' 部已划掉';
  }
  $('#filter').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.type;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    applyFilter();
  });
  applyFilter();

  /* ---------- 放大窗口 ---------- */
  var dlg = $('#loupe'), current = -1;
  function visibleIdx() { return frames.map(function (f, i) { return f.btn.disabled ? -1 : i; }).filter(function (i) { return i >= 0; }); }

  function render(i) {
    var w = frames[i].w; current = i;
    $('#loupeImg').innerHTML = window.Art.still(w, 900, 600) + '<p class="loupe__edge"><span></span><span></span></p>';
    $('#loupeImg .loupe__edge span:first-child').textContent = w.year + ' 年 ' + w.type;
    $('#loupeImg .loupe__edge span:last-child').textContent = w.title;
    $('#loupeTitle').textContent = w.title;
    $('#loupeLine').textContent = w.line;
    $('#loupeFlag').hidden = !w.signature;
    var rows = [['年份', w.year + ' 年'], ['类型', w.type + (w.extra ? ',' + w.extra : '')], ['饰演', w.role], ['导演', w.director], ['观众评分', w.rating.toFixed(1) + ' 分']];
    var dl = $('#loupeFacts'); dl.textContent = '';
    rows.forEach(function (r) { dl.append(el('dt', '', r[0]), el('dd', '', r[1])); });
    var vis = visibleIdx(), pos = vis.indexOf(i);
    $('#prev').disabled = pos <= 0;
    $('#next').disabled = pos === vis.length - 1;
  }
  function markViewed(i) {
    frames.forEach(function (f) { f.root.removeAttribute('data-viewed'); f.root.classList.remove('is-new'); });
    var f = frames[i]; f.root.setAttribute('data-viewed', ''); void f.root.offsetWidth; f.root.classList.add('is-new');
    viewed = i;
  }
  function open(i) { render(i); markViewed(i); if (!dlg.open) dlg.showModal(); }
  function step(d) {
    var vis = visibleIdx(), pos = vis.indexOf(current) + d;
    if (pos >= 0 && pos < vis.length) { render(vis[pos]); markViewed(vis[pos]); }
  }
  $('#prev').addEventListener('click', function () { step(-1); });
  $('#next').addEventListener('click', function () { step(1); });
  $('#close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
  });
  dlg.addEventListener('close', function () { if (viewed != null) frames[viewed].btn.focus(); });

  /* ---------- 简介 / 获奖 / 合作演员 ---------- */
  A.bio.forEach(function (t) { var p = el('p'); p.textContent = t; $('#bio').appendChild(p); });
  A.awards.forEach(function (a) {
    var li = el('li', 'credit');
    li.innerHTML = '<span class="credit__what"></span><span class="credit__lead" aria-hidden="true"></span><span class="credit__year"></span>';
    $('.credit__what', li).textContent = a[0] + a[1];
    $('.credit__year', li).textContent = a[2];
    $('#awards').appendChild(li);
  });
  A.costars.forEach(function (c) {
    var li = el('li', 'print');
    var img = el('div', 'print__img', window.Art.portrait({ img: c.img, size: 300, label: c.name + ' 的肖像(占位图)' }));
    var name = el('p', 'print__name'); name.textContent = c.name;
    var note = el('p', 'print__note'); note.textContent = c.note;
    li.append(img, name, note);
    $('#costars').appendChild(li);
  });
})();
