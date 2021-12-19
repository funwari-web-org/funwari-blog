<template>
  <NuxtContent :document="document" />
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, onMounted, PropType } from '@nuxtjs/composition-api'
import { FetchReturn } from '@nuxt/content/types/query-builder'
import AppCopyButton from '~/components/ui/AppCopyButton.vue'

import prismjs from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

export default defineComponent({
  name: 'AppDocArticleContent',
  props: {
    document: {
      type: Object as PropType<FetchReturn>,
      required: true,
    },
  },
  setup() {
    onMounted(() => {
      const blocks = Array.from(document.getElementsByClassName('nuxt-content-highlight'))

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()

        block.appendChild(component.$el)
      }

      prismjs.highlightAll()
    })
  }
})
</script>
