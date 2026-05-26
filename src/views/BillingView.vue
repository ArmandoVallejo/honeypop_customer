<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10">
    <!-- Header -->
    <div class="max-w-4xl mx-auto flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
        <h1 class="text-3xl font-caprasimo text-white drop-shadow-md">Dirección de Facturación</h1>
      </div>
      <router-link to="/menu" class="text-white/80 hover:text-white transition font-medium text-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Volver al menú
      </router-link>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" label="Cargando información..." size="lg" />

    <!-- Error -->
    <Transition name="fade-up" appear>
      <div v-if="fetchError" class="max-w-2xl mx-auto bg-red-500/20 border border-red-400/30 rounded-2xl px-6 py-4 text-red-200 font-medium flex items-start gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        <span>{{ fetchError }}</span>
      </div>
    </Transition>

    <!-- Submit Error -->
    <Transition name="fade-up" appear>
      <div v-if="submitError" class="max-w-2xl mx-auto bg-red-500/20 border border-red-400/30 rounded-2xl px-6 py-4 text-red-200 font-medium flex items-start gap-3 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        <span>{{ submitError }}</span>
      </div>
    </Transition>

    <!-- Content -->
    <Transition name="fade-up" appear>
      <div v-if="!loading" class="max-w-2xl mx-auto">
        <!-- Form Section -->
        <div class="bg-gray-900 rounded-2xl p-8 shadow-2xl shadow-black/40 text-white">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-pink-400 mb-2">
              {{ billing ? 'Editar Dirección' : 'Agregar Dirección de Facturación' }}
            </h2>
            <p class="text-gray-400 text-sm">
              {{ billing ? 'Actualiza tu información de facturación.' : 'Ingresa una única dirección de facturación para tus compras.' }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
            <!-- Row 1: Nombre Completo -->
            <div class="flex flex-col gap-2">
              <label for="nombre_completo" class="text-sm font-semibold text-gray-300">Nombre Completo *</label>
              <input
                id="nombre_completo"
                v-model="formData.nombre_completo"
                type="text"
                maxlength="255"
                class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                placeholder="Ej: Juan Pérez García"
                required
              />
            </div>

            <!-- Row 2: Número de Documento y Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label for="numero_documento" class="text-sm font-semibold text-gray-300">Cédula/DNI *</label>
                <input
                  id="numero_documento"
                  v-model="formData.numero_documento"
                  type="text"
                  maxlength="50"
                  class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                  placeholder="Ej: 1234567890"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="email" class="text-sm font-semibold text-gray-300">Email *</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  maxlength="255"
                  class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                  placeholder="Ej: correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <!-- Row 3: Dirección -->
            <div class="flex flex-col gap-2">
              <label for="direccion" class="text-sm font-semibold text-gray-300">Dirección *</label>
              <input
                id="direccion"
                v-model="formData.direccion"
                type="text"
                maxlength="500"
                class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                placeholder="Ej: Carrera 5 #123-45"
                required
              />
            </div>

            <!-- Row 4: Ciudad, Código Postal y País -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex flex-col gap-2">
                <label for="ciudad" class="text-sm font-semibold text-gray-300">Ciudad *</label>
                <input
                  id="ciudad"
                  v-model="formData.ciudad"
                  type="text"
                  maxlength="100"
                  class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                  placeholder="Ej: Bogotá"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="codigo_postal" class="text-sm font-semibold text-gray-300">Código Postal *</label>
                <input
                  id="codigo_postal"
                  v-model="formData.codigo_postal"
                  type="text"
                  maxlength="20"
                  class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                  placeholder="Ej: 110111"
                  required
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="pais" class="text-sm font-semibold text-gray-300">País *</label>
                <input
                  id="pais"
                  v-model="formData.pais"
                  type="text"
                  maxlength="100"
                  class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                  placeholder="Ej: Colombia"
                  required
                />
              </div>
            </div>

            <!-- Row 5: Teléfono -->
            <div class="flex flex-col gap-2">
              <label for="telefono" class="text-sm font-semibold text-gray-300">Teléfono *</label>
              <input
                id="telefono"
                v-model="formData.telefono"
                type="tel"
                maxlength="20"
                class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500"
                placeholder="Ej: +57 300 123 4567"
                required
              />
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 mt-6">
              <button
                type="submit"
                :disabled="submitting"
                class="flex-1 bg-gradient-to-r from-[#F266B3] to-[#F2884B] hover:from-[#d94f9a] hover:to-[#e07740] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-[#F266B3]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="submitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span>{{ submitting ? 'Guardando...' : (billing ? 'Actualizar' : 'Guardar') }}</span>
              </button>
              <button
                v-if="billing"
                type="button"
                @click="showDeleteConfirm = true"
                :disabled="submitting"
                class="px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <!-- Info Message -->
        <div v-if="billing" class="mt-6 bg-green-500/20 border border-green-400/30 rounded-2xl px-6 py-4 text-green-200 text-sm flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Tu dirección de facturación está registrada.</span>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div class="bg-gray-900 rounded-2xl p-8 text-white max-w-sm w-full shadow-2xl border border-gray-800">
          <h3 class="text-xl font-bold mb-2">¿Eliminar dirección?</h3>
          <p class="text-gray-400 mb-6 text-sm">Esta acción no se puede deshacer. Tu dirección de facturación será eliminada.</p>
          <div class="flex gap-3">
            <button
              type="button"
              @click="showDeleteConfirm = false"
              class="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="handleDelete"
              :disabled="submitting"
              class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg v-if="submitting" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ submitting ? 'Eliminando...' : 'Eliminar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useBilling } from '@/composables/useBilling'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const { user } = useAuth()
const { billing, loading, error, fetchBilling, saveBilling, removeBilling } = useBilling()

const formData = ref({
  nombre_completo: '',
  numero_documento: '',
  direccion: '',
  ciudad: '',
  codigo_postal: '',
  pais: '',
  telefono: '',
  email: '',
})

const fetchError = ref(null)
const submitError = ref(null)
const submitting = ref(false)
const showDeleteConfirm = ref(false)

const handleSubmit = async () => {
  submitError.value = null
  submitting.value = true
  try {
    await saveBilling(user.value.id, formData.value)
  } catch (e) {
    submitError.value = e.response?.data?.error || e.response?.data?.message || 'Error al guardar la dirección. Intenta de nuevo.'
  } finally {
    submitting.value = false
  }
}

const handleDelete = async () => {
  submitting.value = true
  try {
    await removeBilling(user.value.id)
    showDeleteConfirm.value = false
    formData.value = {
      nombre_completo: '',
      numero_documento: '',
      direccion: '',
      ciudad: '',
      codigo_postal: '',
      pais: '',
      telefono: '',
      email: '',
    }
  } catch (e) {
    submitError.value = e.response?.data?.error || e.response?.data?.message || 'Error al eliminar la dirección. Intenta de nuevo.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (!user.value?.id) {
    router.push('/login')
    return
  }
  try {
    await fetchBilling(user.value.id)
    if (billing.value) {
      formData.value = { ...billing.value }
    }
  } catch (e) {
    fetchError.value = 'No se pudo cargar tu dirección de facturación. Intenta de nuevo.'
  }
})
</script>

<style scoped>
.fade-up-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
