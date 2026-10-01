# typeset(组版)

**气质**:一本讲排版的小册子。冷白的纸,墨色的字,靛蓝是唯一的强调色;细线(罫线)不是装饰,而是排版的一部分——基线、字面框、栏线。支持明/暗两套主题。适合字体专题、排版教程、文档与长文阅读、编辑类页面。

## 设计原则
1. **文字是主角**:阅读区用衬线(`--font-serif`),界面用无衬线(`--font-sans`);被讨论的“标本字体”只出现在标本区,通过 `--font-mincho-*` 等令牌引用。
2. **细线承载信息**:细线只用来表示“量度与结构”(基线、字面框、列表行之间),用 `--rule-width` 与 `--color-border`;不要拿细线做纯装饰边框。
3. **靛蓝只做三件事**:主操作、当前状态、字形解剖图上的标注线(`--color-annotation`)。其余全部是纸与墨。
4. **主题换肤只动语义层**:暗主题在 `:root[data-theme="dark"]` 中重映射 `--color-*`;示例与组件不得为暗色单独写颜色。
5. **阅读舒适**:正文行宽不超过 `--measure`,中文行高 ≥ `--leading-relaxed`;标本字的字号用 `--text-specimen-*`。
6. **动效只有一处**:进入页面时开篇巨字的淡入。其余交互只给即时反馈。

## 圆角(印刷品式的小圆角)
| 角色 | 令牌 | 值 | 用在哪里 |
|---|---|---|---|
| 图/标本框 | `--radius-media` | 2px | 字形框、标本框、分段控件内的按钮 |
| 控件 | `--radius-control` | 6px | 按钮、输入框、文本域、分段控件外框 |
| 容器 | `--radius-surface` | 8px | 卡片、面板 |
| 浮层 | `--radius-overlay` | 12px | 弹层、抽屉 |
| 胶囊 | `--radius-pill` | 全圆 | 标签、字体选择芯片、滑块轨道 |
| 圆形 | `--radius-round` | 50% | 滑块拇指、圆形图标按钮 |

比 `photo-paper` 更小:精确、克制是这个风格的语气;嵌套时仍遵守“内圆角 = 外圆角 − 内边距”(分段控件:外框 6px、内按钮 2px)。

## 图标
统一使用 `shared/icons.js`。用在:主题切换(日/月)、方向切换(横/竖)、复制、导航与小节标题旁的语义标记。图标按钮必须有 `aria-label`;状态变化优先改变颜色/填充,不换款。

## 禁止
- 奶油底色 + 陶土红的“日式”惯用配色;任何装饰性渐变、投影堆叠、玻璃拟态。
- 全大写的小标签、`A · B · C` 式拼接元信息、按钮文字后面加“→”。
- 在示例里写任何颜色、长度、时长的字面量(用 `node scripts/check-tokens.mjs` 检查)。

## 引用方式
```html
<link rel="stylesheet" href="../../../styles/typeset/tokens.css">
<link rel="stylesheet" href="../../../shared/base.css">
<link rel="stylesheet" href="../../../shared/icons.css">
<link rel="stylesheet" href="../../../styles/typeset/components.css">
...
<script src="../../../shared/icons.js"></script>
```

## 扩展令牌
`--font-serif`、`--font-mincho-*`、`--font-song-sc`、`--font-gothic-ref`、`--text-specimen-*`、`--color-annotation`、`--glyph-box`、`--vertical-h`、`--rule-width`、`--range-*`。
