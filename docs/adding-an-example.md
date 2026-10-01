# 新增示例 / 风格

## 新增示例
1. 选好用途 `<用途>`(如 `dashboard`)和已有风格 `<风格>`(如 `minimal-light`)。
2. 复制模板:
   ```bash
   mkdir -p examples/dashboard
   cp -r examples/_template examples/dashboard/minimal-light
   ```
3. 编辑 `examples/dashboard/minimal-light/index.html`,把 `<风格>` 替换为 `minimal-light`,写页面内容。
4. 在 `assets/catalog.js` 追加:
   ```js
   {
     path: "examples/dashboard/minimal-light/",
     title: "运营仪表盘",
     useCase: "dashboard",      // 需已在 useCases 中声明
     style: "minimal-light",    // 需已在 styles 中声明
     description: "一句话说明",
   }
   ```
5. 打开根目录 `index.html` 检查。

## 新增风格
1. `cp -r styles/_template styles/<新风格>`
2. 修改 `tokens.css` 的值(不改变量名),按需调整 `components.css`。
3. 在 `STYLE.md` 写清气质、原则、**禁止项**。
4. 在 `assets/catalog.js` 的 `styles` 登记 `"<新风格>": "显示名"`。
5. 建议同时做一个 `landing` 示例,方便与其他风格横向对比。

## 新增用途
只需在 `assets/catalog.js` 的 `useCases` 里加一项,再在 `examples/<用途>/` 下放示例即可。
