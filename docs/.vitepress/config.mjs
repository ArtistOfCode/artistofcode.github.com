import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import nav from './config/nav'
import sidebar from './config/sidebar'

export default defineConfig({
  title: "CodeArtist - 码匠",
  titleTemplate: ":title",
  description: "CodeArtist Docs",
  lang: "zh-CN",
  head: [
    ['link', { rel: 'icon', href: '/icons/logo.svg' }],
    ['script', {}, `var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?f0ecbd29a75895a987c3708f40d4093e";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();`]
  ],
  themeConfig: {
    nav,
    sidebar,
    externalLinkIcon: true,
    logo: '/icons/logo.svg',
    outline: { label: '页面导航', level: [2, 3] },
    editLink: {
      text: '在GitHub上编辑此页面',
      pattern: 'https://github.com/ArtistOfCode/artistofcode.github.com'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArtistOfCode' },
    ],
    footer: {
      message: '本网站博客以 AGPL-3.0 协议授权',
      copyright: '版权所有 © 2017-至今 CodeArtist - 码匠开源社区'
    },
    outlineTitle: '目录',
    sidebarMenuLabel: '目录',
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
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
    image: { lazyLoading: true },
    container: {
      infoLabel: '信息',
      noteLabel: '信息',
      tipLabel: '提示',
      importantLabel: '重要',
      warningLabel: '警告',
      detailsLabel: '详细信息',
      cautionLabel: '危险',
      dangerLabel: '危险',
    }
  }
})
