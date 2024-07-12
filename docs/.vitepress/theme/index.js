import { InjectionKey as GitInjectKey, NolebaseGitChangelogPlugin } from '@nolebase/vitepress-plugin-git-changelog/client'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
// import { InjectionKey as PageInjectKey, NolebasePagePropertiesPlugin } from '@nolebase/vitepress-plugin-page-properties/client'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import DocFooter from './components/DocFooter.vue'
import Giscus from './components/Giscus.vue'
import './styles/custom.css'
import WeChat from './components/WeChat.vue'

export default {
    extends: DefaultTheme,
    Layout: h(DefaultTheme.Layout, null, {
        'doc-after': () => (h(Giscus)),
        'doc-footer-before': () => (h(DocFooter))
    }),
    enhanceApp({ app }) {
        app.component('WeChat', WeChat)

        app.provide(GitInjectKey, {
            mapAuthors: [
                {
                    name: 'AiJiangnan',
                    username: 'AiJiangnan',
                    mapByEmailAliases: ['904629998@qq.com']
                }
            ]
        })
        app.use(NolebaseGitChangelogPlugin)
        // app.provide(PageInjectKey,
        //     {
        //         properties: {
        //             'zh-CN': [
        //                 {
        //                     key: 'tags',
        //                     type: 'tags',
        //                     title: '标签',
        //                 },
        //                 {
        //                     key: 'progress',
        //                     type: 'progress',
        //                     title: '进度',
        //                 },
        //                 {
        //                     key: 'createdAt',
        //                     type: 'datetime',
        //                     title: '创建时间',
        //                     formatAsFrom: true,
        //                     dateFnsLocaleName: 'zhCN',
        //                 },
        //                 {
        //                     key: 'updatedAt',
        //                     type: 'datetime',
        //                     title: '更新时间',
        //                     formatAsFrom: true,
        //                     dateFnsLocaleName: 'zhCN',
        //                 },
        //                 {
        //                     key: 'wordsCount',
        //                     type: 'dynamic',
        //                     title: '字数',
        //                     options: {
        //                         type: 'wordsCount',
        //                     },
        //                 },
        //                 {
        //                     key: 'readingTime',
        //                     type: 'dynamic',
        //                     title: '阅读时间',
        //                     options: {
        //                         type: 'readingTime',
        //                         dateFnsLocaleName: 'zhCN',
        //                     },
        //                 },
        //             ],
        //         },
        //     }
        // )
        // app.use(NolebasePagePropertiesPlugin())
    },
}
