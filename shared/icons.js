/* 共享图标:取自 Lucide(ISC 许可,见同目录 ICONS-LICENSE.txt),lucide-static 1.49.0。
   用法:
     HTML  <span data-icon="heart"></span>              页面加载时自动替换为 SVG
     JS    Icon('heart')                                返回 SVG 字符串
   尺寸/线宽由令牌控制(见 shared/icons.css),颜色继承 currentColor。
   新增图标:到 lucide.dev 找到图标,把 <svg> 内部的 path 复制进下面的表。 */
(function () {
  var PATHS = {
    "heart": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"/>",
    "message-circle": "<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\"/>",
    "share-2": "<circle cx=\"18\" cy=\"5\" r=\"3\"/> <circle cx=\"6\" cy=\"12\" r=\"3\"/> <circle cx=\"18\" cy=\"19\" r=\"3\"/> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"/> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"/>",
    "bookmark": "<path d=\"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z\"/>",
    "search": "<path d=\"m21 21-4.34-4.34\"/> <circle cx=\"11\" cy=\"11\" r=\"8\"/>",
    "plus": "<path d=\"M5 12h14\"/> <path d=\"M12 5v14\"/>",
    "camera": "<path d=\"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z\"/> <circle cx=\"12\" cy=\"13\" r=\"3\"/>",
    "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/> <circle cx=\"12\" cy=\"10\" r=\"3\"/>",
    "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/> <circle cx=\"12\" cy=\"12\" r=\"3\"/>",
    "download": "<path d=\"M12 15V3\"/> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/> <path d=\"m7 10 5 5 5-5\"/>",
    "chevron-left": "<path d=\"m15 18-6-6 6-6\"/>",
    "chevron-right": "<path d=\"m9 18 6-6-6-6\"/>",
    "chevron-down": "<path d=\"m6 9 6 6 6-6\"/>",
    "x": "<path d=\"M18 6 6 18\"/> <path d=\"m6 6 12 12\"/>",
    "bell": "<path d=\"M10.268 21a2 2 0 0 0 3.464 0\"/> <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\"/>",
    "sliders-horizontal": "<path d=\"M10 5H3\"/> <path d=\"M12 19H3\"/> <path d=\"M14 3v4\"/> <path d=\"M16 17v4\"/> <path d=\"M21 12h-9\"/> <path d=\"M21 19h-5\"/> <path d=\"M21 5h-7\"/> <path d=\"M8 10v4\"/> <path d=\"M8 12H3\"/>",
    "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"/> <path d=\"m21.854 2.147-10.94 10.939\"/>",
    "user-plus": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/> <circle cx=\"9\" cy=\"7\" r=\"4\"/> <line x1=\"19\" x2=\"19\" y1=\"8\" y2=\"14\"/> <line x1=\"22\" x2=\"16\" y1=\"11\" y2=\"11\"/>",
    "check": "<path d=\"M20 6 9 17l-5-5\"/>",
    "aperture": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"m14.31 8 5.74 9.94\"/> <path d=\"M9.69 8h11.48\"/> <path d=\"m7.38 12 5.74-9.94\"/> <path d=\"M9.69 16 3.95 6.06\"/> <path d=\"M14.31 16H2.83\"/> <path d=\"m16.62 12-5.74 9.94\"/>",
    "images": "<path d=\"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16\"/> <path d=\"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2\"/> <circle cx=\"13\" cy=\"7\" r=\"1\" fill=\"currentColor\"/> <rect x=\"8\" y=\"2\" width=\"14\" height=\"14\" rx=\"2\"/>",
    "flame": "<path d=\"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4\"/>",
    "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"/> <path d=\"M20 2v4\"/> <path d=\"M22 4h-4\"/> <circle cx=\"4\" cy=\"20\" r=\"2\"/>",
    "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"M12 6v6l4 2\"/>",
    "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/> <circle cx=\"9\" cy=\"9\" r=\"2\"/> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/>",
    "grid-2x2": "<path d=\"M12 3v18\"/> <path d=\"M3 12h18\"/> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/>",
    "ellipsis": "<circle cx=\"12\" cy=\"12\" r=\"1\"/> <circle cx=\"19\" cy=\"12\" r=\"1\"/> <circle cx=\"5\" cy=\"12\" r=\"1\"/>",
    "award": "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\"/> <circle cx=\"12\" cy=\"8\" r=\"6\"/>",
    "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/> <path d=\"m9 12 2 2 4-4\"/>",
    "tag": "<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\"/> <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>",
    "zap": "<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\"/>",
    "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/>",
    "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\"/> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/> <circle cx=\"9\" cy=\"7\" r=\"4\"/>"
,
    "type": "<path d=\"M12 4v16\"/> <path d=\"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2\"/> <path d=\"M9 20h6\"/>",
    "book-open": "<path d=\"M12 5v16\"/> <path d=\"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z\"/>",
    "monitor": "<rect width=\"20\" height=\"14\" x=\"2\" y=\"3\" rx=\"2\"/> <line x1=\"8\" x2=\"16\" y1=\"21\" y2=\"21\"/> <line x1=\"12\" x2=\"12\" y1=\"17\" y2=\"21\"/>",
    "printer": "<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/> <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\"/> <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\"/>",
    "moon": "<path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"/>",
    "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/>",
    "languages": "<path d=\"m5 8 6 6\"/> <path d=\"m4 14 6-6 2-3\"/> <path d=\"M2 5h12\"/> <path d=\"M7 2h1\"/> <path d=\"m22 22-5-10-5 10\"/> <path d=\"M14 18h6\"/>",
    "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/> <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>",
    "align-left": "<path d=\"M21 5H3\"/> <path d=\"M15 12H3\"/> <path d=\"M17 19H3\"/>",
    "move-horizontal": "<path d=\"m18 8 4 4-4 4\"/> <path d=\"M2 12h20\"/> <path d=\"m6 8-4 4 4 4\"/>",
    "move-vertical": "<path d=\"M12 2v20\"/> <path d=\"m8 18 4 4 4-4\"/> <path d=\"m8 6 4-4 4 4\"/>",
    "ruler": "<path d=\"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z\"/> <path d=\"m14.5 12.5 2-2\"/> <path d=\"m11.5 9.5 2-2\"/> <path d=\"m8.5 6.5 2-2\"/> <path d=\"m17.5 15.5 2-2\"/>",
    "history": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/> <path d=\"M3 3v5h5\"/> <path d=\"M12 7v5l4 2\"/>",
    "columns-2": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/> <path d=\"M12 3v18\"/>",
    "quote": "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/> <path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/>",
    "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"M12 16v-4\"/> <path d=\"M12 8h.01\"/>",
    "lightbulb": "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/> <path d=\"M9 18h6\"/> <path d=\"M10 22h4\"/>",
    "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/> <path d=\"M3 3v5h5\"/>"
  };
  function Icon(name, cls) {
    var p = PATHS[name];
    if (!p) { if (window.console) console.warn('Icon: unknown "' + name + '"'); return ''; }
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + p + '</svg>';
  }
  function hydrate(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      el.insertAdjacentHTML('afterbegin', Icon(el.getAttribute('data-icon'), el.getAttribute('data-icon-class')));
      el.removeAttribute('data-icon');
    });
  }
  window.Icon = Icon;
  window.Icons = { names: Object.keys(PATHS), hydrate: hydrate };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { hydrate(); });
  else hydrate();
})();
