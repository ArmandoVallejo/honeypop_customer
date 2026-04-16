import { useService } from '@/composables/useService';

export const createTicket = async (asunto, mensaje) => {
  const { post } = useService();
  const response = await post('/atencion/tickets', { asunto, mensaje });
  return response.data;
};

export const getTickets = async () => {
  const { get } = useService();
  const response = await get('/atencion/tickets');
  return response.data;
};

export const getTicketDetail = async (id) => {
  const { get } = useService();
  const response = await get(`/atencion/tickets/${id}`);
  return response.data;
};

export const updateTicketRespuesta = async (id, respuesta) => {
  const { put } = useService();
  const response = await put(`/atencion/tickets/${id}/respuesta`, { respuesta });
  return response.data;
};
