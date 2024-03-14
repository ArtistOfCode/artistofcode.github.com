---
layout: page
---
<script setup>
import {VPTeamPage,VPTeamPageTitle,VPTeamMembers} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/ArtistOfCode.png',
    name: '码匠',
    title: '团队',
    links: [
      { icon: 'github', link: 'https://github.com/ArtistOfCode' },
      { icon: { svg: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512zm259.149-568.883h-290.74a25.293 25.293 0 00-25.292 25.293l-.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 01-75.853 75.853h-240.23a25.293 25.293 0 01-25.267-25.293V417.203a75.853 75.853 0 0175.827-75.853h353.946a25.293 25.293 0 0025.267-25.292l.077-63.207a25.293 25.293 0 00-25.268-25.293H417.152a189.62 189.62 0 00-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 00170.65-170.65V480.384a25.293 25.293 0 00-25.293-25.267z"/></svg>' }, link: 'https://gitee.com/code_artist' },
    ]
  },
  {
    avatar: 'https://www.github.com/aijiangnan.png',
    name: '艾江南',
    title: '创始人',
    links: [
      { icon: 'github', link: 'https://github.com/aijiangnan' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>CodeArtist Teams</template>
    <template #lead>码匠（Code Artist）开源工作组初始于2017年，成员如下：</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>