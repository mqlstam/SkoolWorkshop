import { useAuthStore } from '../store/authStore.js'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Add token to non-auth requests
axios.interceptors.request.use((config) => {
    if (config.url.startsWith('/api/auth')) return config

    const authStore = useAuthStore()
    config.headers.Authorization = `Bearer ${authStore.token}`
    return config
})

// If a request fails with 401 the token is expired, try to refresh it
axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        const config = err.config
        if (config.url.startsWith('/api/auth')) return Promise.reject(err)

        if (err.response.status === 401 && !config.isRetry) {
            config.isRetry = true

            const authStore = useAuthStore()
            if (await authStore.refresh()) {
                // Token refreshed, replace token in previous
                // request and try again
                config.headers.Authorization = `Bearer ${authStore.token}`
                return axios(config)
            } else {
                // Refresh failed, logout and redirect to login
                await authStore.logout()
                await useRouter().push('/login')
            }
        }

        return Promise.reject(err)
    }
)
