# minimal-light

**气质**:克制、安静、留白充足,像一本排版良好的杂志。适合 SaaS 官网、文档、作品集、博客。

## 设计原则
1. **单一强调色**:页面里只有 `--color-primary`(深绿)一个有彩色;其余全部用中性色。
2. **留白优先**:区块之间用 `--space-7`/`--space-8`,不要用分割线填充空白。
3. **衬线标题 + 无衬线正文**:`--font-display` 用于 h1–h3,正文用 `--font-sans`。
4. **极轻的深度**:只用 `--shadow-sm` 和 1px 边框,悬停不放大、不位移。
5. **圆角统一**:控件 `--radius-md`,卡片 `--radius-lg`。

## 禁止
- 渐变背景、霓虹色、玻璃拟态、多个强调色。
- 在 CSS 里写死颜色/字号/间距(必须用令牌)。

## 引用方式
```html
<link rel="stylesheet" href="../../../styles/minimal-light/tokens.css">
<link rel="stylesheet" href="../../../shared/base.css">
<link rel="stylesheet" href="../../../styles/minimal-light/components.css">
```

## 已有示例
见 `assets/catalog.js` 中 `style: "minimal-light"` 的条目。
