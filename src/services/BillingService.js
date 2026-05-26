import { useService } from '@/composables/useService'

const service = useService()

export const getBilling = async (clientId) => {
    const { data } = await service.get(`/clientes/${clientId}/facturacion`)
    return data
}

export const createBilling = async (clientId, billingData) => {
    const { data } = await service.post(`/clientes/${clientId}/facturacion`, billingData)
    return data
}

export const updateBilling = async (clientId, billingData) => {
    const { data } = await service.put(`/clientes/${clientId}/facturacion`, billingData)
    return data
}

export const deleteBilling = async (clientId) => {
    const { data } = await service.delete(`/clientes/${clientId}/facturacion`)
    return data
}
