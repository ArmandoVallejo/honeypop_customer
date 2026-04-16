<template>
  <section
    class="h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Overlay con gradiente mejorado -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

    <!-- Contenido centrado -->
    <div class="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 gap-6">
      <!-- Logo con fade-in -->
      <Transition name="fade-down" appear>
        <img :src="logoImage" alt="logo de honey pop" class="w-56 md:w-72 drop-shadow-2xl" />
      </Transition>

      <!-- Tagline con slide-up -->
      <Transition name="fade-up" appear>
        <div class="flex flex-col gap-2">
          <h1 class="text-4xl md:text-5xl font-light">
            Un momento
            <span class="font-semibold text-[#F266B3]">feliz</span>
            en cada
            <span class="font-semibold text-[#F2884B]">bocado</span>
          </h1>
          <p class="text-white/70 text-lg font-light">Los mejores postrecitos de Aguascalientes</p>
        </div>
      </Transition>

      <!-- CTAs -->
      <Transition name="fade-up" appear>
        <div class="flex flex-col sm:flex-row gap-4 mt-2">
          <router-link
            to="/login"
            class="bg-[#F266B3] hover:bg-[#d94f9a] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 hover:scale-105"
          >
            Ver Menú
          </router-link>
          <router-link
            to="/ubicacion"
            class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-full shadow-lg border border-white/30 transition duration-300 hover:scale-105"
          >
            ¿Dónde estamos?
          </router-link>
        </div>
      </Transition>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import backgroundImage from '@/assets/images/miniHokeisZoomed.webp'
import logoImage from '@/assets/images/honeypop.webp'
</script>

<style scoped>
.fade-down-enter-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-up-enter-active {
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>