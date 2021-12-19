<template>
  <header
    class="header"
    :class="{ 'header--scrolled': scrolled }"
  >
    <div class="header__inner">
      <h1 class="header__title">
        <nuxt-link :to="{ name: 'index' }">
          <img src="/img/common/logo.png" alt="ふんわりWeb" width="160" height="32" />
        </nuxt-link>
      </h1>
      <nav class="headerNav header__nav">
        <ul class="headerNav__list">
          <li class="headerNav__item">
            <nuxt-link :to="{ name: 'articles' }" class="headerNav__link">
              記事一覧
            </nuxt-link>
          </li>
          <li class="headerNav__item">
            <nuxt-link :to="{ name: 'about' }" class="headerNav__link">
              About
            </nuxt-link>
          </li>
          <li class="headerNav__item">
            <nuxt-link :to="{ name: 'contacts' }" class="headerNav__link">
              お問い合わせ
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const scrolled = ref(false)

    const handleScroll = () => {
      scrolled.value = window.scrollY > 0
    }

    onBeforeMount(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      scrolled,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.header {
  padding: 10px 0 15px;
  background: rgba(global.$background, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(global.$background, 0.8);
  box-shadow: 0 4px 24px rgba(global.$black, 0), 0 1px 8px rgba(global.$black, 0);
  color: global.$text-strong;
  transition: 300ms;
  transition-property: border-color, box-shadow;

  &--scrolled {
    border-color: global.$border;
    box-shadow: 0 4px 16px rgba(global.$black, 0.08), 0 1px 5px rgba(global.$black, 0.08);
  }

  &__inner {
    @include global.container;
  }

  &__title {
    text-align: center;
  }

  &__nav {
    margin-top: 8px;
  }
}

.headerNav {
  font-size: global.$size-7;

  &__list {
    display: flex;
    justify-content: center;
    margin: 0 -16px;
  }

  &__item {
    padding: 0 16px;
  }

  &__link {
    @include global.leading-trim;
  }
}
</style>
