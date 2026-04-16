<template>
  <router-link :to="{ name: 'producto-detalle', params: { id: productId } }" class="block group">
    <div class="relative bg-gray-900 text-white rounded-2xl shadow-lg shadow-black/40 overflow-hidden w-full max-w-md mx-auto transition-transform duration-300 group-hover:scale-105">

      <!-- Imagen -->
      <div class="relative overflow-hidden">
        <img :src="image || placeholderImage" :alt="name" class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">

        <!-- Overlay con CTA en hover -->
        <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span class="bg-white text-gray-900 font-semibold px-5 py-2 rounded-full text-sm shadow-lg">
            Ver detalles
          </span>
        </div>

        <!-- Badge de stock bajo -->
        <span
          v-if="stock !== null && stock <= 10"
          class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow"
        >
          ¡Poco stock!
        </span>
      </div>

      <div class="p-5 flex flex-col gap-2">
        <!-- Nombre y badge de categoría -->
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-lg font-semibold text-pink-400 leading-tight">{{ name }}</h3>
          <span v-if="category" class="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full" :class="categoryBadgeClass">
            {{ category }}
          </span>
        </div>

        <p class="text-sm font-light text-gray-400 line-clamp-2">{{ description }}</p>

        <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-700">
          <span class="text-xs text-gray-500">Stock: <span class="text-gray-300 font-medium">{{ stock ?? 'N/A' }}</span></span>
          <span class="text-[#F2884B] text-xl font-bold">${{ price }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import placeholderImage from '@/assets/images/honeypop.webp'

const props = defineProps({
  productId: { type: [String, Number], required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: [String, Number], required: true },
  image: { type: String, default: null },
  category: { type: String, default: null },
  stock: { type: [String, Number], default: null },
})

const categoryColors = {
  Paletas: 'bg-pink-500/20 text-pink-300',
  Frascos: 'bg-amber-500/20 text-amber-300',
  Insumos: 'bg-blue-500/20 text-blue-300',
}

const categoryBadgeClass = computed(() =>
  categoryColors[props.category] || 'bg-white/10 text-gray-300'
)
</script>
