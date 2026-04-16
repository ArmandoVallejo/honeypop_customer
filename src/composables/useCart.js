import { ref, computed } from 'vue';
import {
    getCarrito as apiGetCarrito,
    addToCart as apiAddToCart,
    updateItem as apiUpdateItem,
    removeItem as apiRemoveItem,
    clearCart as apiClearCart,
} from '@/services/CartService';

// Estado global compartido (fuera de la función para que sea singleton)
const carrito = ref(null);
const subtotal = ref(0);
const impuestos = ref(0);
const total = ref(0);
const loading = ref(false);
const drawerOpen = ref(false);

const itemCount = computed(() => {
    if (!carrito.value?.detalles) return 0;
    return carrito.value.detalles.reduce((acc, item) => acc + item.cantidad, 0);
});

export function useCart() {
    const fetchCarrito = async () => {
        loading.value = true;
        try {
            const data = await apiGetCarrito();
            carrito.value = data.carrito;
            subtotal.value = data.subtotal ?? 0;
            impuestos.value = data.impuestos ?? 0;
            total.value = data.total ?? 0;
        } catch (e) {
            console.error('Error al cargar el carrito', e);
        } finally {
            loading.value = false;
        }
    };

    const addToCart = async (producto_id, cantidad = 1) => {
        await apiAddToCart(producto_id, cantidad);
        await fetchCarrito();
    };

    const updateItem = async (item_id, cantidad) => {
        if (cantidad < 1) return;
        await apiUpdateItem(item_id, cantidad);
        await fetchCarrito();
    };

    const removeItem = async (item_id) => {
        await apiRemoveItem(item_id);
        await fetchCarrito();
    };

    const clearCart = async () => {
        await apiClearCart();
        carrito.value = null;
        subtotal.value = 0;
        impuestos.value = 0;
        total.value = 0;
    };

    const openDrawer = () => { drawerOpen.value = true; };
    const closeDrawer = () => { drawerOpen.value = false; };
    const toggleDrawer = () => { drawerOpen.value = !drawerOpen.value; };

    return {
        carrito,
        subtotal,
        impuestos,
        total,
        itemCount,
        loading,
        drawerOpen,
        fetchCarrito,
        addToCart,
        updateItem,
        removeItem,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
    };
}
