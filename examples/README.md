# examples/ — 示例页面

目录规则:**`examples/<用途>/<风格>/index.html`**

- `<用途>`:页面类型,如 `landing`、`dashboard`、`auth`、`blog`、`pricing`、`docs`、`ecommerce`
- `<风格>`:必须是 `styles/` 下已存在的目录名

同一用途可以有多个风格(横向对比),同一风格也可以有多个用途(纵向覆盖)。

每个示例是**完全自包含的静态页面**:无构建、无框架,双击即可打开,也可直接发布到 GitHub Pages。

新增示例:复制 `_template/` → 放到 `examples/<用途>/<风格>/` → 在 `assets/catalog.js` 登记。详见 `docs/adding-an-example.md`。
