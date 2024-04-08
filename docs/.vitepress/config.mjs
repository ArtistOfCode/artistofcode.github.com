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
    outline: { label: '目录', level: [2, 3] },
    editLink: {
      text: '',
      pattern: 'https://github.com/ArtistOfCode/artistofcode.github.com'
    },
    nav: [
      { text: 'Spring', link: '/spring/' }
      // {
      //   text: part[0], link: '', items: [
      //     {
      //       text: '计算机基础', items: [
      //         { text: '计算机基础原理', link: '/team' },
      //         { text: 'Windows基础教程', link: '/todo' },
      //         { text: 'Linux基础教程', link: '/todo' },
      //         { text: 'Office/WPS基础教程', link: '/todo' },
      //       ],
      //     },
      //     {
      //       text: '编程语言基础', items: [
      //         { text: 'C语言基础', link: '/todo' },
      //         { text: 'Java语言基础', link: '/todo' },
      //         { text: 'Python语言基础', link: '/todo' },
      //         { text: 'Go语言基础', link: '/todo' },
      //         { text: 'JavaScript语言基础', link: '/todo' },
      //       ]
      //     }
      //   ]
      // },
      // {
      //   text: part[1], items: [
      //     {
      //       text: 'Spring', items: [
      //         { text: 'Spring Framework', link: '/todo' },
      //         { text: 'Spring Boot', link: '/todo' },
      //         { text: 'Spring Cloud', link: '/todo' },
      //       ]
      //     },
      //     // {
      //     //   text: 'MyBatis', items: [
      //     //     { text: 'MyBatis', link: '/todo' },
      //     //     { text: 'MyBatis Plus', link: '/todo' },
      //     //   ]
      //     // },
      //   ]
      // },
      // {
      //   text: part[2], link: '', items: [
      //     {
      //       text: '架构演进', items: [
      //         { text: '1', link: '/todo' },
      //       ],
      //     },
      //     {
      //       text: '核心技术', items: [
      //         { text: '2', link: '/todo' },
      //       ],
      //     },
      //     {
      //       text: '关键系统', items: [
      //         { text: '4', link: '/todo' },
      //       ],
      //     },
      //     {
      //       text: '服务治理', items: [
      //         { text: '5', link: '/todo' },
      //       ],
      //     }
      //   ]
      // }
    ],

    sidebar: {
      '/spring': [
        {
          text: '基础核心技术', base: '/spring', items: [
            { text: '1. Spring模块与应用场景', link: '/1' },
            { text: '2. 基于XML配置的容器', link: '/2' },
            { text: '3. 基于注解配置的容器', link: '/3' },
            { text: '4. 基于Java配置的容器', link: '/4' },
            { text: '5. 三种方式的混合和迁移', link: '/5' },
            { text: '6. 同类型多个Bean的注入', link: '/6' },
            { text: '7. 环境抽象', link: '/7' },
            { text: '8. 事件机制', link: '/8' },
            { text: '9. 资源管理', link: '/9' },
            { text: '10. 数据验证', link: '/10' },
            { text: '11. 数据绑定', link: '/11' },
            { text: '12. 类型转换', link: '/12' },
            { text: '13. SpEL表达式', link: '/13' },
          ]
        },
        { text: '面向切面编程', items: [] },
        { text: '数据访问和事务管理', items: [] },
        { text: 'Web Servlet应用', items: [] },
        { text: 'Web Reactive应用', items: [] },
        { text: '单元测试和集成测试', items: [] },
        { text: '其他组件', items: [] },
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArtistOfCode' },
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
