/* 示例清单。总览页 index.html 根据它自动生成卡片与筛选器。
   新增示例或风格后,在这里登记一条即可。 */
window.CATALOG = {
  useCases: {
    landing: "落地页",
    dashboard: "仪表盘",
    auth: "登录/注册",
    blog: "博客/文章",
    "actor-profile": "演员主页",
    "photographer-profile": "摄影师主页",
  },
  styles: {
    "minimal-light": "极简浅色",
    "bright-modern": "明亮现代",
    "photo-dark": "摄影暗色",
  },
  examples: [
    {
      path: "examples/photographer-profile/photo-dark/",
      title: "陈屿 摄影师主页",
      useCase: "photographer-profile",
      style: "photo-dark",
      description: "封面与资料、行式照片墙、图集与关于标签页,点击照片进入带拍摄参数的灯箱。",
    },
    {
      path: "examples/actor-profile/bright-modern/",
      title: "林知远 演员主页",
      useCase: "actor-profile",
      style: "bright-modern",
      description: "大字姓名、代表作大卡、海报网格与类型筛选;点击任一作品查看详情。",
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
