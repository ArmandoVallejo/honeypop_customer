<template>
<section class="bg-gradient-to-b from-[#F266B3] to-[#F2884B] min-h-screen">

    <!-- Header del menú -->
    <div class="pt-10 pb-4 px-6 text-center">
      <h2 class="text-4xl text-white font-caprasimo">Conoce nuestros deliciosos postrecitos</h2>
      <p class="text-white/80 mt-2 text-lg font-light">Elige tu favorito y disfruta cada bocado</p>
    </div>

    <!-- Filtros sticky -->
    <div class="sticky top-[4.5rem] z-40 bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-3">
      <div class="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/>
          </svg>
          <input
            v-model="buscar"
            type="text"
            placeholder="Buscar por nombre..."
            class="w-full rounded-xl pl-9 pr-4 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
          />
        </div>
        <select
          v-model="categoria"
          class="rounded-xl px-4 py-2 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white shadow-sm"
        >
          <option value="">Todas las categorías</option>
          <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Contenido -->
    <div class="px-6 py-10">

      <!-- Skeletons durante carga -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <SkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center gap-4 py-16 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        <p class="text-xl">{{ error }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center gap-4 py-16 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-xl font-semibold">No encontramos productos</p>
        <p class="text-white/70">Intenta con otra búsqueda o categoría</p>
        <button @click="buscar = ''; categoria = ''" class="mt-2 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl font-semibold transition">
          Limpiar filtros
        </button>
      </div>

      <!-- Grid de productos -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product-id="product.id"
          :name="product.nombre"
          :description="product.descripcion"
          :price="product.costo_unitario"
          :category="product.categoria"
          :stock="product.stock_actual"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { getProducts } from '@/services/ProductService'

const products = ref([])
const categorias = ref([])
const loading = ref(false)
const error = ref(null)
const buscar = ref('')
const categoria = ref('')

let debounceTimer = null

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    products.value = await getProducts({
      categoria: categoria.value || undefined,
      buscar: buscar.value || undefined,
    })
  } catch (e) {
    error.value = 'No se pudieron cargar los productos.'
  } finally {
    loading.value = false
  }
}

const fetchCategorias = async () => {
  try {
    const all = await getProducts()
    categorias.value = [...new Set(all.map(p => p.categoria).filter(Boolean))]
  } catch {}
}

watch(categoria, fetchProducts)

watch(buscar, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchProducts, 400)
})

onMounted(async () => {
  await fetchCategorias()
  await fetchProducts()
})
</script>