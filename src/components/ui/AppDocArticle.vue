<template>
  <article class="docArticle">
    <header class="docArticle__header docArticleHeader">
      <figure class="docArticleHeader__thumbnail">
        <img v-if="document.thumbnail" :src="document.thumbnail" alt="" width="1280" height="720" />
      </figure>
      <div class="docArticleHeader__info">
        <h1 class="docArticleHeader__title" v-text="document.title" />
        <div class="docArticleHeader__publishedAt">
          <Icon icon="calendar" /><time :datetime="document.publishedAt" v-text="publishedAtDisplay" />
        </div>
        <div class="docArticleHeader__tags docArticleTags">
          <span class="docArticleTags__bracket">[</span>
          <ul class="docArticleTags__list">
            <li
              v-for="tag in document.tag"
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
          <span class="docArticleTags__bracket">]</span>
        </div>
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
    padding: 25px 0;
    border-bottom: 1px solid global.$border;
  }

  &__title {
    @include global.leading-trim(1.3);
    color: global.$text-strong;
    font-size: global.$size-4;
    font-weight: global.$weight-bold;
    line-height: 1.3;
  }

  &__publishedAt {
    @include global.leading-trim;
    color: rgba(global.$text-strong, 0.8);
    margin-top: 8px;
    font-size: global.$size-7;

    .icon {
      margin-right: 0.5em;
    }
  }

  &__tags {
    margin-top: 10px;
  }
}

.docArticleTags {
  display: flex;
  align-items: center;
  color: global.$text-strong;
  font-size: global.$size-7;

  &__brackets {
    @include global.leading-trim;
  }

  &__list {
    display: flex
  }

  &__link {
    @include global.leading-trim;
  }
}
</style>
