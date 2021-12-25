<template>
  <article class="docArticle">
    <header class="docArticle__header docArticleHeader">
      <figure v-if="document.thumbnail" class="docArticleHeader__thumbnail">
        <NuxtImg format="webp" :src="document.thumbnail" alt="" width="1280" height="720" />
      </figure>
      <div class="docArticleHeader__info">
        <div class="docArticleHeader__publishedAt">
          <Icon icon="calendar" /><time :datetime="document.publishedAt" v-text="publishedAtDisplay" />
        </div>
        <h1 class="docArticleHeader__title" v-text="document.title" />
        <AppDocArticleTags class="docArticleHeader__tags" :tags="document.tags" />
      </div>
    </header>
    <AppDocArticleContent class="docArticle__content" :document="document" />
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { FetchReturn } from '@nuxt/content/types/query-builder'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AppDocArticle',
  props: {
    document: {
      type: Object as PropType<FetchReturn>,
      required: true,
    },
  },
  setup(props) {
    const publishedAtDisplay = computed(
      () => dayjs(props.document.publishedAt).format('YYYY年MM月DD日')
    )

    return {
      publishedAtDisplay,
    }
  }
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.docArticle {
  &__header {
    margin-bottom: 30px;
  }
}

.docArticleHeader {
  &__thumbnail {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }

  &__info {
    padding-bottom: 25px;
    border-bottom: 1px solid global.$border;

    &:not(:first-child) {
      margin-top: 25px;
    }
  }

  &__publishedAt {
    @include global.leading-trim;
    color: rgba(global.$text-strong, 0.8);
    font-size: global.$size-7;

    .icon {
      margin-right: 0.5em;
    }
  }

  &__title {
    $line-height: 1.3;
    @include global.leading-trim($line-height);
    padding-top: 10px;
    color: global.$text-strong;
    font-size: global.$size-4;
    font-weight: global.$weight-bold;
    line-height: $line-height;
  }

  &__tags {
    padding-top: 15px;
  }
}
</style>
