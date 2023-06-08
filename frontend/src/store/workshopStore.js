import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        fetched: false,
        workshops: []
    }),
    actions: {
        async fetch (force = false) {
            if (this.fetched && !force) return

            try {
                const { data } = await axios.get('/api/workshops')
                this.workshops = data
                this.fetched = true
            } catch {
                this.workshops = []
            }
        },

        async get (id) {
            const workshop = this.workshops.find(item => item.id === id)
            if (workshop) return workshop

            try {
                const { data } = await axios.get(`/api/workshops/${id}`)
                this.workshops.push(data)
                return data
            } catch {
                throw new Error('Workshop not found')
            }
        },

        async create (workshop) {
            try {
                const { data } = await axios.post('/api/workshops', workshop)
                this.workshops.push(data)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async update (product, id) {
            try {
                const { data } = await axios.put(`/api/workshops/${id}`, product)
                const idx = this.workshops.findIndex(p => p.id === data.id)
                this.workshops[idx] = data
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async delete (id) {
            try {
                await axios.delete(`/api/workshops/${id}`)
                this.workshops = this.workshops.filter(w => w.id !== id)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        search (query) {
            return this.workshops.filter(workshop => workshop.name.toLowerCase().includes(query.toLowerCase()))
        }
    }
})
