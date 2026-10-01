/* 示例清单。总览页 index.html 根据它自动生成卡片与筛选器。
   新增示例或风格后,在这里登记一条即可。 */
window.CATALOG = {
  useCases: {
    landing: "落地页",
    dashboard: "仪表盘",
    auth: "登录/注册",
    blog: "博客/文章",
    "actor-profile": "演员主页",
  },
  styles: {
    "minimal-light": "极简浅色",
    "contact-sheet": "联系印样",
  },
  examples: [
    {
      path: "examples/actor-profile/contact-sheet/",
      title: "林知远 演员主页",
      useCase: "actor-profile",
      style: "contact-sheet",
      description: "作品是底片上的帧,代表作被红笔圈出;点击任一帧放大查看。",
    },
    {
      path: "examples/landing/minimal-light/",
      title: "Fieldnote 产品落地页",
      useCase: "landing",
      style: "minimal-light",
      description: "含导航、Hero、功能、价格、FAQ 的 SaaS 落地页。",
    },
  ],
};
