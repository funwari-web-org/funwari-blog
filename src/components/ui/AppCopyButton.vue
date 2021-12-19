<template>
  <button class="copy" ref="copy">
    <transition name="icon" mode="out-in">
      <span class="copy__icon" :key="icon">
        <Icon :icon="icon" />
      </span>
    </transition>
  </button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import Clipboard from 'clipboard'

export default defineComponent({
  setup() {
    const icon = ref('clipboard')
    const copy = ref<HTMLElement | null>(null)
    let timer: NodeJS.Timer | false = false
    const { $toast } = useContext()

    onMounted(() => {
      const copyCode = new Clipboard(copy.value as HTMLElement, {
        target(trigger) {
          return trigger.previousElementSibling as Element
        },
      })

      copyCode.on('success', (event) => {
        event.clearSelection()
        icon.value = 'clipboard-check'
        $toast.show('コードをコピーしました')

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
          icon.value = 'clipboard'
          timer = false
        }, 3000)
      })
    })

    return {
      icon,
      copy,
    }
  }
})
</script>

<style lang="scss" scoped>
@use '~/assets/style/global';

.copy {
  display: block;
  background: rgba(global.$text, 0.6);
  line-height: 0;
  width: 1em;
  height: 1em;
  padding: 8px;
  border-radius: 4px;
  box-sizing: content-box;
  color: rgba(global.$text-invert, 0.8);

  &__icon {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.icon {
  &-enter {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;

    &-to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    &-active {
      transition: 300ms cubic-bezier(0.25, 1, 0.5, 1);
    }
  }

  &-leave {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;

    &-to {
      transform: translate(-50%, -50%) scale(0.4);
      opacity: 0;
    }

    &-active {
      transition: 300ms cubic-bezier(0.5, 0, 0.75, 0);
    }
  }
}
</style>
