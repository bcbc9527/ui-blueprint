/* 内容为示例性介绍：字体名称为真实的开源字体（均为 SIL OFL 许可，来自 Google Fonts）;
   历史部分为概要，具体年代与人物请以专业资料为准。 */
window.TYPE = {
  features: [
    { id: "uroko", name: "鱗（うろこ）", text: "横画转折、收笔处的小三角。它让笔画“收得住”，也是明朝体最容易辨认的记号。", at: [52, 35] },
    { id: "yoko", name: "横画细", text: "横线最细，通常只有竖线粗度的一半上下。细横线在大字号下优雅，在小字号下容易发虚。", at: [23, 51] },
    { id: "tate", name: "竖画粗", text: "竖线较粗，撑起字面的骨架。横细竖粗形成的对比，是明朝体的节奏感来源。", at: [50, 67] },
    { id: "harai", name: "払い（撇）", text: "撇画收笔尖锐，线条由粗渐细，带着刻刀走过的利落感。", at: [16, 83] },
    { id: "hane", name: "はね（钩）", text: "竖钩的末端干脆地转折出去，收尾锋利，不拖泥带水。", at: [34, 84] },
  ],
  glyphFonts: [
    { id: "shippori", name: "Shippori Mincho", css: "--font-mincho-shippori", weight: 600 },
    { id: "zen", name: "Zen Old Mincho", css: "--font-mincho-zen", weight: 600 },
    { id: "noto", name: "Noto Serif JP", css: "--font-mincho-noto", weight: 600 },
  ],
  history: [
    { when: "宋代", title: "雕版印书兴盛", text: "刻本流行，字体大多模仿当时的书法名家，字形圆润、笔画不拘一格。" },
    { when: "明代中后期", title: "匠体字成形", text: "刻工为了提高效率，逐渐形成横画细、竖画粗、起收笔规整的写法。这套字形在日本被称为“明朝体”，名字便来自这里。" },
    { when: "江户至明治", title: "传入日本，转为活字", text: "这种字形传到日本，十九世纪后期随着金属活字的铸造展开，成为书籍与报纸的标准正文字体。" },
    { when: "二十世纪", title: "照排与数码字库", text: "各家字体厂商不断推出不同粗细、不同字面大小的明朝体，字面逐渐精细化，用途也从正文扩展到标题与设计。" },
    { when: "近年", title: "开源字体走进网页", text: "多款明朝体以开源许可发布，可以直接在网页中使用。本页的所有标本字体都来自 Google Fonts，采用 SIL OFL 许可。" },
  ],
  compare: {
    sample: "明朝体の横線は細く、縦線は太い。永遠に続く夜の静けさ。",
    sampleZh: "横细竖粗，是明朝体最容易辨认的特征。",
  },
  tester: {
    fonts: [
      { id: "shippori", name: "Shippori Mincho", css: "--font-mincho-shippori", weights: [400, 500, 600, 700, 800], note: "观感柔和，笔画略带圆润，适合标题与有文艺气质的正文。" },
      { id: "zen", name: "Zen Old Mincho", css: "--font-mincho-zen", weights: [400, 500, 600, 700, 900], note: "字形偏传统，笔画挺拔，有铅字排印的质感。" },
      { id: "noto", name: "Noto Serif JP", css: "--font-mincho-noto", weights: [200, 300, 400, 500, 600, 700, 800, 900], note: "中性、完整，字符覆盖最广，适合作为通用的正文字体。" },
      { id: "biz", name: "BIZ UDPMincho", css: "--font-mincho-biz", weights: [400, 700], note: "按通用设计(UD)思路制作，细线不至于太细，小字号更易读。" },
      { id: "kaisei", name: "Kaisei Tokumin", css: "--font-mincho-kaisei", weights: [400, 500, 700, 800], note: "“特明朝”风格，横画更细、对比更强，适合大标题。" },
      { id: "song", name: "Noto Serif SC", css: "--font-song-sc", weights: [200, 300, 400, 500, 600, 700, 800, 900], note: "简体中文里对应的宋体系字体，用来和日文明朝体对照。" },
    ],
    presets: [
      { id: "ja", label: "和文", text: "永遠に続く夜の静けさ。細い横線が、紙の上で光る。" },
      { id: "zh", label: "中文", text: "横细竖粗，收笔有鱗。好的排版，让人忘记字体本身。" },
      { id: "en", label: "English", text: "Typography is the craft of making language visible." },
      { id: "num", label: "数字", text: "0123456789 2025年10月1日 ¥1,280 3.14159" },
    ],
  },
  vertical: {
    title: "赤壁賦（節選）",
    text: "壬戌之秋，七月既望，蘇子與客泛舟，遊於赤壁之下。清風徐來，水波不興。舉酒屬客，誦明月之詩，歌窈窕之章。少焉，月出於東山之上，徘徊於斗牛之間。白露橫江，水光接天。縱一葦之所如，凌萬頃之茫然。浩浩乎如馮虛御風，而不知其所止；飄飄乎如遺世獨立，羽化而登仙。",
  },
  tips: [
    { icon: "book-open", title: "正文", text: "长文用 400 至 500 的字重，字号 16px 以上，行高 1.8 左右。多数明朝体的字面略小于黑体，同样字号看起来更小，可以放大一级。" },
    { icon: "type", title: "标题", text: "大标题可以用更粗或对比更强的字重，例如“特明朝”。字号越大，细横线越清晰，越能显出气质。" },
    { icon: "monitor", title: "屏幕", text: "小字号下细横线会发虚。建议不小于 14px，字重不低于 500；低分辨率屏幕优先考虑 UD 系列或黑体。" },
    { icon: "languages", title: "中日混排", text: "日文明朝体配中文宋体，同一系统的字体放在一起，再统一调整标点与数字的字重，避免粗细不一。" },
    { icon: "moon", title: "深色背景", text: "深色底上，明朝体的细线会显得更细。可以略微提高字重或字号，并提高文字亮度，拖动上面的滑块就能看到差别。" },
    { icon: "printer", title: "印刷", text: "印刷品上细线更稳定，可以用更小的字号和更低的字重。输出前确认字体授权，并把字体嵌入文件。" },
  ],
};
