<template>
  <section class="bg-gradient-to-b from-gray-900 via-gray-800 to-[#F266B3]/20 min-h-screen px-4 flex items-center justify-center relative overflow-hidden">
    
    <!-- Background Decorators -->
    <div class="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#F2884B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#F266B3]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

    <div class="z-10 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl flex flex-col items-center shadow-black/50">
      
      <!-- Success Animation Wrapper -->
      <div class="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-full mb-6 flex items-center justify-center shadow-lg shadow-green-500/30 animate-bounce-slow">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-4xl font-caprasimo text-white mb-4 drop-shadow-md">¡Pago Exitoso!</h1>
      <p class="text-gray-300 text-lg mb-8 leading-relaxed font-medium">
        Tu pedido ha sido procesado correctamente. En breve recibirás un correo con los detalles de tu compra.
      </p>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

      <BaseButton variant="primary" size="lg" class="w-full sm:w-auto font-bold px-10 text-lg shadow-lg" @click="$router.push('/menu')">
        Seguir Comprando
      </BaseButton>
    </div>

  </section>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { onMounted } from 'vue'
import JSConfetti from 'js-confetti/dist/es/index.js'

onMounted(() => {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    confettiColors: [
      '#F266B3', '#F2884B', '#ffffff', '#4ade80'
    ],
    confettiRadius: 6,
    confettiNumber: 150,
  })
})
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>

