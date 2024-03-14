import { defineConfig } from 'vitepress'

const part = ['基础篇', '框架篇', '架构篇', '运维篇', '前端篇', '测试篇', '工具篇', '业务篇', '管理篇', '中间件']

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CodeArtist - 码匠",
  titleTemplate: ":title",
  description: "CodeArtist Docs",
  lang: "zh-CN",
  head: [['link', { rel: 'icon', href: '/icons/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icons/logo.svg',
    outline: { label: '目录', level: 2 },
    nav: [
      {
        text: part[0], items: [
          {
            text: '计算机基础', items: [
              { text: '计算机基础原理', link: '/team' },
              { text: 'Windows基础教程', link: '/todo' },
              { text: 'Linux基础教程', link: '/todo' },
              { text: 'Office/WPS基础教程', link: '/todo' },
            ],
          },
          {
            text: '编程语言基础', items: [
              { text: 'C语言基础', link: '/todo' },
              { text: 'Java语言基础', link: '/todo' },
              { text: 'Python语言基础', link: '/todo' },
              { text: 'Go语言基础', link: '/todo' },
              { text: 'JavaScript语言基础', link: '/todo' },
            ]
          }
        ]
      },
      {
        text: part[1], items: [
          {
            text: 'Spring', items: [
              { text: 'Spring Framework', link: '/todo' },
              { text: 'Spring Boot', link: '/todo' },
              { text: 'Spring Cloud', link: '/todo' },
            ]
          },
          {
            text: 'MyBatis', items: [
              { text: 'MyBatis', link: '/todo' },
              { text: 'MyBatis Plus', link: '/todo' },
            ]
          },
        ]
      },
      {
        text: part[2], items: [
          {
            text: '架构演进', items: [
              { text: '1', link: '/todo' },
            ],
          },
          {
            text: '核心技术', items: [
              { text: '2', link: '/todo' },
            ],
          },
          {
            text: '关键系统', items: [
              { text: '4', link: '/todo' },
            ],
          },
          {
            text: '服务治理', items: [
              { text: '5', link: '/todo' },
            ],
          }
        ]
      },
      { text: part[3], link: '/todo' },
      { text: part[4], link: '/todo' },
      { text: part[5], link: '/todo' },
      { text: part[6], link: '/todo' },
      { text: part[7], link: '/todo' },
      { text: part[8], link: '/todo' },
      { text: part[9], link: '/todo' },
    ],

    sidebar: {
      '/outline': [
        {
          text: part[0], collapsed: true, items: [{
            text: '计算机基础', collapsed: true, items: [
              { text: '计算机基础原理', link: '/outline/todo' },
              { text: 'Windows基础教程', link: '/outline/todo' },
              { text: 'Linux基础教程', link: '/outline/todo' },
              { text: 'Office/WPS基础教程', link: '/outline/todo' },
            ],
          }, {
            text: '编程语言基础', collapsed: true, items: [
              { text: 'C语言基础', link: '/outline/todo' },
              { text: 'Java语言基础', link: '/outline/todo' },
              { text: 'Python语言基础', link: '/outline/todo' },
              { text: 'Go语言基础', link: '/outline/todo' },
              { text: 'JavaScript语言基础', link: '/outline/todo' },
            ]
          },]
        },
        {
          text: part[1], collapsed: false, items: [{
            text: 'Spring', collapsed: false, items: [
              { text: 'Spring Framework', link: '/outline/spring' },
              { text: 'Spring Boot', link: '/outline/springboot' },
              { text: 'Spring Cloud', link: '/outline/springcloud' },
            ]
          }, {
            text: 'MyBatis', collapsed: false, items: [
              { text: 'MyBatis', link: '/outline/todo' },
              { text: 'MyBatis Plus', link: '/outline/todo' },
            ]
          }]
        },
        { text: part[2], items: [] },
        { text: part[3], items: [] },
        { text: part[4], items: [] },
        { text: part[5], items: [] },
        { text: part[6], items: [] },
        { text: part[7], items: [] },
        { text: part[8], items: [] },
        { text: part[9], items: [] },
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArtistOfCode' },
      { icon: { svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512zm259.149-568.883h-290.74a25.293 25.293 0 00-25.292 25.293l-.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 01-75.853 75.853h-240.23a25.293 25.293 0 01-25.267-25.293V417.203a75.853 75.853 0 0175.827-75.853h353.946a25.293 25.293 0 0025.267-25.292l.077-63.207a25.293 25.293 0 00-25.268-25.293H417.152a189.62 189.62 0 00-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 00170.65-170.65V480.384a25.293 25.293 0 00-25.293-25.267z"/></svg>' }, link: 'https://gitee.com/code_artist' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-present CodeArtist'
    },
    outlineTitle: '目录',
    darkModeSwitchLabel: '主题',
    returnToTopLabel: '返回顶部',
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: {
      text: '最后修改',
      formatOptions: { dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24' }
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: { buttonText: '搜索文档', },
              modal: {
                displayDetails: "显示详情列表",
                resetButtonTitle: "清除查询条件",
                noResultsText: "无法找到相关结果",
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭', searchByText: '搜索提供者' },
              }
            }
          }
        }
      }
    },
  },
  markdown: {
    image: { lazyLoading: true }
  }
})
