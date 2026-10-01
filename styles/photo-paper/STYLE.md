# photo-paper(摄影铜版纸)

**气质**:一本印得很好的摄影画册。纸白的页面、墨色的字,照片之间留出宽阔的“过道”;没有线框、没有投影,边界全靠留白与明度差自然形成。适合摄影社区、图库、作品集、画册式的内容聚合页。

## 设计原则
1. **边界是留白**:分组靠间距,不靠描边或分割线。照片与照片之间是“过道”(`--gap-aisle`,24–44px),区块与区块之间是 `--gap-section`。
2. **纸的质感**:页面底色是冷调纸白(`--color-bg`),卡片是更亮的纸(`--color-surface`);整页叠一层极淡的颗粒(`--texture-paper`)。颗粒只能用令牌控制,不要再叠别的纹理。
3. **版面要宽**:内容容器用 `--container-wide`(1760px),两侧留 `--pad-page`;照片墙用等高对齐的行式布局。
4. **一个强调色**:蓝色(`--color-primary`)只给主操作与当前状态;红色(`--color-danger`)只给“喜欢”的实心爱心。其余全部是纸与墨的灰阶。
5. **图标按需使用,而不是回避**:凡是用图标比文字更快、更省空间的地方就用——点赞、收藏、分享、搜索、通知、上传、导航、元信息(相机、地点、时间)。规则见下文。
6. **圆角按角色,不按大小**:见下表。

## 圆角
| 角色 | 令牌 | 值 | 用在哪里 |
|---|---|---|---|
| 照片 | `--radius-media` | 4px | 照片、缩略图、封面。印刷品的微圆角,不随尺寸变化 |
| 控件 | `--radius-control` | 8px | 按钮、输入框、可点击的小面板 |
| 容器 | `--radius-surface` | 16px | 卡片、面板等承载内容的块 |
| 浮层 | `--radius-overlay` | 24px | 弹窗、抽屉——页面上最大的容器 |
| 胶囊 | `--radius-pill` | 全圆 | 标签、分类、分段选项、徽标 |
| 圆形 | `--radius-round` | 50% | 头像、圆形图标按钮 |

三条规矩:**同一角色同一圆角**;**容器越大圆角越大**(控件 < 容器 < 浮层);**嵌套时内圆角 = 外圆角 − 内边距**(不小于 `--radius-media`)。

## 图标
- 统一使用 `shared/icons.js`(Lucide,线性、圆角端点),颜色继承文字色,尺寸用 `--icon-sm/md/lg`,线宽 `--icon-stroke`。
- 图标按钮必须有 `aria-label`;图标和文字并排时,图标是装饰(`aria-hidden`)。
- 状态用填充表达(如喜欢:同一个爱心,选中后填充为 `--color-danger`),不要换另一套图标。
- 不要为了“有图标”而配图标;一个按钮上最多一个图标。

## 禁止
- 彩色大面积背景、渐变装饰、玻璃拟态、阴影堆叠(仅弹窗用 `--shadow-raised`)。
- 在照片周围加描边或相框。
- 全大写的标签、等宽字体的数据标签、`A · B · C` 式拼接元信息、按钮文字后面加“→”。
- 在示例里写任何颜色、长度、时长的字面量(用 `node scripts/check-tokens.mjs` 检查)。

## 引用方式
```html
<link rel="stylesheet" href="../../../styles/photo-paper/tokens.css">
<link rel="stylesheet" href="../../../shared/base.css">
<link rel="stylesheet" href="../../../shared/icons.css">
<link rel="stylesheet" href="../../../styles/photo-paper/components.css">
...
<script src="../../../shared/icons.js"></script>
```
