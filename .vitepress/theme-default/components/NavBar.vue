<template>
    <header class="nav-bar">
        <NavBarTitle />
        <div class="flex-grow" />
        <div class="nav">
            <NavLinks />
        </div>
        <div class="nav-icons">
            <div class="item">
                <dark-mode-switch />
            </div>
        </div>
    </header>
</template>

<script>
    import NavBarTitle from './NavBarTitle.vue';
    import NavLinks from './NavLinks.vue';
    import DarkModeSwitch from './DarkModeSwitch.vue';

    export default {
        components: {
            NavBarTitle,
            NavLinks,
            DarkModeSwitch,
        },
        setup(props) {},
    };
</script>

<style scoped>
    .nav-bar {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: var(--z-index-navbar);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--c-divider);
        padding: 0.7rem 1.5rem 0.7rem 4rem;
        height: var(--header-height);
        background-color: var(--c-bg);
    }

    @media (min-width: 720px) {
        .nav-bar {
            padding: 0.7rem 1.5rem;
        }
    }

    .flex-grow {
        flex-grow: 1;
    }

    .nav {
        display: none;
    }

    @media (min-width: 720px) {
        .nav {
            display: flex;
        }
        .navbar__dark-mode {
            display: none;
        }
    }

    .nav-icons {
        display: flex;
        padding: 2px 0 0;
        align-items: center;
        border-bottom: 0;
        margin-left: 12px;
    }

    .nav-icons .item {
        padding-left: 12px;
    }
</style>
