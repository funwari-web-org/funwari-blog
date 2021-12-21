<template>
  <div class="doc">
    <ul>
      <li v-for="doc in documents" :key="doc.id">
        <NuxtLink :to="doc.path" v-text="doc.title" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleTopPage',
  head() {
    const document = this.document as FetchReturn

    return {
      title: '記事一覧',
      meta: [
        { hid: 'description', name: 'description', content: '記事一覧です' },
      ],
    }
  },
  async asyncData({ $content }) {
    const documents = await $content('/articles')
      .sortBy('publishedAt', 'desc')
      .fetch() as FetchReturn[]

    return {
      documents,
    }
  },
})
</script>

<style lang="scss" scoped>
.doc {
  display: flex;

  &__content {
    width: 75%;
  }

  &__side {
    width: 25%;
    padding-left: 16px;
  }

  &__toc {
    position: sticky;
    top: 4rem;
  }
}

.docArticle {
  &__thumbnail {
    max-width: 100%;
    height: auto;
  }
}
</style>
