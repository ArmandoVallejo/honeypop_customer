import { ref, computed } from 'vue'

// Estado global de notificaciones (singleton)
const notifications = ref([])
let notificationId = 0

export function useNotification() {
  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = notificationId++
    const notification = { id, message, type, duration }
    notifications.value.push(notification)

    // Auto-remover después del duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  const success = (message, duration = 3000) => showNotification(message, 'success', duration)
  const error = (message, duration = 3000) => showNotification(message, 'error', duration)
  const info = (message, duration = 3000) => showNotification(message, 'info', duration)

  return {
    notifications: computed(() => notifications.value),
    showNotification,
    removeNotification,
    success,
    error,
    info
  }
}
