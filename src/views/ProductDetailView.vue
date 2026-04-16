<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10">

    <!-- Breadcrumb -->
    <nav class="max-w-4xl mx-auto flex items-center gap-2 text-white/70 text-sm mb-6">
      <router-link to="/" class="hover:text-white transition">Home</router-link>
      <span>/</span>
      <router-link to="/menu" class="hover:text-white transition">Menú</router-link>
      <span>/</span>
      <span class="text-white font-medium truncate">{{ product.nombre || '...' }}</span>
    </nav>

    <LoadingSpinner v-if="loading" label="Cargando producto..." size="lg" />

    <div v-else-if="error" class="flex flex-col items-center gap-4 py-16 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
      <p class="text-xl">{{ error }}</p>
      <router-link to="/menu" class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl font-semibold transition">
        Volver al menú
      </router-link>
    </div>

    <!-- Detalle del producto -->
    <Transition name="fade-up" appear>
      <div v-if="!loading && !error" class="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">

        <!-- Layout dos columnas en desktop -->
        <div class="flex flex-col md:flex-row">

          <!-- Imagen -->
          <div class="md:w-5/12 relative flex-shrink-0">
            <img
              :src="product.image || placeholderImage"
              :alt="product.nombre"
              class="w-full h-72 md:h-full object-cover"
            />
            <!-- Badge poco stock -->
            <span
              v-if="product.stock_actual !== undefined && product.stock_actual <= 10"
              class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
            >
              ¡Poco stock!
            </span>
          </div>

          <!-- Info -->
          <div class="flex-1 p-8 flex flex-col gap-4 justify-between">
            <div class="flex flex-col gap-3">
              <div class="flex items-start justify-between gap-3">
                <h1 class="text-3xl font-caprasimo text-pink-400 leading-tight">{{ product.nombre }}</h1>
                <span v-if="product.categoria" class="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-gray-300">
                  {{ product.categoria }}
                </span>
              </div>

              <p class="text-gray-300 text-base leading-relaxed">{{ product.descripcion }}</p>

              <div class="flex flex-col gap-2 border-t border-gray-700 pt-4 mt-1">
                <!-- Proveedor chip -->
                <div v-if="product.proveedor" class="flex items-center gap-2">
                  <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">Proveedor</span>
                  <span class="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">
                    {{ product.proveedor.nombre }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-gray-400 text-sm">Stock disponible: <span class="text-white font-semibold">{{ product.stock_actual }}</span></span>
                  <span class="text-[#F2884B] text-3xl font-bold">${{ product.costo_unitario }}</span>
                </div>
              </div>
            </div>

            <!-- Selector de cantidad -->
            <div class="flex items-center gap-4 bg-gray-800 rounded-lg p-3 w-fit">
              <button
                @click="decreaseQuantidad"
                :disabled="cantidad <= 1 || loading"
                class="text-white hover:text-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
              <input
                v-model.number="cantidad"
                type="number"
                min="1"
                :max="product.stock_actual"
                class="w-12 text-center bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 font-semibold"
              />
              <button
                @click="increaseQuantidad"
                :disabled="cantidad >= product.stock_actual || loading"
                class="text-white hover:text-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </div>

            <!-- Botones de acción -->
            <div class="flex gap-3 mt-4">
              <BaseButton
                variant="outline"
                size="lg"
                class="flex-1 border-white text-white hover:bg-white hover:text-gray-900"
                @click="handleAddToCart"
                :disabled="loading || product.stock_actual === 0"
              >
                <span v-if="!isAddingToCart">Agregar al carrito</span>
                <span v-else>Agregando...</span>
              </BaseButton>
              <BaseButton
                variant="secondary"
                size="lg"
                class="flex-1"
                @click="router.push(`/checkout/${product.id}`)"
                :disabled="loading"
              >
                Comprar ahora
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '@/services/ProductService'
import { useCart } from '@/composables/useCart'
import { useNotification } from '@/composables/useNotification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BaseButton from '@/components/BaseButton.vue'
import placeholderImage from '@/assets/images/honeypop.webp'

const route = useRoute()
const router = useRouter()
const { addToCart, openDrawer } = useCart()
const { success: showSuccess, error: showError } = useNotification()

const product = ref({})
const loading = ref(true)
const error = ref(null)
const cantidad = ref(1)
const isAddingToCart = ref(false)

const increaseQuantidad = () => {
  if (cantidad.value < product.value.stock_actual) {
    cantidad.value++
  }
}

const decreaseQuantidad = () => {
  if (cantidad.value > 1) {
    cantidad.value--
  }
}

const handleAddToCart = async () => {
  try {
    isAddingToCart.value = true
    await addToCart(product.value.id, cantidad.value)
    showSuccess('Producto agregado al carrito')
    openDrawer()
    cantidad.value = 1
  } catch (e) {
    console.error('Error al agregar al carrito:', e)
    const errorMessage = e.response?.data?.message || 'Error al agregar al carrito'
    showError(errorMessage)
  } finally {
    isAddingToCart.value = false
  }
}

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
    error.value = 'No se pudo cargar el producto.'
  } finally {
    loading.value = false
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
</style>
