<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10">

    <!-- Header -->
    <div class="max-w-4xl mx-auto flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h1 class="text-3xl font-caprasimo text-white drop-shadow-md">Mi Carrito</h1>
      </div>
      <router-link to="/menu" class="text-white/80 hover:text-white transition font-medium text-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Seguir comprando
      </router-link>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" label="Cargando carrito..." size="lg" />

    <!-- Error -->
    <div v-else-if="fetchError" class="max-w-lg mx-auto text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white">
      <p class="text-xl font-semibold mb-4">{{ fetchError }}</p>
      <router-link to="/menu" class="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl transition inline-block">Volver al menú</router-link>
    </div>

    <!-- Empty cart -->
    <Transition name="fade-up" appear>
      <div v-if="!loading && !fetchError && (!carrito || !carrito.detalles || carrito.detalles.length === 0)" class="max-w-md mx-auto text-center flex flex-col items-center gap-6 py-16">
        <div class="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-white text-2xl font-bold">Tu carrito está vacío</p>
          <p class="text-white/70 mt-2">Agrega productos desde el menú para comenzar.</p>
        </div>
        <router-link to="/menu" class="bg-white text-[#F266B3] hover:bg-white/90 font-bold px-8 py-3 rounded-xl transition shadow-lg">
          Ir al Menú
        </router-link>
      </div>
    </Transition>

    <!-- Cart content -->
    <Transition name="fade-up" appear>
      <div v-if="!loading && !fetchError && carrito && carrito.detalles && carrito.detalles.length > 0" class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Items list -->
        <div class="lg:col-span-2 flex flex-col gap-4">

          <!-- Error de checkout -->
          <Transition name="fade-up">
            <div v-if="checkoutError" class="bg-red-500/20 border border-red-400/30 rounded-2xl px-5 py-4 text-red-200 font-medium text-sm flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
              <span>{{ checkoutError }}</span>
            </div>
          </Transition>

          <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
            <div
              v-for="item in carrito.detalles"
              :key="item.id"
              class="bg-gray-900 rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-black/30 border border-white/5"
            >
              <!-- Image -->
              <div class="w-16 h-16 rounded-xl bg-gray-800 flex-shrink-0 overflow-hidden">
                <img
                  v-if="item.producto?.imagen"
                  :src="item.producto.imagen"
                  :alt="item.producto?.nombre"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-white font-bold text-base truncate">{{ item.producto?.nombre }}</p>
                <p class="text-[#F2884B] font-semibold text-sm">${{ Number(item.precio_unitario).toFixed(2) }} c/u</p>
                <p class="text-gray-500 text-xs mt-0.5">Subtotal: ${{ (Number(item.precio_unitario) * item.cantidad).toFixed(2) }}</p>
              </div>

              <!-- Quantity -->
              <div class="flex items-center gap-2">
                <button
                  @click="handleUpdate(item.id, item.cantidad - 1)"
                  :disabled="item.cantidad <= 1 || updatingId === item.id"
                  class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="text-white font-bold w-8 text-center">
                  <svg v-if="updatingId === item.id" class="animate-spin w-4 h-4 mx-auto text-[#F266B3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <span v-else>{{ item.cantidad }}</span>
                </span>
                <button
                  @click="handleUpdate(item.id, item.cantidad + 1)"
                  :disabled="updatingId === item.id"
                  class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-40"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>

              <!-- Delete -->
              <button
                @click="handleRemove(item.id)"
                :disabled="removingId === item.id"
                class="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 flex items-center justify-center transition disabled:opacity-40"
              >
                <svg v-if="removingId === item.id" class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </TransitionGroup>

          <!-- Clear cart -->
          <button
            @click="handleClear"
            :disabled="clearing"
            class="self-start text-white/50 hover:text-white/80 text-sm font-medium flex items-center gap-1.5 transition mt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            {{ clearing ? 'Vaciando...' : 'Vaciar carrito' }}
          </button>
        </div>

        <!-- Order summary + checkout -->
        <div class="flex flex-col gap-4">
          <!-- Summary card -->
          <div class="bg-white rounded-2xl p-6 shadow-2xl shadow-black/30 flex flex-col gap-4">
            <h2 class="text-xl font-bold text-gray-900">Resumen</h2>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-sm text-gray-500 font-medium">
                <span>Subtotal</span>
                <span class="text-gray-800">${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500 font-medium">
                <span>Impuestos (16%)</span>
                <span class="text-pink-500">+ ${{ impuestos.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center pt-3 border-t border-gray-100 mt-1">
                <span class="text-gray-900 font-bold text-base">Total</span>
                <span class="text-[#F2884B] text-2xl font-black">${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Payment method + checkout -->
          <div class="bg-gray-900 rounded-2xl p-6 shadow-2xl shadow-black/30 flex flex-col gap-4 border border-white/5">
            <h2 class="text-lg font-bold text-white">Método de Pago</h2>

            <div class="flex flex-col gap-2">
              <label
                v-for="method in paymentMethods"
                :key="method.value"
                :for="`payment-${method.value}`"
                class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition"
                :class="metodoPago === method.value
                  ? 'border-[#F266B3] bg-[#F266B3]/10'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'"
              >
                <input
                  type="radio"
                  :id="`payment-${method.value}`"
                  :value="method.value"
                  v-model="metodoPago"
                  class="accent-[#F266B3]"
                />
                <div>
                  <p class="text-white font-semibold text-sm">{{ method.label }}</p>
                  <p class="text-gray-500 text-xs">{{ method.description }}</p>
                </div>
              </label>
            </div>

            <button
              @click="handleCheckout"
              :disabled="!metodoPago || procesando"
              class="w-full bg-gradient-to-r from-[#F266B3] to-[#F2884B] hover:from-[#d94f9a] hover:to-[#e07740] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-[#F266B3]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="procesando" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span>{{ procesando ? 'Procesando...' : 'Confirmar y Pagar' }}</span>
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
import { useCart } from '@/composables/useCart'
import { checkoutCart } from '@/services/CartService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const router = useRouter()
const { carrito, subtotal, impuestos, total, loading, fetchCarrito, updateItem, removeItem, clearCart } = useCart()

const fetchError = ref(null)
const checkoutError = ref(null)
const metodoPago = ref('')
const procesando = ref(false)
const updatingId = ref(null)
const removingId = ref(null)
const clearing = ref(false)

const paymentMethods = [
  { value: 'tarjeta_credito', label: 'Tarjeta de Crédito / Débito', description: 'Visa, Mastercard, etc.' },
  { value: 'efectivo',        label: 'Efectivo en Tienda',          description: 'Paga al recoger tu pedido' },
  { value: 'transferencia',   label: 'Transferencia Bancaria',      description: 'SPEI o depósito bancario' },
]

onMounted(async () => {
  try {
    await fetchCarrito()
  } catch (e) {
    fetchError.value = 'No se pudo cargar el carrito. Intenta de nuevo.'
  }
})

const handleUpdate = async (item_id, newQty) => {
  if (newQty < 1) return
  updatingId.value = item_id
  try {
    await updateItem(item_id, newQty)
  } catch (e) {
    console.error(e)
  } finally {
    updatingId.value = null
  }
}

const handleRemove = async (item_id) => {
  removingId.value = item_id
  try {
    await removeItem(item_id)
  } catch (e) {
    console.error(e)
  } finally {
    removingId.value = null
  }
}

const handleClear = async () => {
  clearing.value = true
  try {
    await clearCart()
  } catch (e) {
    console.error(e)
  } finally {
    clearing.value = false
  }
}

const handleCheckout = async () => {
  if (!metodoPago.value) return
  procesando.value = true
  checkoutError.value = null
  try {
    await checkoutCart(metodoPago.value)
    router.push('/checkout-success')
  } catch (e) {
    checkoutError.value = e.response?.data?.error || e.response?.data?.message || 'Error al procesar la compra. Intenta de nuevo.'
  } finally {
    procesando.value = false
  }
}
</script>

<style scoped>
.fade-up-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
