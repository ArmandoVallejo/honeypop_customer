<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="relative inline-flex items-center justify-center font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
    :class="[variantClass, sizeClass]"
    v-bind="$attrs"
  >
    <!-- Spinner sobre el texto cuando loading -->
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | outline
  size: { type: String, default: 'md' },          // sm | md | lg
  type: { type: String, default: 'button' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const variantClass = computed(() => ({
  'bg-[#F266B3] text-white hover:bg-[#d94f9a] focus:ring-[#F266B3]': props.variant === 'primary',
  'bg-[#F2884B] text-white hover:bg-[#e07740] focus:ring-[#F2884B]': props.variant === 'secondary',
  'border-2 border-[#F266B3] text-[#F266B3] hover:bg-[#F266B3] hover:text-white focus:ring-[#F266B3] bg-transparent': props.variant === 'outline',
}))

const sizeClass = computed(() => ({
  'text-sm px-3 py-1.5': props.size === 'sm',
  'text-base px-5 py-2.5': props.size === 'md',
  'text-lg px-6 py-3': props.size === 'lg',
}))
</script>
