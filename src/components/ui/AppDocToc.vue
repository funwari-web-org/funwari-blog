<template>
  <div v-if="toc" class="docToc">
    <p class="docToc__title">目次</p>
    <scrollactive
      class="docToc__nav"
      active-class="docToc__link--active"
      :offset="90"
      highlight-first-item
    >
      <ul class="docToc__list">
        <li
          v-for="link in toc"
          :key="link.id"
          class="docToc__item"
          :class="`docToc__item--depth-${link.depth}`"
        >
          <a
            :href="`#${link.id}`"
            class="scrollactive-item docToc__link"
            v-text="link.text"
          />
        </li>
      </ul>
    </scrollactive>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppDocToc',
  props: {
    toc: {
      type: Array as PropType<{ id: string; depth: number, title: string }[]>,
      default: () => [],
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.docToc {
  &__title {
    @include global.leading-trim;
    font-size: global.$size-7;
    font-weight: global.$weight-bold;
    color: global.$text-gray-dark;
  }

  &__nav {
    margin-top: 8px;
  }

  &__list {
    border-bottom: 1px solid global.$border;
  }

  &__item {
    padding: 0.3em 0;
    border-top: 1px solid global.$border;
    font-size: global.$size-7;

    &--depth-3 {
      margin-left: 1em;
    }
  }

  &__link {
    @include global.leading-trim;
    display: block;
    color: global.$text-gray;
    padding: 0.6em;
    border-radius: 0.5em;

    &--active {
      color: global.$text-main;
    }

    @include global.hover {
      background: rgba(global.$text-main, 0.15);
    }
  }
}
</style>
