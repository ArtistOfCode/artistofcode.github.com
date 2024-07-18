<template>
    <template v-if="hasSidebar" v-for="{ text, items } in sidebar">
        <h2 :id='text'>
            {{ text }}
            <a class="header-anchor" :href="`#${text}`" :aria-label="`Permalink to ${text}`" />
        </h2>
        <ul style="list-style: none;">
            <li v-for="{ text: t, link } in items"><a :href="link">{{ t }}</a></li>
        </ul>
    </template>
</template>

<script setup>
import { useSidebar } from 'vitepress/theme'
const { hasSidebar, sidebar } = useSidebar()
</script>
