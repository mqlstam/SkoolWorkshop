import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        fetched: false,
        users: []
    }),
    actions: {
        async fetch (force = false) {
            if (this.fetched && !force) return

            try {
                const { data } = await axios.get('/api/users')
                this.users = data
                this.fetched = true
            } catch {
                this.users = []
            }
        },

        async get (id) {
            const user = this.users.find(item => item.id === id)
            if (user) return user

            try {
                const { data } = await axios.get(`/api/users/${id}`)
                this.users.push(data)
                return data
            } catch (err) {
                throw new Error('User not found')
            }
        },

        async create (user) {
            try {
                const { data } = await axios.post('/api/users', user)
                this.users.push(data)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async update (user, id) {
            try {
                const { data } = await axios.put(`/api/users/${id}`, user)
                const idx = this.users.findIndex(p => p.id === data.id)
                this.users[idx] = data
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async delete (id) {
            try {
                await axios.delete(`/api/users/${id}`)
                this.users = this.users.filter(w => w.id !== id)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        search (query) {
            return this.users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        }
    }
})
