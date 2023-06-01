import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        fetched: false,
        workshops: []
    }),
    actions: {
        async fetch (force) {
            if (this.fetched && !force) return

            const { response, ok } = await API.Req('GET', '/api/workshops')
            if (ok) {
                this.workshops = response
                this.fetched = true
            } else {
                this.workshops = []
            }
        },

        async get (id) {
            const workshop = this.workshops.find(item => item.id === id)
            if (workshop) return workshop

            const { response, ok } = await API.Req('GET', `/api/workshops/${id}`)
            if (ok) {
                this.workshops.push(response)
                return response
            } else {
                throw new Error(response.message)
            }
        },

        async update (data, id) {
            const { response, ok } = await API.Req('PUT', `/api/workshops/${id}`, { body: data })
            if (ok) {
                const idx = this.workshops.findIndex(p => p.id === data.id)
                this.workshops[idx] = response
            } else {
                throw new Error(response.message)
            }
        },

        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/workshops/${id}`)
            if (ok) {
                this.workshops = this.workshops.filter(w => w.id !== id)
            } else {
                throw new Error(response.message)
            }
        }
    }
})
