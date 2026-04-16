<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10">
    
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8">
      <h1 class="text-4xl font-caprasimo text-white mb-2">Atención al Cliente</h1>
      <p class="text-white/80 text-lg">Contacta con nuestro equipo para resolver tus dudas</p>
    </div>

    <!-- Contenedor principal -->
    <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Formulario -->
      <div class="lg:col-span-1">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h2 class="text-2xl font-caprasimo text-white mb-6">Crear Ticket</h2>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <!-- Asunto -->
            <div>
              <label for="asunto" class="block text-white font-semibold mb-2">
                Asunto <span class="text-red-400">*</span>
              </label>
              <input
                id="asunto"
                v-model="form.asunto"
                type="text"
                placeholder="Ej: Problema con mi pedido"
                maxlength="255"
                class="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition"
              />
              <p v-if="errors.asunto" class="text-red-400 text-sm mt-1">
                {{ errors.asunto }}
              </p>
            </div>

            <!-- Mensaje -->
            <div>
              <label for="mensaje" class="block text-white font-semibold mb-2">
                Mensaje <span class="text-red-400">*</span>
              </label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                placeholder="Describe tu consulta o problema..."
                rows="6"
                class="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 transition resize-none"
              />
              <p v-if="errors.mensaje" class="text-red-400 text-sm mt-1">
                {{ errors.mensaje }}
              </p>
            </div>

            <!-- Botón submit -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all transform hover:scale-105 duration-200"
            >
              <span v-if="!isSubmitting">Enviar Ticket</span>
              <span v-else>Enviando...</span>
            </button>

            <!-- Mensaje de éxito -->
            <transition name="fade">
              <div v-if="successMessage" class="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-3">
                <p class="text-emerald-200 text-sm">{{ successMessage }}</p>
              </div>
            </transition>

            <!-- Mensaje de error -->
            <transition name="fade">
              <div v-if="errorMessage" class="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p class="text-red-200 text-sm">{{ errorMessage }}</p>
              </div>
            </transition>
          </form>
        </div>
      </div>

      <!-- Lista de Tickets -->
      <div class="lg:col-span-2">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h2 class="text-2xl font-caprasimo text-white mb-6">Mis Tickets</h2>

          <!-- Loading -->
          <div v-if="loadingTickets" class="flex justify-center py-12">
            <LoadingSpinner label="Cargando tickets..." size="lg" />
          </div>

          <!-- Error -->
          <div v-else-if="ticketsError" class="flex flex-col items-center gap-4 py-8 text-white bg-red-500/20 rounded-lg p-4 border border-red-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <p class="text-center">{{ ticketsError }}</p>
          </div>

          <!-- Empty state -->
          <div v-else-if="tickets.length === 0" class="flex flex-col items-center gap-4 py-12 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 15.5V4m0 0H7m11 0a2 2 0 012 2v10a2 2 0 01-2 2m0 0H7a2 2 0 01-2-2V6a2 2 0 012-2m0 0v10a2 2 0 002 2m0 0h11"/>
            </svg>
            <p class="text-center">No tienes tickets. ¡Crea uno si necesitas ayuda!</p>
          </div>

          <!-- Lista de tickets -->
          <div v-else class="space-y-4">
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class="bg-gray-900/30 rounded-lg border border-white/10 hover:border-white/30 transition p-4 cursor-pointer"
              @click="toggleTicketDetail(ticket.id)"
            >
              <!-- Header del ticket -->
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="text-white font-semibold">{{ ticket.asunto }}</h3>
                    <span
                      :class="[
                        'text-xs px-2 py-1 rounded-full font-semibold',
                        ticket.estado === 'abierto' ? 'bg-blue-500/30 text-blue-300' :
                        ticket.estado === 'en_progreso' ? 'bg-yellow-500/30 text-yellow-300' :
                        'bg-emerald-500/30 text-emerald-300'
                      ]"
                    >
                      {{ formatEstado(ticket.estado) }}
                    </span>
                    <span v-if="ticket.prioridad" :class="[
                      'text-xs px-2 py-1 rounded-full font-semibold',
                      ticket.prioridad === 'alta' ? 'bg-red-500/30 text-red-300' :
                      ticket.prioridad === 'media' ? 'bg-orange-500/30 text-orange-300' :
                      'bg-green-500/30 text-green-300'
                    ]">
                      {{ ticket.prioridad }}
                    </span>
                  </div>
                  <p class="text-white/70 text-sm line-clamp-2">{{ ticket.mensaje }}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-white/60 flex-shrink-0 transition-transform"
                  :class="{ 'rotate-180': expandedTicketId === ticket.id }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <!-- Fecha -->
              <p class="text-white/50 text-xs mt-3">{{ formatDate(ticket.created_at) }}</p>

              <!-- Detalles expandidos -->
              <transition name="expand">
                <div v-if="expandedTicketId === ticket.id" class="mt-4 pt-4 border-t border-white/10">
                  
                  <!-- Mensaje completo -->
                  <div class="mb-4">
                    <p class="text-white/70 text-sm whitespace-pre-wrap">{{ ticket.mensaje }}</p>
                  </div>

                  <!-- Respuesta si existe -->
                  <div v-if="ticket.respuesta" class="bg-white/5 rounded-lg p-3 mb-4 border-l-2 border-emerald-500">
                    <p class="text-white/70 text-xs uppercase mb-2 font-semibold">Respuesta del equipo:</p>
                    <p class="text-white/80 text-sm whitespace-pre-wrap">{{ ticket.respuesta }}</p>
                    <p v-if="ticket.updated_at" class="text-white/50 text-xs mt-2">
                      {{ formatDate(ticket.updated_at) }}
                    </p>
                  </div>

                  <!-- No hay respuesta aún -->
                  <div v-else class="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                    <p class="text-yellow-200 text-sm">Estamos trabajando en tu ticket. Recibirás una respuesta pronto.</p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createTicket, getTickets } from '@/services/TicketService'
import { useNotification } from '@/composables/useNotification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { success: showSuccess, error: showError } = useNotification()

// Form state
const form = ref({
  asunto: '',
  mensaje: ''
})
const errors = ref({})
const isSubmitting = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

// Tickets state
const tickets = ref([])
const loadingTickets = ref(true)
const ticketsError = ref(null)
const expandedTicketId = ref(null)

// Validar formulario
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.asunto?.trim()) {
    errors.value.asunto = 'El asunto es requerido'
  } else if (form.value.asunto.length > 255) {
    errors.value.asunto = 'El asunto no puede tener más de 255 caracteres'
  }

  if (!form.value.mensaje?.trim()) {
    errors.value.mensaje = 'El mensaje es requerido'
  }

  return Object.keys(errors.value).length === 0
}

// Enviar formulario
const handleSubmit = async () => {
  successMessage.value = null
  errorMessage.value = null

  if (!validateForm()) {
    return
  }

  try {
    isSubmitting.value = true
    await createTicket(form.value.asunto, form.value.mensaje)
    
    showSuccess('Ticket creado exitosamente')
    successMessage.value = 'Ticket creado exitosamente. Pronto nos pondremos en contacto contigo.'
    
    // Limpiar formulario
    form.value.asunto = ''
    form.value.mensaje = ''
    errors.value = {}

    // Recargar tickets
    await fetchTickets()

    // Limpiar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      successMessage.value = null
    }, 5000)
  } catch (e) {
    console.error('Error al crear ticket:', e)
    const errorMsg = e.response?.data?.message || 'Error al crear el ticket'
    errorMessage.value = errorMsg
    showError(errorMsg)
  } finally {
    isSubmitting.value = false
  }
}

// Obtener tickets
const fetchTickets = async () => {
  loadingTickets.value = true
  ticketsError.value = null
  
  try {
    const data = await getTickets()
    tickets.value = Array.isArray(data) ? data : data.tickets || []
  } catch (e) {
    console.error('Error al cargar tickets:', e)
    ticketsError.value = 'No se pudieron cargar tus tickets'
  } finally {
    loadingTickets.value = false
  }
}

// Toggle expansión de ticket
const toggleTicketDetail = (ticketId) => {
  expandedTicketId.value = expandedTicketId.value === ticketId ? null : ticketId
}

// Formatear fecha
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Formatear estado
const formatEstado = (estado) => {
  const estados = {
    'abierto': 'Abierto',
    'en_progreso': 'En Progreso',
    'cerrado': 'Cerrado'
  }
  return estados[estado] || estado
}

onMounted(async () => {
  await fetchTickets()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
