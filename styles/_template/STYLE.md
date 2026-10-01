# <风格名>

**气质**:一两句话描述这个风格给人的感觉,以及适合哪些用途。

## 设计原则
1. …(3–6 条,每条可执行,例如“边界靠留白形成,不靠线框”)

## 圆角
先填这张表,再改 `tokens.css` 的 `--ref-radius-*`。规则见 `docs/tokens.md` 第三节。
| 角色 | 令牌 | 值 | 用在哪里 |
|---|---|---|---|
| 照片/媒体 | `--radius-media` | | |
| 控件 | `--radius-control` | | |
| 容器 | `--radius-surface` | | |
| 浮层 | `--radius-overlay` | | |
| 胶囊 | `--radius-pill` | 全圆 | |
| 圆形 | `--radius-round` | 50% | |

## 图标
统一使用 `shared/icons.js`。写明本风格对图标的用法(尺寸、线宽、什么时候用、状态怎么表达)。

## 禁止
- …(明确列出不要做的事,AI 最需要这一节)
- 在示例里写任何颜色、长度、时长的字面量(用 `node scripts/check-tokens.mjs` 检查)。

## 引用方式
```html
<link rel="stylesheet" href="../../../styles/<风格名>/tokens.css">
<link rel="stylesheet" href="../../../shared/base.css">
<link rel="stylesheet" href="../../../shared/icons.css">
<link rel="stylesheet" href="../../../styles/<风格名>/components.css">
...
<script src="../../../shared/icons.js"></script>
```
