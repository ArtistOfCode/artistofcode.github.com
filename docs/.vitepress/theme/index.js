import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import DocFooter from './components/DocFooter.vue'
import Giscus from './components/Giscus.vue'
import WeChat from './components/WeChat.vue'
import './styles/custom.css'
import './styles/style.css'

export default {
    extends: DefaultTheme,
    Layout: h(DefaultTheme.Layout, null, {
        'doc-after': () => (h(Giscus)),
        'doc-footer-before': () => (h(DocFooter))
    }),
    enhanceApp({ app }) {
        app.component('WeChat', WeChat)
    },
}
