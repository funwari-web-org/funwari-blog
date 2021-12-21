<template>
  <component
    :is="document ? 'NuxtLink' : 'div'"
    class="docRelationLink"
    :class="{ 'docRelationLink--next': next }"
    :to="to"
  >
    <div
      class="docRelationLink__label"
      :class="{ 'docRelationLink__label--reverse': next }"
    >
      <Icon class="docRelationLink__labelIcon" :icon="next ? 'arrow-right' : 'arrow-left'" />
      <span class="docRelationLink__labelText" v-text="label" />
    </div>
    <div class="docRelationLink__inner">
      <div class="docRelationLink__thumbnail">
        <img v-if="thumbnail" :src="thumbnail" alt="" width="1280" height="720" />
      </div>
      <div class="docRelationLink__info">
        <div class="docRelationLink__publishedAt" v-text="publishedAtDisplay" />
        <div class="docRelationLink__title" v-text="title" />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AppDocRelationLink',
  props: {
    document: {
      type: Object as PropType<FetchReturn>,
      default: undefined,
    },
    next: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const hasDocument = computed(() => typeof props.document !== 'undefined')

    const publishedAtDisplay = computed(
      () => hasDocument.value ? dayjs(props.document.publishedAt).format('YYYY年MM月DD日') : '-'
    )

    const thumbnail = computed(
      () => hasDocument.value ? props.document?.thumbnail || '' : ''
    )

    const to = computed(
      () => hasDocument.value ? props.document.path : null
    )

    const label = computed(
      () => props.next ? '次の記事へ' : '前の記事へ'
    )

    const title = computed(
      () => hasDocument.value ? props.document.title : '-'
    )

    return {
      publishedAtDisplay,
      thumbnail,
      to,
      label,
      title,
    }
  }
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@use '~/assets/style/global';

%docRelationLink__item {
  & + & {
    border-top: 1px solid global.$border;
  }
}

.docRelationLink {
  display: grid;
  grid-auto-rows: auto minmax(0, 1fr);
  border: 1px solid global.$border;
  border-radius: 10px 5px 5px 10px;
  color: global.$text-strong;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 6px 14px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  transition: 300ms;
  transition-property: box-shadow, top;

  @include global.hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  }

  &--next {
    border-radius: 5px 10px 10px 5px;
  }

  &__labelText {
    @include global.leading-trim;
  }

  &__inner {
    @extend %docRelationLink__item;

    display: flex;
    align-items: flex-start;
    padding: 15px;
  }

  &__thumbnail {
    position: relative;
    flex-shrink: 0;
    width: 30%;
    margin-right: 15px;
    border-radius: 5px;
    overflow: hidden;
    background: rgba(global.$text-gray, 0.2);

    &::before {
      content: '';
      display: block;
      padding-top: math.div(720, 1280) * 100%;
    }

    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__publishedAt {
    @include global.leading-trim;
    font-size: global.$size-small;
    color: rgba(global.$text-strong, 0.8);
  }

  &__title {
    $line-height: 1.5;
    @include global.leading-trim($line-height);
    padding-top: 10px;
    font-size: global.$size-7;
    font-weight: global.$weight-bold;
    line-height: $line-height;
  }

  &__label {
    @extend %docRelationLink__item;

    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    color: global.$text-gray-dark;
    font-size: global.$size-7;
    font-weight: global.$weight-bold;

    &--reverse {
      flex-direction: row-reverse;
    }
  }
}
</style>
