<template>
    <div v-if="frontmatter.comments !== false" :key="title" class="comments-container">
        <Giscus repo="ArtistOfCode/artistofcode.github.com" repo-id="R_kgDOKlUtSQ" category="文档评论区"
            category-id="DIC_kwDOKlUtSc4CgvWO" mapping="pathname" strict="1" reactions-enabled="1" emit-metadata="0"
            input-position="top" :theme="isDark ? 'dark' : 'light'" lang="zh-CN" loading="lazy" />
    </div>
</template>

<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData } from 'vitepress'

const { frontmatter, title, isDark } = useData()
</script>

<style scoped>
.comments-container {
    margin-top: 5rem;
}
</style>