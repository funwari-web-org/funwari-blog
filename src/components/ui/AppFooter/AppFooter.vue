<template>
  <footer class="footer">
    <small class="footer__copyright">&copy; 2021 ふんわりWeb</small>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppFooter',
})
</script>

<style lang="scss">
@use '~/assets/style/global';

.footer {
  padding: 15px 0;
  border-top: 1px solid global.$border;
  text-align: center;

  &__copyright {
    display: block;
    @include global.leading-trim;
  }
}
</style>
