/* 占位图来自免费图床:剧照/海报 picsum.photos(按 id 固定种子),人像 i.pravatar.cc。
   上线时把这些函数换成真实图片地址即可。 */
(function () {
  function img(src, alt, extra) {
    return '<img src="' + src + '" alt="' + alt + '" loading="lazy" decoding="async"' + (extra || '') + '>';
  }
  function still(work, w, h) {
    return img('https://picsum.photos/seed/' + work.id + '-w/' + (w || 900) + '/' + (h || 600), work.title + ' 剧照(占位图)');
  }
  function poster(work) {
    return img('https://picsum.photos/seed/' + work.id + '/400/600', work.title + ' 海报(占位图)');
  }
  function portrait(o) {
    return img('https://i.pravatar.cc/' + (o.size || 900) + '?img=' + o.img, o.label || '肖像(占位图)');
  }
  window.Art = { still: still, poster: poster, portrait: portrait };
})();
