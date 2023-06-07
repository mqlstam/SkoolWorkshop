import router from './router.js'
import { useAuthStore } from '../store/authStore.js'

export default async function authInterceptor (to, from) {
    if (to.meta.public) return

    // Check whether the user is logged in, or try to refresh the token
    const authStore = useAuthStore()
    if (authStore.isLoggedIn || await authStore.refresh()) return

    // If not, redirect to login
    await router.push('/login')
}
