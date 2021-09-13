<template>
  <a
    class="nav-bar-title"
    href="javascript:;"
    :aria-label="`${theme.title}, back to home`"
  >
    <img
      v-if="theme.logo"
      class="logo"
      :src="withBase(theme.logo)"
      alt="Logo"
    />
    {{ site.title }}
  </a>
</template>
<script setup >
import { withBase, useData } from 'vitepress'
const {site, theme} = useData();
</script>

<style scoped>
.nav-bar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--c-text);
}

.nav-bar-title:hover {
  text-decoration: none;
}

.logo {
  width: 2.5rem;
  height: 2.5rem !important;
  vertical-align: middle;
}
</style>
