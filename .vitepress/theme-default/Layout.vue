<template>
    <div>
        <NavBar></NavBar>

        <SideBar :open="openSideBar">
            <template #sidebar-top>
                <slot name="sidebar-top" />
            </template>
            <template #sidebar-bottom>
                <slot name="sidebar-bottom" />
            </template>
        </SideBar>
        <!-- TODO: make this button accessible -->
        <div class="sidebar-mask" @click="toggleSidebar(false)" />
        <Content v-if="isCustomLayout" />
        <Home v-else-if="enableHome">
            <template #hero>
                <slot name="home-hero" />
            </template>
            <template #features>
                <slot name="home-features" />
            </template>
            <template #footer>
                <slot name="home-footer" />
            </template>
        </Home>

        <Page v-else>
            <template #top>
                <slot name="page-top-ads">
                    <div id="ads-container" v-if="theme.carbonAds && theme.carbonAds.carbon">
                        <CarbonAds
                            :key="'carbon' + page.relativePath"
                            :code="theme.carbonAds.carbon"
                            :placement="theme.carbonAds.placement"
                        />
                    </div>
                </slot>
                <slot name="page-top" />
            </template>
            <template #bottom>
                <slot name="page-bottom" />
                <slot name="page-bottom-ads">
                    <BuySellAds
                        v-if="theme.carbonAds && theme.carbonAds.custom"
                        :key="'custom' + page.relativePath"
                        :code="theme.carbonAds.custom"
                        :placement="theme.carbonAds.placement"
                    />
                </slot>
            </template>
        </Page>
    </div>
</template>

<script>
    import { ref, computed, watch, defineAsyncComponent } from 'vue';
    import { useRoute, useData } from 'vitepress';
    import NavBar from './components/NavBar.vue';
    import SideBar from './components/SideBar.vue';
    import Page from './components/Page.vue';

    const NoopComponent = () => null;

    export default {
        components: {
            Page,
            NavBar,
            SideBar,
            Home: defineAsyncComponent(() => import('./components/Home.vue')),
            CarbonAds: __CARBON__ ? defineAsyncComponent(() => import('./components/CarbonAds.vue')) : NoopComponent,
            BuySellAds: __BSA__ ? defineAsyncComponent(() => import('./components/BuySellAds.vue')) : NoopComponent,
        },
        setup(props) {
            const route = useRoute();
            const { site: siteData, page } = useData();

            // custom layout
            const isCustomLayout = computed(() => !!route.data.frontmatter.customLayout);
            const enableHome = computed(() => !!route.data.frontmatter.home);
            const theme = computed(() => siteData.value.themeConfig);
            // sidebar
            const openSideBar = ref(false);
            const toggleSidebar = (to) => {
                openSideBar.value = typeof to === 'boolean' ? to : !openSideBar.value;
            };
            const hideSidebar = toggleSidebar.bind(null, false);
            watch(route, hideSidebar);
            return {
                isCustomLayout,
                openSideBar,
                toggleSidebar,
                enableHome,
                theme,
                page,
            };
        },
    };
</script>

<style></style>
