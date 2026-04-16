<template>
  <section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen px-4 py-10">
    
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-8">
      <h1 class="text-4xl font-caprasimo text-white mb-2">Promociones Activas</h1>
      <p class="text-white/80 text-lg">Aprovecha nuestras mejores ofertas en productos seleccionados</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <LoadingSpinner label="Cargando promociones..." size="lg" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center gap-4 py-16 text-white bg-red-500/20 rounded-xl p-8 border border-red-500/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        <p class="text-xl">{{ error }}</p>
        <router-link to="/menu" class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl font-semibold transition">
          Volver al menú
        </router-link>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="promocionesActivas.length === 0" class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center gap-4 py-16 text-white bg-white/10 rounded-xl p-8 border border-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 0 0 9.5 3H4.5A2.5 2.5 0 0 0 2 5.5v13A2.5 2.5 0 0 0 4.5 21h15A2.5 2.5 0 0 0 22 18.5V9a2.5 2.5 0 0 0-2.5-2.5H12z"/>
        </svg>
        <p class="text-xl">No hay promociones activas en este momento</p>
        <p class="text-sm opacity-80">Vuelve pronto para ver nuestras mejores ofertas</p>
        <router-link to="/menu" class="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl font-semibold transition mt-2">
          Ir al menú
        </router-link>
      </div>
    </div>

    <!-- Grid de promociones -->
    <div v-else class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="promo in promocionesActivas"
          :key="promo.id"
          class="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/50 transition-all duration-300 border border-white/20 flex flex-col h-full"
        >
          <!-- Imagen del producto -->
          <div class="relative h-64 overflow-hidden bg-gray-900">
            <img
              v-if="promo.producto?.imagen"
              :src="promo.producto.imagen"
              :alt="promo.producto?.nombre"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>

            <!-- Badge de descuento -->
            <div class="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full text-lg shadow-lg">
              {{ promo.descuento }}% OFF
            </div>

            <!-- Badge de validez -->
            <div v-if="diasRestantes(promo.fecha_fin) <= 3" class="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              ¡Últimos {{ diasRestantes(promo.fecha_fin) }} días!
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6 flex flex-col gap-4 flex-1">
            <!-- Nombre del producto y código -->
            <div>
              <p class="text-white/70 text-xs uppercase font-semibold tracking-wider mb-1">
                {{ promo.producto?.categoria || 'Categoría' }}
              </p>
              <h3 class="text-xl font-caprasimo text-white leading-tight mb-2">
                {{ promo.producto?.nombre || 'Producto Promocional' }}
              </h3>
              <p v-if="promo.codigo" class="text-xs bg-white/10 text-white/80 inline-block px-3 py-1 rounded font-mono">
                Código: {{ promo.codigo }}
              </p>
            </div>

            <!-- Descripción -->
            <p v-if="promo.descripcion" class="text-white/70 text-sm leading-relaxed flex-1">
              {{ promo.descripcion }}
            </p>

            <!-- Precios -->
            <div class="flex items-end gap-3 border-t border-white/20 pt-4">
              <div>
                <p class="text-white/60 text-sm line-through">
                  ${{ Number(promo.producto?.costo_unitario || 0).toFixed(2) }}
                </p>
                <p class="text-3xl font-bold text-yellow-300">
                  ${{ precioConDescuento(promo.producto?.costo_unitario, promo.descuento).toFixed(2) }}
                </p>
              </div>
              <p class="text-white/60 text-sm ml-auto">
                Hasta {{ formatDate(promo.fecha_fin) }}
              </p>
            </div>

            <!-- Botón de acción -->
            <router-link
              :to="`/productos/${promo.producto?.id}`"
              class="mt-auto w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl text-center transition-all transform hover:scale-105 duration-200 shadow-lg"
            >
              Ver Producto
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getPromociones } from '@/services/PromocionService'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const promociones = ref([])
const loading = ref(true)
const error = ref(null)

const promocionesActivas = computed(() => {
  return promociones.value.filter(promo => promo.estado === 'activo' || promo.activo === true)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

const diasRestantes = (dateString) => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const fecha = new Date(dateString)
  fecha.setHours(0, 0, 0, 0)
  const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24))
  return Math.max(0, diff)
}

const precioConDescuento = (precio, descuento) => {
  const num = Number(precio || 0)
  return num * (1 - descuento / 100)
}

onMounted(async () => {
  try {
    const data = await getPromociones()
    promociones.value = Array.isArray(data) ? data : data.promociones || []
  } catch (e) {
    console.error('Error al cargar promociones:', e)
    error.value = 'No se pudieron cargar las promociones. Intenta más tarde.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.nav-link {
  @apply inline-block cursor-pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
}
</style>
