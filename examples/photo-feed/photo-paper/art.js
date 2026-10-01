/* 占位图来自免费图床:照片 picsum.photos(按 id 固定种子),头像 i.pravatar.cc。
   上线时把这些函数换成真实图片地址即可。 */
(function () {
  function dims(r, long) { return r >= 1 ? [long, Math.round(long / r)] : [Math.round(long * r), long]; }
  function photo(p, long, lazy) {
    var d = dims(p.r, long);
    return '<img src="https://picsum.photos/seed/px-' + p.id + '/' + d[0] + '/' + d[1] + '" width="' + d[0] + '" height="' + d[1] + '" alt="' + p.title + '(占位图)"' + (lazy === false ? '' : ' loading="lazy"') + ' decoding="async">';
  }
  function avatar(n, size, alt) {
    return '<img src="https://i.pravatar.cc/' + size + '?img=' + n + '" width="' + size + '" height="' + size + '" alt="' + (alt || '') + '" decoding="async">';
  }
  window.Art = { photo: photo, avatar: avatar };
})();
