<template>
  <main class="page">
    <div class="container">
      <slot name="top" />

      <div class="content">
        <Content />
      </div>

      <PageFooter />

      <NextAndPrevLinks />

      <slot name="bottom" />
    </div>
  </main>
</template>

<script setup >
  import PageFooter from './PageFooter.vue';
  import NextAndPrevLinks from './NextAndPrevLinks.vue';
</script>

<style scoped>
  .page {
    padding-top: var(--header-height);
  }

  @media (min-width: 720px) {
    .page {
      margin-left: 16.4rem;
    }
  }

  @media (min-width: 960px) {
    .page {
      margin-left: 20rem;
    }
  }

  .container {
    margin: 0 auto;
    padding: 0 1.5rem 4rem;
    padding: 0.025rem 0rem 2rem 0;
    width: calc(100% - var(--slug-width));
  }

  .content {
    padding-bottom: 1.5rem;
  }

  @media (max-width: 420px) {
    .content {
      /* fix carbon ads display */
      clear: both;
    }
  }
</style>
