# CLAUDE.md — 开发规范

本仓库是“多风格 × 多用途”的纯 HTML/CSS/JS 前端示例库,同时是 AI 前端开发的风格指引。

## 结构
- `styles/<风格>/`:`tokens.css`(设计令牌)、`components.css`、`STYLE.md`(风格指南)
- `examples/<用途>/<风格>/index.html`:示例页面
- `shared/base.css`:与风格无关的基础层
- `assets/catalog.js`:示例清单,**新增示例/风格必须登记**
- `index.html`:总览页,不要手工往里加卡片

## 硬性规则
1. **纯静态**:不引入框架、打包器、npm 依赖。需要字体可用系统字体栈;如必须用 Web 字体,只用 Google Fonts。
2. **示例自包含**:示例只能引用 `styles/`、`shared/` 和自己目录下的文件,用**相对路径**(Pages 子路径部署,不能用 `/` 开头的绝对路径)。
3. **只用令牌**:CSS 中不得写死颜色、字号、间距、圆角、阴影,一律用 `var(--…)`。令牌缺什么,先补进 `styles/<风格>/tokens.css`。
4. **令牌名不可变**:所有风格必须定义 `styles/_template/tokens.css` 中的同一套变量名。
5. **先读风格指南**:在某个风格下写页面前,先读 `styles/<风格>/STYLE.md`,遵守其“设计原则”和“禁止”。
6. **响应式**:至少适配 360px 与 1280px 宽度,无横向滚动。
7. **无障碍**:语义化标签、`lang`、图片 `alt`、可见焦点、文字对比度 ≥ 4.5:1、尊重 `prefers-reduced-motion`。
8. **内容虚构**:示例文案、品牌、数据均为虚构,页脚注明“示例页面”。不使用真实品牌商标。
9. **语言**:文档与注释用中文;代码标识符用英文。

## 新增示例流程
1. 确认 `styles/<风格>/` 存在(不存在先按 `styles/_template/` 新建)。
2. 复制 `examples/_template/` → `examples/<用途>/<风格>/`。
3. 实现页面;示例独有的样式写在该目录的 `style.css`。
4. 在 `assets/catalog.js` 的 `examples`(以及需要时的 `useCases` / `styles`)里登记。
5. 用浏览器打开 `index.html`,确认卡片出现且预览正常。

## 新增风格流程
复制 `styles/_template/` → `styles/<风格>/`,只改令牌的“值”,写好 `STYLE.md`(原则 + 禁止项),并在 `assets/catalog.js` 的 `styles` 登记。
