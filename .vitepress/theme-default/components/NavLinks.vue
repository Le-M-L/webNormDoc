<template>
    <nav v-if="show" class="nav-links">
        <template v-if="links">
            <div v-for="item in links" :key="item.text" class="item">
                <NavDropdownLink v-if="item.items" :item="item" />
                <NavLink v-else :item="item" />
            </div>
        </template>

    </nav>
</template>

<script setup>
    import { computed } from 'vue';
    import { useData } from 'vitepress';
    import NavLink from './NavLink.vue';
    import NavDropdownLink from './NavDropdownLink.vue';
    const { site } = useData();
    const links = computed(() => site.value.themeConfig.nav);
    const show = computed(() => links.value || repo.value);
</script>

<style scoped>
    .nav-links {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--c-divider);
    }

    @media (min-width: 720px) {
        .nav-links {
            display: flex;
            padding: 6px 0 0;
            align-items: center;
            border-bottom: 0;
        }

        .item + .item {
            padding-left: 24px;
        }
    }
</style>
