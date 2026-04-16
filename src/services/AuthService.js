import { useService } from '@/composables/useService';

const service = useService();

export const register = (user) => {
    return service.post('/cliente/register', {
        nombre: user.nombre,
        correo: user.correo,
        password: user.password,
        telefono: user.telefono || undefined,
        empresa: user.empresa || undefined,
    });
}

export const login = async (user) => {
    const { data } = await service.post('/cliente/login', {
        correo: user.correo,
        password: user.password
    });

    return data;
}

export const logout = () => {
    return service.post('/cliente/logout');
}

export const getRol = async () => {
    const { data } = await service.get('/cliente/rol');
    return data;
}