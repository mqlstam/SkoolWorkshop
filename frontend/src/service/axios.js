import { useAuthStore } from '../store/authStore.js'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    if (config.url.startsWith('/api/auth')) return config

    const authStore = useAuthStore()
    config.headers.Authorization = `Bearer ${authStore.token}`
    return config
})

axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        const config = err.config
        if (config.url.startsWith('/api/auth')) return Promise.reject(err)

        if (err.response.status === 401 && !config.isRetry) {
            config.isRetry = true

            const authStore = useAuthStore()
            if (await authStore.refresh()) {
                config.headers.Authorization = `Bearer ${authStore.token}`
                return axios(config)
            }
        }

        return Promise.reject(err)
    }
)
