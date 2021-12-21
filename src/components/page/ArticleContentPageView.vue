<template>
  <div class="doc">
    <div class="doc__content">
      <AppDocArticle
        class="doc__article"
        :document="document"
      />
      <AppDocRelation
        class="doc__relation"
        :prevDocument="prevDocument"
        :nextDocument="nextDocument"
      />
    </div>
    <aside class="doc__side">
      <AppDocToc class="doc__toc" :toc="document.toc" />
    </aside>
  </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleContentPageView',
  props: {
    document: {
      type: Object as PropType<FetchReturn>,
      require: true,
    },
    prevDocument: {
      type: Object as PropType<FetchReturn>,
      default: undefined,
    },
    nextDocument: {
      type: Object as PropType<FetchReturn>,
      default: undefined,
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

  &__relation {
    margin-top: 80px;
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
