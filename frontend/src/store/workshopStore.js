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
                this.workshops = this.products.filter(w => w.id !== id)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        search (query) {
            return this.workshops.filter(workshop => workshop.name.toLowerCase().includes(query.toLowerCase()))
        },

        async addProduct (workshopId, productId, quantity) {
            const data = { productId, quantity }
            const { response, ok } = await API.Req('POST', `/api/workshops/${workshopId}/products`, { body: data })
            if (ok) {
                const workshopIndex = this.workshops.findIndex(workshop => workshop.id === workshopId)
                if (workshopIndex !== -1) {
                    const productIndex = this.workshops[workshopIndex].items.findIndex(item => item.product.id === productId)
                    if (productIndex !== -1) {
                        // Update the quantity if the product already exists in the workshop
                        this.workshops[workshopIndex].items[productIndex].quantity += quantity
                    } else {
                        // Add the product to the workshop if it doesn't already exist
                        this.workshops[workshopIndex].items.push({
                            product: response.product,
                            quantity: response.quantity
                        })
                    }
                }
            } else {
                throw new Error(response.message)
            }
        },

        async removeProduct (workshopId, productId) {
            const { response, ok } = await API.Req('DELETE', `/api/workshops/${workshopId}/products/${productId}`)
            if (ok) {
                const workshopIndex = this.workshops.findIndex(workshop => workshop.id === workshopId)
                if (workshopIndex !== -1) {
                    const productIndex = this.workshops[workshopIndex].items.findIndex(item => item.product.id === productId)
                    if (productIndex !== -1) {
                        // Remove the product from the workshop
                        this.workshops[workshopIndex].items.splice(productIndex, 1)
                    }
                }
            } else {
                throw new Error(response.message)
            }
        }
    }
})
