import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import LocationView from '@/views/LocationView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import CheckoutSuccessView from '@/views/CheckoutSuccessView.vue'
import CartView from '@/views/CartView.vue'
import PromocionesView from '@/views/PromocionesView.vue'
import AttentionView from '@/views/AttentionView.vue'
import BillingView from '@/views/BillingView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
      meta: { requiresAuth: true },
    },
    {
      path: '/ubicacion',
      name: 'ubicacion',
      component: LocationView,
      meta: { guestOnly: true },
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: ContactView,
      meta: { guestOnly: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegisterView,
    },
    {
      path: '/productos/:id',
      name: 'producto-detalle',
      component: ProductDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout-success',
      name: 'checkout-success',
      component: CheckoutSuccessView,
      meta: { requiresAuth: true },
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: '/promociones',
      name: 'promociones',
      component: PromocionesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/atencion',
      name: 'atencion',
      component: AttentionView,
      meta: { requiresAuth: true },
    },
    {
      path: '/facturacion',
      name: 'facturacion',
      component: BillingView,
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return { name: 'menu' }
  }
})

export default router
