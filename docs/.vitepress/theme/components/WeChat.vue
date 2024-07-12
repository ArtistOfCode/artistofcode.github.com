<template>
    <img :src="isDark ? '/images/wechat_dark.png' : '/images/wechat.png'" alt="wechat" />
</template>

<script setup>
import { useData } from 'vitepress';
const { isDark } = useData()
</script>
