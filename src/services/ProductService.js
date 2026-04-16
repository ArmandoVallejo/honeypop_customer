import { useService } from '@/composables/useService';

const service = useService();

export const getProducts = async ({ categoria, buscar } = {}) => {
    const params = {};
    if (categoria) params.categoria = categoria;
    if (buscar) params.buscar = buscar;
    const { data } = await service.get('/productos', params);
    return data;
}

export const getProductById = async (id) => {
    const { data } = await service.get(`/productos/${id}`);
    return data;
}
