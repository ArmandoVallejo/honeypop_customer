<template>
  <div class="flex flex-col items-center justify-center gap-3" :class="containerClass">
    <div
      class="rounded-full border-4 border-white/30 animate-spin"
      :class="sizeClass"
      style="border-top-color: white"
    ></div>
    <p v-if="label" class="text-white text-sm font-medium animate-pulse">{{ label }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: null },
  size: { type: String, default: 'md' }, // sm | md | lg
  fullscreen: { type: Boolean, default: false },
})

const sizeClass = computed(() => ({
  'w-6 h-6 border-2': props.size === 'sm',
  'w-10 h-10 border-4': props.size === 'md',
  'w-16 h-16 border-4': props.size === 'lg',
}))

const containerClass = computed(() =>
  props.fullscreen ? 'min-h-screen' : 'py-12'
)
</script>
