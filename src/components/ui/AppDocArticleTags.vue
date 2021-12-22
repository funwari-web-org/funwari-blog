<template>
  <div class="docArticleTags">
    <ul class="docArticleTags__list">
      <li
        v-for="tag in tags"
        :key="tag"
        class="docArticleTags__item"
      >
        <NuxtLink
          class="docArticleTags__link"
          :to="{ name: 'tags-tag', params: { tag } }"
          v-text="`# ${tag}`"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppDocArticleTags',
  props: {
    tags: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.docArticleTags {
  @include global.leading-trim;
  color: global.$text-strong;
  font-size: global.$size-7;

  &__list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 5px;
  }

  &__bracket {
    color: rgba(global.$text-strong, 0.6);
  }

  &__list {
    display: flex;
    column-gap: 10px;
  }

  &__item {
    &:not(:last-child) {
      &::after {
        content: ",";
        display: inline;
      }
    }
  }
}
</style>
