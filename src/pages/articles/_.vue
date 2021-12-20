<template>
  <ArticleContentPageView
    :document="document"
    :prevDocument="prevDocument"
    :nextDocument="nextDocument"
  />
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleContentPage',
  head() {
    const document = this.document as FetchReturn

    return {
      title: document.title,
      meta: [
        { hid: 'description', name: 'description', content: document.description },
      ],
    }
  },
  async asyncData({ $content, route, error }) {
    const { path } = route
    const [document] = await $content({ deep: true }).where({ path }).fetch() as FetchReturn[]

    if (!document) {
      error({
        statusCode: 404,
        message: '記事が見つかりません',
      })
      return
    }

    const [prevDocument, nextDocument] = await $content('articles')
      .only(['title', 'publishedAt', 'thumbnail', 'path'])
      .sortBy('publishedAt', 'desc')
      .surround(document.slug)
      .fetch() as FetchReturn[]

    return {
      document,
      prevDocument,
      nextDocument,
    }
  },
})
</script>
