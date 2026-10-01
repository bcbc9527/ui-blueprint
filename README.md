# UI Blueprint

多种**视觉风格 × 页面用途**的纯 HTML/CSS/JS 前端示例库,用作 AI 辅助前端开发时的 UI/UX 风格指引。

> 打开根目录的 `index.html` 即可浏览全部示例(支持按用途、风格筛选)。

## 目录结构

```
index.html            总览页(自动读取 assets/catalog.js)
assets/               总览页的样式、脚本与示例清单 catalog.js
shared/                与风格无关的基础层:base.css、icons.js/icons.css(图标)
scripts/check-tokens.mjs  令牌检查:示例里不得出现硬编码的颜色/长度/时长
styles/               视觉风格库:每个风格 = tokens.css + components.css + STYLE.md
  _template/          新风格模板
  minimal-light/      示例风格
examples/             示例页面:examples/<用途>/<风格>/index.html
  _template/          新示例模板
docs/                 使用文档(tokens.md:令牌体系、圆角与间距用法)
CLAUDE.md             给 AI 的开发规范(让 AI 生成的页面符合本仓库风格)
```

## 核心约定
- **两个维度**:`styles/` 管“长什么样”,`examples/` 管“是什么页面”。示例通过引用某个风格的令牌来换皮。
- **三层令牌**:原始值 → 语义 → 组件。所有风格使用同一套语义令牌名,只有值不同;示例里不允许任何硬编码,由 `scripts/check-tokens.mjs` 检查。
- **零构建**:不使用框架与打包器,每个示例自包含,双击即可打开。

## 本地预览
```bash
python3 -m http.server 8000   # 然后访问 http://localhost:8000
```
也可直接双击 `index.html`(无需服务器)。

## 在线预览(GitHub Pages)
Settings → Pages → Source 选 **GitHub Actions**,推送到 `main` 后自动发布。

## 新增内容
见 [docs/adding-an-example.md](docs/adding-an-example.md)。
