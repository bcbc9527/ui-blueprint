/* 占位图来自免费图床:剧照 picsum.photos(按 id 固定种子),人像 i.pravatar.cc。
   上线时把这两个函数换成真实图片地址即可。 */
(function () {
  function still(work, w, h) {
    return '<img src="https://picsum.photos/seed/' + work.id + '/' + (w || 600) + '/' + (h || 400) + '" alt="' + work.title + ' 剧照(占位图)" loading="lazy" decoding="async">';
  }
  function portrait(opts) {
    return '<img src="https://i.pravatar.cc/' + (opts.size || 800) + '?img=' + opts.img + '" alt="' + (opts.label || '肖像(占位图)') + '" decoding="async">';
  }
  window.Art = { still: still, portrait: portrait };
})();
