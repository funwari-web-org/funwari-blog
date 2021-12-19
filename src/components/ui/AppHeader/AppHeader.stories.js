import AppHeader from './AppHeader.vue'

export default {
  title: 'AppHeader',
  component: AppHeader,
}

export const Default = () => ({
  components: { AppHeader },
  template: '<AppHeader />',
})
Default.storyName = 'デフォルト'
