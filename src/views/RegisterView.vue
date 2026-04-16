<template>
  <section class="min-h-screen bg-gradient-to-br from-[#F266B3] to-[#F2884B] flex items-center justify-center px-4 py-10">
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden">

      <!-- Lado izquierdo: branding -->
      <div class="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-[#F266B3] to-[#F2884B] w-1/2 p-10 text-white text-center">
        <img :src="logo" alt="logo de honey pop" class="w-40 mb-6 drop-shadow-lg" />
        <h1 class="text-3xl font-caprasimo mb-3">¡Únete!</h1>
        <p class="text-white/80 text-lg font-light">Crea tu cuenta y empieza a disfrutar nuestros <span class="font-semibold">deliciosos postrecitos</span>.</p>
      </div>

      <!-- Lado derecho: formulario -->
      <div class="flex-1 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
        <img :src="logo" alt="logo de honey pop" class="w-24 mx-auto mb-4 md:hidden" />
        <h2 class="text-2xl font-caprasimo text-[#F266B3] mb-1">Crear cuenta</h2>
        <p class="text-gray-500 text-sm mb-6">Completa tus datos para registrarte</p>

        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <BaseInput v-model="credentials.nombre" label="Nombre" placeholder="Tu nombre" :required="true" />
          <BaseInput v-model="credentials.correo" label="Correo electrónico" type="email" placeholder="correo@ejemplo.com" :required="true" />
          <BaseInput v-model="credentials.password" label="Contraseña" type="password" placeholder="••••••••" :required="true" />

          <!-- Información adicional (colapsable) -->
          <div>
            <button
              type="button"
              @click="showExtra = !showExtra"
              class="flex items-center gap-1.5 text-[#F266B3] text-sm font-semibold hover:underline transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform" :class="{ 'rotate-90': showExtra }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              Información adicional (opcional)
            </button>
            <Transition name="slide-down">
              <div v-if="showExtra" class="flex flex-col gap-4 mt-3">
                <BaseInput v-model="credentials.telefono" label="Teléfono" type="tel" placeholder="55 1234 5678" />
                <BaseInput v-model="credentials.empresa" label="Empresa" placeholder="Nombre de tu empresa" />
              </div>
            </Transition>
          </div>

          <!-- Error/Success -->
          <Transition name="shake">
            <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
              {{ error }}
            </div>
          </Transition>

          <BaseButton type="submit" variant="primary" size="lg" :loading="loading" class="w-full mt-1">
            Registrarse
          </BaseButton>

          <p class="text-center text-sm text-gray-500 mt-2">
            ¿Ya tienes cuenta?
            <RouterLink to="/login" class="text-[#F266B3] font-semibold hover:underline">Inicia sesión</RouterLink>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import logo from '@/assets/images/honeypop.webp'

const router = useRouter()
const { register } = useAuth()

const credentials = ref({ nombre: '', correo: '', password: '', telefono: '', empresa: '' })
const error = ref(null)
const loading = ref(false)
const showExtra = ref(false)

const handleRegister = async () => {
  error.value = null
  loading.value = true
  try {
    await register(credentials.value)
    router.push('/login')
  } catch (e) {
    error.value = 'No se pudo completar el registro. Verifica los datos.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.shake-enter-active {
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
