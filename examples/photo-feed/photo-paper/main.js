(function () {
  var F = window.FEED;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  var kfmt = function (n) { return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n); };
  var live = $('#live'), liveTimer;
  function say(msg) { live.textContent = msg; clearTimeout(liveTimer); liveTimer = setTimeout(function () { live.textContent = ''; }, 2600); }

  /* ---------- 数据整理 ---------- */
  var photos = F.photos.map(function (a, i) {
    return { id: 'p' + (i < 9 ? '0' : '') + (i + 1), title: a[0], a: a[1], cat: a[2], r: a[3], likes: a[4], comments: a[5], loc: a[6], desc: a[7], day: i, pick: i % 4 === 1 };
  });
  var pick = F.pick;
  var PRESET = {
    '风光': ['Voss 24-70mm f/2.8', '35 mm', 'ƒ/8', '1/250 秒', 'ISO 100'],
    '街头': ['Voss 35mm f/1.4', '35 mm', 'ƒ/2.8', '1/500 秒', 'ISO 400'],
    '人像': ['Voss 85mm f/1.8', '85 mm', 'ƒ/1.8', '1/320 秒', 'ISO 200'],
    '夜景': ['Voss 35mm f/1.4', '35 mm', 'ƒ/1.4', '1/30 秒', 'ISO 3200'],
    '旅行': ['Voss 24-70mm f/2.8', '50 mm', 'ƒ/5.6', '1/400 秒', 'ISO 200'],
    '野生动物': ['Voss 100-400mm f/5.6', '400 mm', 'ƒ/5.6', '1/1000 秒', 'ISO 800'],
  };
  var liked = {}, saved = {}, following = {}, extraComments = {};

  /* ---------- 页头 ---------- */
  $('#me').innerHTML = window.Art.avatar(F.me.img, 96, '我的头像(占位图)');

  /* ---------- 通用:喜欢 / 收藏 / 关注 ---------- */
  function likeCount(p) { return p.likes + (liked[p.id] ? 1 : 0); }
  function syncLike(p) {
    document.querySelectorAll('[data-like="' + p.id + '"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(!!liked[p.id]));
      var n = $('.n', b); if (n) n.textContent = kfmt(likeCount(p));
    });
  }
  function syncSave(p) {
    document.querySelectorAll('[data-save="' + p.id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(!!saved[p.id])); b.setAttribute('aria-label', saved[p.id] ? '取消收藏' : '收藏'); });
  }
  function toggleLike(p) { liked[p.id] = !liked[p.id]; syncLike(p); say(liked[p.id] ? '已喜欢《' + p.title + '》' : '已取消喜欢'); }
  function toggleSave(p) { saved[p.id] = !saved[p.id]; syncSave(p); say(saved[p.id] ? '已收藏《' + p.title + '》' : '已取消收藏'); }
  function paintFollow(btn, a) {
    var on = !!following[a];
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? '已关注' : '关注';
  }
  function syncFollow(a) { document.querySelectorAll('[data-follow][data-a="' + a + '"]').forEach(function (b) { paintFollow(b, a); }); }
  function toggleFollow(a) { following[a] = !following[a]; syncFollow(a); say(following[a] ? '已关注' + F.authors[a].name : '已取消关注'); }
  function share(p) {
    var done = function () { say('链接已复制'); }, fail = function () { say('无法复制,请手动复制地址栏中的链接'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(location.href).then(done, fail); else fail();
  }
  function bindFollow(btn, a) { btn.dataset.a = a; paintFollow(btn, a); btn.addEventListener('click', function () { toggleFollow(Number(btn.dataset.a)); }); }
  $('#upload').addEventListener('click', function () { say('这是示例页面,上传功能未启用'); });

  /* ---------- 今日精选 ---------- */
  pick.title = pick.title; pick.pick = true;
  var pa = F.authors[pick.a];
  $('#pickOpen').innerHTML = window.Art.photo(pick, 2000, false);
  $('#pickTitle').textContent = pick.title;
  $('#pickAvatar').innerHTML = window.Art.avatar(pa.img, 96, pa.name + ' 的头像(占位图)');
  $('#pickBy').textContent = pa.name; $('#pickLoc').textContent = pick.loc;
  $('#pickDesc').textContent = pick.desc;
  bindFollow($('#pickOpen').closest('.pick').querySelector('[data-follow]'), pick.a);
  [['heart', kfmt(pick.likes) + ' 喜欢'], ['message-circle', pick.comments + ' 评论'], ['eye', pick.views + ' 浏览']].forEach(function (s) {
    $('#pickStats').appendChild(el('li', '', window.Icon(s[0], 'icon--sm') + '<span>' + s[1] + '</span>'));
  });
  $('#pickOpen').addEventListener('click', function () { openViewer(pick, [pick], this); });
  $('#pickView').addEventListener('click', function () { openViewer(pick, [pick], this); });
  var ps = $('#pickSave'); ps.dataset.save = pick.id; ps.addEventListener('click', function () { toggleSave(pick); });
  $('#pickShare').addEventListener('click', function () { share(pick); });

  /* ---------- 工具条与照片墙 ---------- */
  var state = { sort: 'hot', cat: 'all', q: '', shown: 14 }, STEP = 7;
  var catBox = $('#cats');
  ['all'].concat(F.cats).forEach(function (c) {
    var b = el('button', 'chip'); b.type = 'button'; b.dataset.cat = c; b.textContent = c === 'all' ? '全部' : c;
    b.setAttribute('aria-pressed', String(c === 'all')); catBox.appendChild(b);
  });
  function currentList() {
    var q = state.q.trim().toLowerCase();
    var list = photos.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (!q) return true;
      return (p.title + F.authors[p.a].name + p.loc + p.cat).toLowerCase().indexOf(q) >= 0;
    });
    if (state.sort === 'hot') list.sort(function (x, y) { return y.likes - x.likes; });
    else if (state.sort === 'new') list.sort(function (x, y) { return x.day - y.day; });
    else list = list.filter(function (p) { return p.pick; }).sort(function (x, y) { return y.likes - x.likes; });
    return list;
  }
  function shotEl(p, list) {
    var a = F.authors[p.a];
    var li = el('li', 'shot'); li.style.setProperty('--r', p.r);
    li.innerHTML =
      '<div class="shot__media"><button class="shot__open photo" type="button"><i></i>' + window.Art.photo(p, 900) + '</button>' +
      '<div class="shot__quick"><button class="btn btn--icon btn--sm btn--round btn--on-media" type="button" data-save="' + p.id + '" aria-pressed="false" aria-label="收藏">' + window.Icon('bookmark', 'icon--sm icon--fillable') + '</button>' +
      '<button class="btn btn--icon btn--sm btn--round btn--on-media" type="button" data-share aria-label="分享">' + window.Icon('share-2', 'icon--sm') + '</button></div></div>' +
      '<div class="shot__cap"><span class="avatar avatar--sm">' + window.Art.avatar(a.img, 64, '') + '</span>' +
      '<span class="shot__txt"><span class="shot__title"></span><span class="shot__by"></span></span>' +
      '<button class="like" type="button" data-like="' + p.id + '" aria-pressed="false" aria-label="喜欢">' + window.Icon('heart', 'icon--sm icon--fillable') + '<span class="n"></span></button></div>';
    $('.shot__open', li).setAttribute('aria-label', '查看《' + p.title + '》,' + a.name + ',' + p.cat);
    $('.shot__title', li).textContent = p.title; $('.shot__by', li).textContent = a.name;
    $('.shot__open', li).addEventListener('click', function () { openViewer(p, list, this); });
    $('[data-save]', li).addEventListener('click', function () { toggleSave(p); });
    $('[data-share]', li).addEventListener('click', function () { share(p); });
    $('.like', li).addEventListener('click', function () { toggleLike(p); });
    return li;
  }
  function renderWall() {
    var list = currentList(), wall = $('#wall');
    wall.textContent = '';
    list.slice(0, state.shown).forEach(function (p) { wall.appendChild(shotEl(p, list)); });
    photos.forEach(function (p) { syncLike(p); syncSave(p); });
    var shown = Math.min(state.shown, list.length);
    $('#count').textContent = list.length ? '共 ' + list.length + ' 张作品' : '';
    if (!list.length) wall.innerHTML = '<li class="empty">没有找到相关作品。换个关键词,或者清除分类试试。</li>';
    $('#more').hidden = shown >= list.length;
    $('#moreNote').textContent = list.length ? '已显示 ' + shown + ' / ' + list.length + ' 张' : '';
  }
  $('#sorts').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.sort = b.dataset.sort; state.shown = 14;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    renderWall();
  });
  catBox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.cat = b.dataset.cat; state.shown = 14;
    catBox.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    renderWall();
  });
  $('#more').addEventListener('click', function () { state.shown += STEP; renderWall(); });
  $('#searchForm').addEventListener('submit', function (e) { e.preventDefault(); });
  $('#q').addEventListener('input', function () { state.q = this.value; state.shown = 14; renderWall(); });
  renderWall();

  /* ---------- 值得关注的摄影师 ---------- */
  F.authors.slice(0, 6).forEach(function (a, i) {
    var li = el('li', 'card person');
    li.innerHTML = '<span class="avatar avatar--xl">' + window.Art.avatar(a.img, 192, a.name + ' 的头像(占位图)') + '</span><strong class="person__name"></strong><span class="person__meta f"></span><span class="person__meta n"></span><button class="btn" type="button" data-follow></button>';
    $('.person__name', li).textContent = a.name; $('.f', li).textContent = a.field; $('.n', li).textContent = a.followers + ' 粉丝';
    bindFollow($('[data-follow]', li), i);
    $('#peopleGrid').appendChild(li);
  });

  /* ---------- 详情弹窗 ---------- */
  var dlg = $('#viewer'), view = { p: null, list: [], opener: null };
  bindFollow($('#vFollow'), 0);
  function exifRows(p) {
    var s = PRESET[p.cat];
    return [['camera', '相机', 'Voss R5'], ['aperture', '镜头', s[0]], ['sliders-horizontal', '参数', s[1] + ',' + s[2] + ',' + s[3] + ',' + s[4]], ['map-pin', '拍摄地', p.loc], ['clock', '拍摄时间', '2025 年 ' + (11 - (p.day % 11)) + ' 月']];
  }
  function renderComments(p) {
    var box = $('#vComments'); box.textContent = '';
    var all = F.comments.concat(extraComments[p.id] || []);
    all.forEach(function (c) {
      var li = el('li', 'comment');
      li.innerHTML = '<span class="avatar avatar--sm">' + window.Art.avatar(c[1], 64, '') + '</span><div class="comment__body"><div class="comment__head"><strong></strong><span></span></div><p class="comment__text"></p></div>';
      $('strong', li).textContent = c[0]; $('.comment__head span', li).textContent = c[3]; $('.comment__text', li).textContent = c[2];
      box.appendChild(li);
    });
    $('#vCommentN').textContent = p.comments + (extraComments[p.id] || []).length;
  }
  function renderViewer(p) {
    view.p = p;
    var a = F.authors[p.a];
    $('#vFig').innerHTML = window.Art.photo(p, 1800, false);
    $('#vAvatar').innerHTML = window.Art.avatar(a.img, 128, a.name + ' 的头像(占位图)');
    $('#vBy').textContent = a.name; $('#vLoc').textContent = p.loc;
    var fb = $('#vFollow'); fb.dataset.a = p.a; paintFollow(fb, p.a);
    $('#vTitle').textContent = p.title; $('#vDesc').textContent = p.desc;
    var tags = $('#vTags'); tags.textContent = '';
    (p.tags || [p.cat, p.loc.split(' ')[0]]).forEach(function (t) { tags.appendChild(el('span', 'chip', window.Icon('tag', 'icon--sm') + '<span>' + t + '</span>')); });
    var ex = $('#vExif'); ex.textContent = '';
    exifRows(p).forEach(function (r) { var d = el('div', '', '<dt>' + window.Icon(r[0], 'icon--sm') + r[1] + '</dt><dd></dd>'); $('dd', d).textContent = r[2]; ex.appendChild(d); });
    var lb = $('#vLike'); lb.dataset.like = p.id; $('#vSave').dataset.save = p.id;
    $('#vLikeN').className = 'n';
    syncLike(p); syncSave(p); renderComments(p);
    var i = view.list.indexOf(p);
    $('#vPrev').disabled = i <= 0; $('#vNext').disabled = i < 0 || i >= view.list.length - 1;
  }
  function openViewer(p, list, trigger) { view.list = list; view.opener = trigger; renderViewer(p); if (!dlg.open) dlg.showModal(); }
  function stepViewer(d) { var i = view.list.indexOf(view.p) + d; if (i >= 0 && i < view.list.length) renderViewer(view.list[i]); }
  $('#vPrev').addEventListener('click', function () { stepViewer(-1); });
  $('#vNext').addEventListener('click', function () { stepViewer(1); });
  $('#vClose').addEventListener('click', function () { dlg.close(); });
  $('#vLike').addEventListener('click', function () { toggleLike(view.p); });
  $('#vSave').addEventListener('click', function () { toggleSave(view.p); });
  $('#vShare').addEventListener('click', function () { share(view.p); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.target.matches('input')) return;
    if (e.key === 'ArrowRight') stepViewer(1); else if (e.key === 'ArrowLeft') stepViewer(-1);
  });
  dlg.addEventListener('close', function () { if (view.opener && document.contains(view.opener)) view.opener.focus(); });
  $('#commentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('#commentIn'), t = input.value.trim(); if (!t) return;
    (extraComments[view.p.id] = extraComments[view.p.id] || []).push([F.me.name, F.me.img, t, '刚刚']);
    input.value = ''; renderComments(view.p); say('评论已发布');
  });
})();
