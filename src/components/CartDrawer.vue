<template>
  <!-- Overlay -->
  <Transition name="overlay-fade">
    <div
      v-if="drawerOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      @click="closeDrawer"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer-slide">
    <aside
      v-if="drawerOpen"
      class="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-gray-900 z-50 flex flex-col shadow-2xl shadow-black/60"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#F266B3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <h2 class="text-xl font-bold text-white">Mi Carrito</h2>
          <span v-if="itemCount > 0" class="bg-[#F266B3] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {{ itemCount }}
          </span>
        </div>
        <button
          @click="closeDrawer"
          class="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Cerrar carrito"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <svg class="animate-spin w-10 h-10 text-[#F266B3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>

      <!-- Empty cart -->
      <div v-else-if="!carrito || !carrito.detalles || carrito.detalles.length === 0" class="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-white font-semibold text-lg">Tu carrito está vacío</p>
          <p class="text-gray-500 text-sm mt-1">¡Agrega productos desde el menú!</p>
        </div>
        <button
          @click="() => { closeDrawer(); router.push('/menu') }"
          class="bg-[#F266B3] hover:bg-[#d94f9a] text-white font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Ir al Menú
        </button>
      </div>

      <!-- Cart items -->
      <div v-else class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        <TransitionGroup name="list">
          <div
            v-for="item in carrito.detalles"
            :key="item.id"
            class="flex items-center gap-3 bg-gray-800 rounded-2xl p-3 border border-white/5"
          >
            <!-- Product image placeholder -->
            <div class="w-14 h-14 rounded-xl bg-gray-700 flex-shrink-0 overflow-hidden">
              <img
                v-if="item.producto?.imagen"
                :src="item.producto.imagen"
                :alt="item.producto.nombre"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-white font-semibold text-sm truncate">{{ item.producto?.nombre }}</p>
              <p class="text-[#F2884B] text-sm font-bold">${{ Number(item.precio_unitario).toFixed(2) }}</p>
            </div>

            <!-- Quantity controls -->
            <div class="flex items-center gap-1">
              <button
                @click="handleUpdate(item.id, item.cantidad - 1)"
                :disabled="item.cantidad <= 1 || updatingId === item.id"
                class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span class="text-white font-bold w-6 text-center text-sm">
                <svg v-if="updatingId === item.id" class="animate-spin w-4 h-4 mx-auto text-[#F266B3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <span v-else>{{ item.cantidad }}</span>
              </span>
              <button
                @click="handleUpdate(item.id, item.cantidad + 1)"
                :disabled="updatingId === item.id"
                class="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>

            <!-- Remove button -->
            <button
              @click="handleRemove(item.id)"
              :disabled="removingId === item.id"
              class="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 flex items-center justify-center transition disabled:opacity-40 flex-shrink-0"
            >
              <svg v-if="removingId === item.id" class="animate-spin w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </TransitionGroup>
      </div>

      <!-- Footer with totals and actions -->
      <div v-if="carrito && carrito.detalles && carrito.detalles.length > 0" class="border-t border-white/10 px-6 py-5 flex flex-col gap-4">
        <!-- Totals -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span class="text-white font-semibold">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-400">
            <span>Impuestos (16%)</span>
            <span class="text-pink-400 font-semibold">+ ${{ impuestos.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between items-center pt-2 border-t border-white/10">
            <span class="text-white font-bold">Total</span>
            <span class="text-[#F2884B] text-xl font-black">${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col gap-2">
          <button
            @click="goToCart"
            class="w-full bg-gradient-to-r from-[#F266B3] to-[#F2884B] hover:from-[#d94f9a] hover:to-[#e07740] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-[#F266B3]/20"
          >
            Ver Carrito y Pagar
          </button>
          <button
            @click="handleClear"
            :disabled="clearing"
            class="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-medium py-2.5 rounded-xl transition text-sm disabled:opacity-40"
          >
            {{ clearing ? 'Vaciando...' : 'Vaciar Carrito' }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const { carrito, subtotal, impuestos, total, itemCount, loading, drawerOpen, closeDrawer, updateItem, removeItem, clearCart } = useCart()

const updatingId = ref(null)
const removingId = ref(null)
const clearing = ref(false)

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

const goToCart = () => {
  closeDrawer()
  router.push('/carrito')
}
</script>

<style scoped>
/* Overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* Drawer slide from right */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

/* List item transitions */
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
