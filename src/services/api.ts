import axios, {type AxiosInstance} from "axios";


const api:AxiosInstance = axios.create({
    baseURL: 'https://blog-space-be.vercel.app/api/v1',
})

const PUBLIC_ENDPOINTS = ["auth/login", "auth/register"];

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
        config.url?.includes(endpoint))

    if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})


export default api;