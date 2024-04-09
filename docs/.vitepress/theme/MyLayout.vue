<template>
    <Layout>
        <template #doc-footer-before>
            <img :src="isDark ? '/images/wechat_dark.png' : '/images/wechat.png'" alt="wechat" loading="lazy"
                style="margin-bottom:64px;" />
        </template>
    </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { isDark } = useData()
const { Layout } = DefaultTheme
</script>
