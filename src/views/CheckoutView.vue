<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10 flex flex-col items-center justify-center">

    <div class="w-full max-w-5xl mb-6 flex items-center justify-between">
      <h1 class="text-3xl font-caprasimo text-white drop-shadow-md">Finalizar Compra</h1>
      <router-link to="/menu" class="text-white/80 hover:text-white transition font-medium text-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al menú
      </router-link>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading" label="Cargando información del producto..." size="lg" />

    <!-- Error State -->
    <div v-else-if="error" class="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white max-w-lg w-full text-center shadow-xl">
      <p class="text-xl font-semibold mb-4">{{ error }}</p>
      <router-link to="/menu" class="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition inline-block">
        Regresar al menú
      </router-link>
    </div>

    <!-- Checkout Form -->
    <Transition name="fade-up" appear>
      <div v-if="!loading && !error" class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Detalles del Formulario -->
        <div class="bg-gray-900 rounded-2xl p-8 shadow-2xl shadow-black/40 text-white flex flex-col gap-6">
          <div>
            <h2 class="text-2xl font-bold text-pink-400 mb-2">Método de pago y cantidad</h2>
            <p class="text-gray-400 text-sm">Ingresa los detalles para procesar tu orden.</p>
          </div>

          <form @submit.prevent="submitOrder" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="cantidad" class="text-sm font-semibold text-gray-300">Cantidad</label>
              <input 
                id="cantidad" 
                v-model.number="cantidad" 
                type="number" 
                min="1" 
                class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition placeholder-gray-500 font-medium"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="metodo" class="text-sm font-semibold text-gray-300">Método de Pago</label>
              <select 
                id="metodo" 
                v-model="metodoPago" 
                class="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#F2884B] focus:ring-1 focus:ring-[#F2884B] transition appearance-none font-medium"
                required
              >
                <option value="" disabled selected>Selecciona un método</option>
                <option value="tarjeta">Tarjeta de Crédito / Débito</option>
                <option value="efectivo">Efectivo en Tienda</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </select>
            </div>

            <BaseButton 
              type="submit" 
              variant="secondary" 
              size="lg" 
              class="mt-4 shadow-lg shadow-[#F2884B]/30 hover:shadow-[#F2884B]/50"
              :disabled="procesando"
            >
              <span v-if="procesando" class="flex items-center gap-2">
                 <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Procesando...
              </span>
              <span v-else>Confirmar y Pagar</span>
            </BaseButton>

            <p v-if="submitError" class="text-red-400 text-sm mt-2 font-medium">{{ submitError }}</p>
          </form>
        </div>

        <!-- Resumen de Orden -->
        <div class="bg-white rounded-2xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden h-fit">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#F2884B]/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          
          <h2 class="text-2xl font-bold text-gray-900">Resumen del Pedido</h2>

          <div class="flex items-center gap-4 py-4 border-b border-gray-100">
            <img :src="product.image || placeholderImage" class="w-16 h-16 rounded-lg object-cover shadow-sm bg-gray-50" />
            <div class="flex-1">
              <h3 class="font-bold text-gray-800 text-lg leading-tight">{{ product.nombre }}</h3>
              <p class="text-sm text-gray-500 font-medium">${{ product.costo_unitario }} c/u</p>
            </div>
            <span class="font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">x {{ cantidad || 1 }}</span>
          </div>

          <div class="flex flex-col gap-3 font-medium text-gray-600">
            <div class="flex justify-between items-center text-sm">
              <span>Subtotal</span>
              <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span>Impuestos (16%)</span>
              <span class="font-semibold text-pink-500">+ ${{ impuestos.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
              <span class="text-lg text-gray-800 font-bold">Total a Pagar</span>
              <span class="text-2xl font-black text-[#F2884B]">${{ total.toFixed(2) }}</span>
            </div>
          </div>
          
        </div>

      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '@/services/ProductService'
import { processPayment } from '@/services/PaymentService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BaseButton from '@/components/BaseButton.vue'
import placeholderImage from '@/assets/images/honeypop.webp'

const route = useRoute()
const router = useRouter()

const product = ref({})
const loading = ref(true)
const error = ref(null)

const cantidad = ref(1)
const metodoPago = ref('')
const procesando = ref(false)
const submitError = ref(null)

const subtotal = computed(() => {
  const price = Number(product.value.costo_unitario) || 0
  const qty = Number(cantidad.value) || 0
  return price * qty
})

const impuestos = computed(() => subtotal.value * 0.16)

const total = computed(() => subtotal.value + impuestos.value)

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    error.value = 'ID de producto no válido'
    loading.value = false
    return
  }

  try {
    product.value = await getProductById(id)
  } catch (e) {
    error.value = 'No se pudo cargar la información del producto.'
  } finally {
    loading.value = false
  }
})

const submitOrder = async () => {
  if (cantidad.value < 1) {
    submitError.value = 'La cantidad debe ser al menos 1.'
    return
  }
  if (!metodoPago.value) {
    submitError.value = 'Selecciona un método de pago.'
    return
  }

  procesando.value = true
  submitError.value = null

  try {
    await processPayment({
      producto_id: route.params.id,
      cantidad: cantidad.value,
      metodo_pago: metodoPago.value
    })
    
    // Redirigir a éxito
    router.push('/checkout-success')
  } catch (e) {
    submitError.value = e.response?.data?.message || 'Hubo un error al procesar el pago. Inténtalo de nuevo.'
  } finally {
    procesando.value = false
  }
}
</script>

<style scoped>
.fade-up-enter-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
