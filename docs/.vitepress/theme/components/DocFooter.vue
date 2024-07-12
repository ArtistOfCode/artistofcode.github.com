<template>
    <div class="vp-doc" style="font-size:14px;color:var(--vp-c-text-2);">
        <div class="footer-item">
            <Copyright class="footer-icon" />
            <span>使用 <a target="_blank"
                    href="https://raw.githubusercontent.com/ArtistOfCode/artistofcode.github.com/main/LICENSE">AGPL-3.0</a>
                许可协议进行共享</span>
        </div>
        <div class="footer-item">
            <Contributing class="footer-icon" />
            <span>若您有意共建社区，请阅读 <a>参与指南</a> 或 <a>文档贡献指南</a> </span>
        </div>
    </div>
</template>

<script setup>
import Contributing from './icons/Contributing.vue';
import Copyright from './icons/Copyright.vue';

</script>

<style scoped>
.footer-item {
    display: flex;
    align-items: center;
}

.footer-icon {
    height: 1em;
    width: 1em;
    line-height: 24px;
    margin-right: 8px;
    fill: currentColor;
    display: inline-flex;
}
</style>