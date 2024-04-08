<template>
    <Layout>
        <template #doc-footer-before>
            <img :src="isDark ? '/images/footer_dark.png' : '/images/footer.png'" alt="footer" loading="lazy"
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
