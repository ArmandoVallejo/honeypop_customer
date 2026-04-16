<template>
  <Transition name="notification" @enter="onEnter" @leave="onLeave">
    <div
      v-if="visible"
      :class="[
        'fixed bottom-4 right-4 max-w-sm px-4 py-3 rounded-lg font-medium text-white shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-3',
        notificationClass
      ]"
    >
      <!-- Icono según tipo -->
      <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <svg v-else-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>

      <!-- Mensaje -->
      <p class="text-sm flex-1">{{ message }}</p>

      <!-- Botón cerrar (opcional) -->
      <button
        @click="close"
        class="flex-shrink-0 ml-2 hover:opacity-75 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['success', 'error', 'info'],
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const visible = ref(true)
let timeoutId = null

const notificationClass = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
}[props.type]

const close = () => {
  visible.value = false
  emit('close')
}

const onEnter = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(10px)'
  setTimeout(() => {
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  }, 0)
}

const onLeave = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(10px)'
}

// Auto-dismiss después del duration
watch(visible, (newVal) => {
  if (newVal && props.duration > 0) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  } else if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
