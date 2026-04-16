import { useService } from '@/composables/useService';

export const getPromociones = async () => {
  const { get } = useService();
  const response = await get('/promociones');
  return response.data;
};
