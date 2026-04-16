import { useService } from '@/composables/useService';

const service = useService();

export const processPayment = async (payload) => {
    const { data } = await service.post('/cliente/pagos/procesar', payload);
    return data;
}
