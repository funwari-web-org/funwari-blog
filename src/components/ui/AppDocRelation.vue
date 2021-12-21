<template>
  <ul class="docRelation" v-if="prevDocument || nextDocument">
    <li class="docRelation__item">
      <AppDocRelationLink
        v-if="prevDocument"
        class="docRelation__link"
        :document="prevDocument"
      />
    </li>
    <li class="docRelation__item">
      <AppDocRelationLink
        v-if="nextDocument"
        class="docRelation__link"
        :document="nextDocument"
        next
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AppDocRelation',
  props: {
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

.docRelation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  &__link {
    height: 100%;
  }
}
</style>
