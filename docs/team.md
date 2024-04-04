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