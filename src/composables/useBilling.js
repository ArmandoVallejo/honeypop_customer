import { ref } from 'vue'
import {
    getBilling as apiGetBilling,
    createBilling as apiCreateBilling,
    updateBilling as apiUpdateBilling,
    deleteBilling as apiDeleteBilling,
} from '@/services/BillingService'

// Estado global compartido (fuera de la función para que sea singleton)
const billing = ref(null)
const loading = ref(false)
const error = ref(null)

export function useBilling() {
    const fetchBilling = async (clientId) => {
        loading.value = true
        error.value = null
        try {
            const data = await apiGetBilling(clientId)
            billing.value = data
        } catch (e) {
            error.value = e.response?.data?.message || e.response?.data?.error || 'Error al cargar la información de facturación'
            console.error('Error al cargar facturación', e)
        } finally {
            loading.value = false
        }
    }

    const saveBilling = async (clientId, billingData) => {
        loading.value = true
        error.value = null
        try {
            let data
            if (billing.value) {
                data = await apiUpdateBilling(clientId, billingData)
            } else {
                data = await apiCreateBilling(clientId, billingData)
            }
            billing.value = data
            return data
        } catch (e) {
            error.value = e.response?.data?.message || e.response?.data?.error || 'Error al guardar la dirección de facturación'
            console.error('Error al guardar facturación', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    const removeBilling = async (clientId) => {
        loading.value = true
        error.value = null
        try {
            await apiDeleteBilling(clientId)
            billing.value = null
        } catch (e) {
            error.value = e.response?.data?.message || e.response?.data?.error || 'Error al eliminar la dirección de facturación'
            console.error('Error al eliminar facturación', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        billing,
        loading,
        error,
        fetchBilling,
        saveBilling,
        removeBilling,
    }
}
