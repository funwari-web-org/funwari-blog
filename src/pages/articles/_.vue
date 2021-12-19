<template>
  <div class="doc">
    <div class="doc__content">
      <AppDocArticle class="doc__article" :document="document" />
    </div>
    <aside class="doc__side">
      <AppDocToc class="doc__toc" :toc="document.toc" />
    </aside>
  </div>
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

    return {
      document,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.doc {
  display: flex;

  &__content {
    width: 70%;
  }

  &__side {
    width: 30%;
    padding-left: 30px;
  }

  &__toc {
    position: sticky;
    top: 100px;
  }
}
</style>
