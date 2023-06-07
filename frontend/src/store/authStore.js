import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        token: {},
        data: {}
    }),
    actions: {
        async login (name, password) {
            try {
                const { data } = await axios.post('/api/auth/login', { name, password })

                console.log(data)
                this.isLoggedIn = true
                this.token = data.token
                this.data = jwtDecode(data.token)
                return true
            } catch (err) {
                return false
            }
        },

        async refresh () {
            try {
                const { data } = await axios.post('/api/auth/token')

                this.isLoggedIn = true
                this.token = data.token
                this.data = jwtDecode(data.token)
                return true
            } catch {
                return false
            }
        }
    }
})
