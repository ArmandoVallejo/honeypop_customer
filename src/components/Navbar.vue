<template>
  <CartDrawer />
  <header class="sticky top-0 z-50 flex items-center justify-center bg-[#F266B3] shadow-lg shadow-pink-900/30 relative">
    <nav class="w-full text-white px-5 py-3">

      <!-- Desktop -->
      <ul class="hidden sm:flex text-base font-bold justify-evenly items-center w-full gap-2">
        <li>
          <RouterLink to="/" class="nav-link" :class="{ 'nav-link-active': $route.path === '/' }">Home</RouterLink>
        </li>
        <li v-if="isAuthenticated">
          <RouterLink to="/menu" class="nav-link" :class="{ 'nav-link-active': $route.path.startsWith('/menu') || $route.path.startsWith('/productos') }">Menú</RouterLink>
        </li>
        <li v-if="isAuthenticated">
          <RouterLink to="/promociones" class="nav-link" :class="{ 'nav-link-active': $route.path === '/promociones' }">Promociones</RouterLink>
        </li>
        <li v-if="isAuthenticated">
          <RouterLink to="/atencion" class="nav-link" :class="{ 'nav-link-active': $route.path === '/atencion' }">Atención</RouterLink>
        </li>
        <li v-if="isAuthenticated">
          <RouterLink to="/facturacion" class="nav-link" :class="{ 'nav-link-active': $route.path === '/facturacion' }">Facturación</RouterLink>
        </li>
        <li v-if="!isAuthenticated">
          <RouterLink to="/ubicacion" class="nav-link" :class="{ 'nav-link-active': $route.path === '/ubicacion' }">Ubicación</RouterLink>
        </li>
        <li v-if="!isAuthenticated">
          <RouterLink to="/contacto" class="nav-link" :class="{ 'nav-link-active': $route.path === '/contacto' }">Contacto</RouterLink>
        </li>

        <!-- Autenticado: carrito -->
        <template v-if="isAuthenticated">
          <li>
            <button
              id="cart-btn-desktop"
              @click="toggleDrawer"
              class="relative flex items-center gap-1.5 nav-link"
              aria-label="Ver carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span
                v-if="itemCount > 0"
                class="absolute -top-2 -right-2 bg-white text-[#F266B3] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow"
              >
                {{ itemCount > 99 ? '99+' : itemCount }}
              </span>
            </button>
          </li>
        </template>

        <!-- No autenticado: iniciar sesión -->
        <template v-if="!isAuthenticated">
          <li>
            <RouterLink to="/login" class="nav-link" :class="{ 'nav-link-active': $route.path === '/login' }">Iniciar Sesión</RouterLink>
          </li>
        </template>
      </ul>

      <!-- Mobile -->
      <div class="flex sm:hidden items-center justify-between">
        <RouterLink to="/" class="font-caprasimo text-lg">HoneyPop</RouterLink>
        <button @click="menuOpen = !menuOpen" class="p-1 rounded-lg hover:bg-white/20 transition" aria-label="Menú">
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile dropdown -->
      <Transition name="dropdown">
        <ul v-if="menuOpen" class="sm:hidden flex flex-col gap-3 pt-3 pb-1 border-t border-white/30 mt-2 text-base font-semibold">
          <li><RouterLink to="/" @click="menuOpen = false" class="nav-link block">Home</RouterLink></li>
          <li v-if="isAuthenticated"><RouterLink to="/menu" @click="menuOpen = false" class="nav-link block">Menú</RouterLink></li>
          <li v-if="isAuthenticated"><RouterLink to="/promociones" @click="menuOpen = false" class="nav-link block">Promociones</RouterLink></li>
          <li v-if="isAuthenticated"><RouterLink to="/atencion" @click="menuOpen = false" class="nav-link block">Atención</RouterLink></li>
          <li v-if="isAuthenticated"><RouterLink to="/facturacion" @click="menuOpen = false" class="nav-link block">Facturación</RouterLink></li>
          <li v-if="!isAuthenticated"><RouterLink to="/ubicacion" @click="menuOpen = false" class="nav-link block">Ubicación</RouterLink></li>
          <li v-if="!isAuthenticated"><RouterLink to="/contacto" @click="menuOpen = false" class="nav-link block">Contacto</RouterLink></li>
          <li v-if="isAuthenticated">
            <button
              id="cart-btn-mobile"
              @click="() => { menuOpen = false; toggleDrawer() }"
              class="nav-link flex items-center gap-2 w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Carrito
              <span v-if="itemCount > 0" class="bg-white text-[#F266B3] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                {{ itemCount > 99 ? '99+' : itemCount }}
              </span>
            </button>
          </li>
          <li v-if="isAuthenticated">
            <button @click="handleLogout" class="nav-link flex items-center gap-1.5 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Salir ({{ userName }})
            </button>
          </li>
          <li v-else><RouterLink to="/login" @click="menuOpen = false" class="nav-link block">Iniciar Sesión</RouterLink></li>
        </ul>
      </Transition>

    </nav>

    <!-- Perfil desplegable fuera del nav, posicionado a la derecha del header -->
    <div v-if="isAuthenticated" class="hidden sm:flex absolute right-6" v-click-outside="() => profileOpen = false">
      <button @click="profileOpen = !profileOpen" class="flex items-center gap-2 cursor-pointer select-none">
        <span class="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-bold text-white text-xs uppercase">
          {{ userInitial }}
        </span>
        <span class="text-sm font-semibold text-white hidden md:inline">{{ userName }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white transition-transform duration-200" :class="{ 'rotate-180': profileOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown -->
      <Transition name="dropdown">
        <div v-if="profileOpen" class="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg py-1 border border-gray-100">
          <button @click="handleLogout" class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#F266B3] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Salir
          </button>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useCart } from '@/composables/useCart'
import CartDrawer from '@/components/CartDrawer.vue'

const router = useRouter()
const route = useRoute()
const { isAuthenticated, logout, user } = useAuth()
const { itemCount, toggleDrawer, fetchCarrito } = useCart()

const menuOpen = ref(false)
const profileOpen = ref(false)

const userName = computed(() => user.value?.nombre || 'Cliente')
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

onMounted(async () => {
  if (isAuthenticated.value) {
    await fetchCarrito()
  }
})

const handleLogout = async () => {
  menuOpen.value = false
  profileOpen.value = false
  await logout()
  router.push('/')
}

// Directiva click outside
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => { if (!el.contains(e.target)) binding.value(e) }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}
</script>

<style scoped>
.nav-link {
  @apply inline-block cursor-pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
}
.nav-link:hover {
  transform: scale(1.05);
  color: rgb(255 255 255 / 0.8);
}
.nav-link-active {
  @apply underline underline-offset-4 decoration-2;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
