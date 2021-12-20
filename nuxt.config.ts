import { FetchReturn } from '@nuxt/content/types/query-builder'
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  target: 'static',
  ssr: true,
  srcDir: 'src',
  generate: {
    fallback: true,
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()
      return files.map((file: FetchReturn) => file.path)
    },
  },
  head: {
    title: 'funrawi-blog',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto+Mono&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },
  css: ['~/assets/style/app.scss'],
  plugins: ['~/plugins/vue-scrollactive', '~/plugins/dayjs'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api/module'],
  modules: ['@nuxt/content', 'nuxt-fontawesome', '@nuxtjs/toast'],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
    ],
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-one-dark.css',
      },
      remarkPlugins: ['remark-footnotes'],
    },
  },
  storybook: {},
  postcss: {},
  build: {},
  toast: {
    position: 'bottom-right',
    duration: 2000,
  },
}

export default config
