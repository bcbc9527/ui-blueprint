(function () {
  var C = window.CATALOG, state = { use: "all", style: "all" };
  var $ = function (id) { return document.getElementById(id); };

  function chips(el, key, map) {
    var opts = [["all", "全部"]].concat(Object.keys(map).map(function (k) { return [k, map[k]]; }));
    opts.forEach(function (o) {
      var b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.textContent = o[1]; b.dataset.v = o[0];
      b.setAttribute("aria-pressed", o[0] === "all");
      b.onclick = function () { state[key] = o[0]; sync(el, o[0]); render(); };
      el.appendChild(b);
    });
  }
  function sync(el, v) {
    el.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.v === v); });
  }
  function fit(thumb) {
    var f = thumb.firstChild; f.style.transform = "scale(" + thumb.clientWidth / 1280 + ")";
  }
  function card(e) {
    var d = document.createElement("article"); d.className = "card";
    var a = document.createElement("a"); a.href = e.path;
    var t = document.createElement("div"); t.className = "thumb";
    var f = document.createElement("iframe"); f.src = e.path; f.loading = "lazy"; f.tabIndex = -1; f.title = e.title + " 预览";
    t.appendChild(f);
    var m = document.createElement("div"); m.className = "meta";
    var h = document.createElement("h2"); h.textContent = e.title;
    var p = document.createElement("p"); p.textContent = e.description || "";
    var g = document.createElement("div"); g.className = "tags";
    [C.useCases[e.useCase] || e.useCase, C.styles[e.style] || e.style].forEach(function (s) {
      var x = document.createElement("span"); x.className = "tag"; x.textContent = s; g.appendChild(x);
    });
    m.append(h, p, g); a.append(t, m); d.appendChild(a);
    return d;
  }
  function render() {
    var box = $("cards"); box.textContent = "";
    var list = C.examples.filter(function (e) {
      return (state.use === "all" || e.useCase === state.use) && (state.style === "all" || e.style === state.style);
    });
    $("count").textContent = "共 " + list.length + " 个示例";
    if (!list.length) { var p = document.createElement("p"); p.className = "empty"; p.textContent = "没有符合条件的示例。"; box.appendChild(p); return; }
    list.forEach(function (e) { box.appendChild(card(e)); });
    box.querySelectorAll(".thumb").forEach(fit);
  }
  chips($("f-use"), "use", C.useCases);
  chips($("f-style"), "style", C.styles);
  render();
  window.addEventListener("resize", function () { document.querySelectorAll(".thumb").forEach(fit); });
})();
