import { ref, computed } from "vue";
import { login as apiLogin, register as apiRegister, logout as apiLogout } from "@/services/AuthService";

const user = ref(JSON.parse(localStorage.getItem('user')) || null);
const token = ref(localStorage.getItem('token') || null);
const rol = ref(localStorage.getItem('rol') || null);

const isAuthenticated = computed(() => !!token.value);

export function useAuth() {
    const login = async (credentials) => {
        const data = await apiLogin(credentials);

        token.value = data.token;
        user.value = data.client;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.client));

        return data;
    };

    const register = async (credentials) => {
        const data = await apiRegister(credentials);
        return data;
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (error) {
            console.error(error);
        }

        token.value = null;
        user.value = null;
        rol.value = null;

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
    };

    return {
        user,
        token,
        rol,
        isAuthenticated,
        login,
        register,
        logout
    }
}