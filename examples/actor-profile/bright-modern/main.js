(function () {
  var A = window.ACTOR;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };

  /* ---------- 头部 ---------- */
  $('#nameZh').textContent = A.name;
  $('#nameEn').textContent = A.nameEn;
  $('#lede').textContent = A.lede;
  $('#portrait').innerHTML = window.Art.portrait({ img: A.portraitImg, label: A.name + ' 的肖像(占位图)' }) +
    '<figcaption class="visually-hidden">' + A.name + ' 的肖像(占位图)</figcaption>';
  A.facts.forEach(function (f) { $('#facts').append(el('dt', '', f[0]), el('dd', '', f[1])); });

  var follow = $('#follow'), status = $('#status'), timer;
  function say(msg) { status.textContent = msg; clearTimeout(timer); timer = setTimeout(function () { status.textContent = ''; }, 2600); }
  follow.addEventListener('click', function () {
    var on = follow.getAttribute('aria-pressed') !== 'true';
    follow.setAttribute('aria-pressed', String(on));
    follow.textContent = on ? '已关注' : '关注';
    follow.classList.toggle('btn-primary', !on);
    say(on ? '已关注' + A.name : '已取消关注');
  });
  $('#share').addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).then(function () { say('链接已复制'); }, function () { say('无法复制,请手动复制地址栏中的链接'); });
    } else { say('无法复制,请手动复制地址栏中的链接'); }
  });

  /* ---------- 作品数据 ---------- */
  var works = A.works.slice().sort(function (a, b) { return b.year - a.year; });
  var filter = 'all', current = -1, opener = null;
  var label = function (w) { return w.year + ' 年 ' + w.type + (w.extra ? ',' + w.extra : ''); };

  /* ---------- 代表作:三张大卡 ---------- */
  works.forEach(function (w, i) {
    if (!w.signature) return;
    var b = el('button', 'feat');
    b.type = 'button';
    b.setAttribute('aria-label', '查看《' + w.title + '》,' + w.year + ' 年' + w.type + ',代表作');
    b.innerHTML = '<span class="feat__img">' + window.Art.still(w, 900, 600) + '</span>' +
      '<span class="feat__shade"></span>' +
      '<span class="chip feat__rating"></span>' +
      '<span class="feat__text"><strong class="feat__title"></strong><span class="feat__meta"></span></span>';
    $('.feat__rating', b).textContent = w.rating.toFixed(1);
    $('.feat__title', b).textContent = w.title;
    $('.feat__meta', b).textContent = label(w);
    b.addEventListener('click', function () { open(i, b); });
    $('#featured').appendChild(b);
  });

  /* ---------- 全部作品:海报网格 ---------- */
  var cards = [];
  works.forEach(function (w, i) {
    var li = el('li', 'card');
    var b = el('button', 'card__btn');
    b.type = 'button';
    b.setAttribute('aria-label', '查看《' + w.title + '》,' + w.year + ' 年' + w.type);
    b.innerHTML = '<span class="card__poster">' + window.Art.poster(w) + '<span class="chip card__rating"></span></span>' +
      '<span class="card__title"></span><span class="card__meta"></span><span class="card__role"></span>';
    $('.card__rating', b).textContent = w.rating.toFixed(1);
    $('.card__title', b).textContent = w.title;
    $('.card__meta', b).textContent = label(w);
    $('.card__role', b).textContent = '饰 ' + w.role;
    b.addEventListener('click', function () { open(i, b); });
    li.appendChild(b); $('#grid').appendChild(li);
    cards.push({ w: w, li: li, btn: b });
  });

  function applyFilter() {
    var shown = 0;
    cards.forEach(function (c) { var off = filter !== 'all' && c.w.type !== filter; c.li.hidden = off; if (!off) shown++; });
    $('#count').textContent = filter === 'all' ? '共 ' + cards.length + ' 部' : filter + ' ' + shown + ' 部';
  }
  $('#filter').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.type;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    applyFilter();
  });
  applyFilter();

  /* ---------- 详情弹窗(原生 dialog,支持键盘翻页) ---------- */
  var dlg = $('#sheet');
  function visible() { return cards.map(function (c, i) { return c.li.hidden ? -1 : i; }).filter(function (i) { return i >= 0; }); }
  function render(i) {
    var w = works[i]; current = i;
    $('#sheetImg').innerHTML = window.Art.still(w, 900, 600);
    $('#sheetTitle').textContent = w.title;
    $('#sheetLine').textContent = w.line;
    $('#sheetFlag').hidden = !w.signature;
    var rows = [['年份', w.year + ' 年'], ['类型', w.type + (w.extra ? ',' + w.extra : '')], ['饰演', w.role], ['导演', w.director], ['观众评分', w.rating.toFixed(1) + ' 分']];
    var dl = $('#sheetFacts'); dl.textContent = '';
    rows.forEach(function (r) { dl.append(el('dt', '', r[0]), el('dd', '', r[1])); });
    var vis = visible(), pos = vis.indexOf(i);
    $('#prev').disabled = pos <= 0;
    $('#next').disabled = pos === vis.length - 1 || pos < 0;
  }
  function open(i, trigger) { opener = trigger; render(i); if (!dlg.open) dlg.showModal(); }
  function step(d) {
    var vis = visible(), pos = vis.indexOf(current) + d;
    if (pos >= 0 && pos < vis.length) render(vis[pos]);
  }
  $('#prev').addEventListener('click', function () { step(-1); });
  $('#next').addEventListener('click', function () { step(1); });
  $('#close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); });
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });

  /* ---------- 简介 / 获奖 / 合作演员 ---------- */
  A.bio.forEach(function (t) { var p = el('p'); p.textContent = t; $('#bio').appendChild(p); });
  A.awards.forEach(function (a) {
    var li = el('li', 'award');
    li.innerHTML = '<span class="award__year"></span><span class="award__what"><strong></strong><span></span></span>';
    $('.award__year', li).textContent = a[2];
    $('.award__what strong', li).textContent = a[0];
    $('.award__what span', li).textContent = a[1];
    $('#awards').appendChild(li);
  });
  A.costars.forEach(function (c) {
    var li = el('li', 'face');
    li.innerHTML = '<span class="face__img">' + window.Art.portrait({ img: c.img, size: 240, label: c.name + ' 的肖像(占位图)' }) + '</span><strong class="face__name"></strong><span class="face__note"></span>';
    $('.face__name', li).textContent = c.name;
    $('.face__note', li).textContent = c.note;
    $('#costars').appendChild(li);
  });
})();
