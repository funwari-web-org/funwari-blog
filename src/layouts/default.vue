<template>
  <div class="l-app">
    <div class="l-header">
      <AppHeader />
    </div>
    <main class="l-main">
      <main class="container">
        <Nuxt />
      </main>
    </main>
    <div class="l-footer">
      <AppFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DefaultLayout',
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.l-app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.l-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.l-main {
  flex: 1;
  padding-top: 20px;
}

.l-footer {
  margin-top: 80px;
}
</style>
