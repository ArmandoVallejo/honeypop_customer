<template>
  <Navbar />
  <RouterView />
  
  <!-- Notificaciones Container -->
  <div class="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
    <BaseNotification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      @close="removeNotification(notification.id)"
      class="pointer-events-auto"
    />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue'
  import BaseNotification from './components/BaseNotification.vue'
  import { useNotification } from './composables/useNotification'

  const { notifications, removeNotification } = useNotification()
</script>

