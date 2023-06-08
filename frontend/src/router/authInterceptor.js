import router from './router.js'
import { useAuthStore } from '../store/authStore.js'

// interceptor that is called before every route,
// guards routes that require authentication
export default async function authInterceptor (to, from) {
    if (to.meta.public) return

    const authStore = useAuthStore()
    if (!authStore.isLoggedIn && !(await authStore.refresh())) {
        // If user is not logged in, and refresh fails, redirect
        // to login
        await router.push('/login')
    }

    if (to.meta.role && !to.meta.role.includes(authStore.data.role)) {
        // If user is logged in, but doesn't have the required
        // role, go to home page
        await router.push('/')
    }
}
