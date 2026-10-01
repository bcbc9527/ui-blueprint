(function () {
  var P = window.PHOTOG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  var kfmt = function (n) { return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n); };

  /* ---------- 个人资料 ---------- */
  $('#cover').innerHTML = window.Art.seeded(P.coverSeed, 2400, 800, '');
  $('#avatar').innerHTML = window.Art.avatar(P.avatarImg, 240, P.name + ' 的头像(占位图)');
  $('#name').innerHTML = '<span></span> <small></small>';
  $('#name span').textContent = P.name; $('#name small').textContent = P.nameEn;
  $('#meta').textContent = P.handle + '  ' + P.place;
  $('#tagline').textContent = P.tagline;
  P.stats.forEach(function (s) { var d = el('div', 'stat'); d.append(el('dt', '', s[0]), el('dd', '', s[1])); $('#stats').appendChild(d); });

  var follow = $('#follow'), status = $('#status'), timer;
  function say(m) { status.textContent = m; clearTimeout(timer); timer = setTimeout(function () { status.textContent = ''; }, 2600); }
  follow.addEventListener('click', function () {
    var on = follow.getAttribute('aria-pressed') !== 'true';
    follow.setAttribute('aria-pressed', String(on)); follow.textContent = on ? '已关注' : '关注';
    follow.classList.toggle('btn-primary', !on); say(on ? '已关注' + P.name : '已取消关注');
  });
  $('#share').addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(function () { say('链接已复制'); }, function () { say('无法复制,请手动复制地址栏中的链接'); });
    else say('无法复制,请手动复制地址栏中的链接');
  });

  /* ---------- 标签页(键盘:左右键、Home、End) ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role=tab]'));
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) t.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t); });
    t.addEventListener('keydown', function (e) {
      var j = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
      if (j >= 0) { e.preventDefault(); selectTab(tabs[j], true); }
    });
  });

  /* ---------- 拍摄参数(按分类给出合理的组合) ---------- */
  var PRESET = {
    '风光': { lens: 'Voss 24-70mm f/2.8', focal: ['24 mm', '35 mm', '50 mm'], ap: ['ƒ/8', 'ƒ/11', 'ƒ/5.6'], sh: ['1/250 秒', '1/125 秒', '1/500 秒'], iso: ['100', '100', '200'] },
    '街头': { lens: 'Voss 35mm f/1.4', focal: ['35 mm'], ap: ['ƒ/2.8', 'ƒ/4', 'ƒ/2'], sh: ['1/500 秒', '1/250 秒', '1/1000 秒'], iso: ['400', '800', '200'] },
    '人像': { lens: 'Voss 85mm f/1.8', focal: ['85 mm'], ap: ['ƒ/1.8', 'ƒ/2.2', 'ƒ/2.8'], sh: ['1/320 秒', '1/500 秒', '1/200 秒'], iso: ['200', '100', '400'] },
    '夜景': { lens: 'Voss 35mm f/1.4', focal: ['35 mm'], ap: ['ƒ/1.4', 'ƒ/1.8', 'ƒ/2'], sh: ['1/30 秒', '1/60 秒', '1/15 秒'], iso: ['3200', '1600', '6400'] },
  };
  P.photos.forEach(function (p, i) {
    var s = PRESET[p.cat], k = i % 3;
    p.camera = i % 5 === 0 ? 'Orsa M3(胶片)' : 'Voss R5';
    p.exif = [['相机', p.camera], ['镜头', s.lens], ['焦距', s.focal[k % s.focal.length]], ['光圈', s.ap[k]], ['快门', s.sh[k]], ['感光度', 'ISO ' + s.iso[k]], ['拍摄于', '2025 年 ' + (12 - (i % 12)) + ' 月']];
  });

  /* ---------- 照片墙 ---------- */
  var cat = 'all', shots = [];
  P.photos.forEach(function (p, i) {
    var li = el('li', 'shot'); li.style.setProperty('--r', p.r);
    var b = el('button', 'shot__btn'); b.type = 'button';
    b.setAttribute('aria-label', '查看《' + p.title + '》,' + p.cat);
    b.innerHTML = '<i></i>' + window.Art.photo(p, 900) + '<span class="shot__cap"><strong></strong><span></span></span>';
    $('.shot__cap strong', b).textContent = p.title;
    $('.shot__cap span', b).textContent = kfmt(p.likes) + ' 喜欢';
    b.addEventListener('click', function () { open(i, b); });
    li.appendChild(b); $('#wall').appendChild(li);
    shots.push({ p: p, li: li });
  });
  var catBox = $('#cats');
  ['all'].concat(P.cats).forEach(function (c) {
    var b = el('button'); b.type = 'button'; b.dataset.cat = c; b.textContent = c === 'all' ? '全部' : c;
    b.setAttribute('aria-pressed', String(c === 'all')); catBox.appendChild(b);
  });
  function applyCat(c) {
    cat = c;
    catBox.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cat === c)); });
    var n = 0; shots.forEach(function (s) { var off = c !== 'all' && s.p.cat !== c; s.li.hidden = off; if (!off) n++; });
    $('#count').textContent = (c === 'all' ? '全部 ' : c + ' ') + n + ' 张';
  }
  catBox.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) applyCat(b.dataset.cat); });
  applyCat('all');

  /* ---------- 图集 ---------- */
  P.galleries.forEach(function (g) {
    var li = el('li', 'gcard'); var b = el('button', 'gcard__btn'); b.type = 'button';
    b.innerHTML = '<span class="gcard__img">' + window.Art.seeded(g.seed, 800, 600, g.name + ' 封面(占位图)') + '</span><strong class="gcard__name"></strong><span class="gcard__note"></span>';
    $('.gcard__name', b).textContent = g.name; $('.gcard__note', b).textContent = g.note + ' 共 ' + g.count + ' 张';
    b.addEventListener('click', function () { applyCat(g.cat); selectTab(tabs[0], true); window.scrollTo({ top: $('.tabs-bar').offsetTop, behavior: 'smooth' }); });
    li.appendChild(b); $('#galleries').appendChild(li);
  });

  /* ---------- 关于 ---------- */
  P.bio.forEach(function (t) { var p = el('p'); p.textContent = t; $('#bio').appendChild(p); });
  P.gear.forEach(function (g) { $('#gear').append(el('dt', '', g[0] || '&nbsp;'), el('dd', '', g[1])); });
  P.honors.forEach(function (h) { $('#honors').append(el('dt', '', h[0]), el('dd', '', h[1])); });
  $('#contact').textContent = P.contact;

  /* ---------- 灯箱 ---------- */
  var dlg = $('#lb'), cur = -1, opener = null, liked = {};
  function vis() { return shots.map(function (s, i) { return s.li.hidden ? -1 : i; }).filter(function (i) { return i >= 0; }); }
  function render(i) {
    var p = P.photos[i]; cur = i;
    $('#lbFig').innerHTML = window.Art.photo(p, 1600).replace(' loading="lazy"', '');
    $('#lbTitle').textContent = p.title;
    $('#lbBy').textContent = P.name + ',' + p.loc;
    $('#lbDesc').textContent = p.desc;
    var dl = $('#lbExif'); dl.textContent = '';
    p.exif.forEach(function (r) { dl.append(el('dt', '', r[0]), el('dd', '', r[1])); });
    paintLike();
    var v = vis(), pos = v.indexOf(i);
    $('#lbPrev').disabled = pos <= 0; $('#lbNext').disabled = pos < 0 || pos === v.length - 1;
  }
  function paintLike() {
    var p = P.photos[cur], on = !!liked[p.id], b = $('#lbLike');
    b.setAttribute('aria-pressed', String(on));
    b.textContent = (on ? '已喜欢 ' : '喜欢 ') + kfmt(p.likes + (on ? 1 : 0));
    b.classList.toggle('btn-primary', on);
  }
  function open(i, trigger) { opener = trigger; render(i); if (!dlg.open) dlg.showModal(); }
  function step(d) { var v = vis(), pos = v.indexOf(cur) + d; if (pos >= 0 && pos < v.length) render(v[pos]); }
  $('#lbPrev').addEventListener('click', function () { step(-1); });
  $('#lbNext').addEventListener('click', function () { step(1); });
  $('#lbClose').addEventListener('click', function () { dlg.close(); });
  $('#lbLike').addEventListener('click', function () { var id = P.photos[cur].id; liked[id] = !liked[id]; paintLike(); });
  dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1); });
  dlg.addEventListener('close', function () { if (opener) opener.focus(); });
})();
