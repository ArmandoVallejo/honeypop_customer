import { useService } from '@/composables/useService';

const service = useService();

export const getCarrito = async () => {
    const { data } = await service.get('/cliente/carrito/');
    return data;
}

export const addToCart = async (producto_id, cantidad = 1) => {
    const { data } = await service.post('/cliente/carrito/agregar', { producto_id, cantidad });
    return data;
}

export const updateItem = async (item_id, cantidad) => {
    const { data } = await service.put(`/cliente/carrito/item/${item_id}`, { cantidad });
    return data;
}

export const removeItem = async (item_id) => {
    const { data } = await service.delete(`/cliente/carrito/item/${item_id}`);
    return data;
}

export const clearCart = async () => {
    const { data } = await service.delete('/cliente/carrito/vaciar');
    return data;
}

export const checkoutCart = async (metodo_pago) => {
    const { data } = await service.post('/cliente/carrito/comprar', { metodo_pago });
    return data;
}
