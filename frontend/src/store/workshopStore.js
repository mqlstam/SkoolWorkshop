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
            } else throw new Error(response.message)
        },

        async update (data, id) {
            const { response, ok } = await API.Req('PUT', `/api/workshops/${id}`, { body: data })
            if (!ok) {
                throw new Error(response.message)
            }
        },

        async post (workshopData, imageFile) {
            const formData = new FormData()
            formData.append('name', workshopData.name)
            formData.append('groupSize', workshopData.groupSize)
            if (imageFile) {
                formData.append('image', imageFile)
            }

            const response = await fetch('/api/workshops', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const message = await response.text()
                throw new Error(message)
            }

            const createdWorkshop = await response.json()
            this.workshops.push(createdWorkshop)
        }
    }
})
