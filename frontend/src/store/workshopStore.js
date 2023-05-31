import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        workshops: []
    }),
    actions: {
        async fetch () {
            const { response, ok } = await API.Req('GET', '/api/workshops')
            if (ok) this.workshops = response
            else this.workshops = []
        },

        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/workshops/${id}`)
            if (ok) this.workshops = this.workshops.filter(w => w.id !== id)
            else throw new Error(response.message)
        },

        async get (id) {
            const workshop = this.workshops.find(item => item.id === id)
            if (workshop) return workshop

            const { response, ok } = await API.Req('GET', `/api/workshops/${id}`)
            if (ok) {
                this.workshops.push(response)
                return response
            }
            else throw new Error(response.message)
        },

        async update(data, id) {
            const { response, ok } = await API.Req('PUT', `/api/workshops/${id}`, { body: data})
            if (!ok) {
                throw new Error(response.message)
            }
        }
    }
})
