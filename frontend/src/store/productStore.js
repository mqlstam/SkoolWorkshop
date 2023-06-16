import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
    state: () => ({
        fetched: false,
        products: []
    }),
    actions: {
        async fetch (force = false) {
            if (this.fetched && !force) return

            try {
                const { data } = await axios.get('/api/products')
                this.products = data
                this.fetched = true
            } catch {
                this.products = []
            }
        },

        async get (id) {
            this.isLoading = true
            const product = this.products.find(item => item.id === id)
            if (product) {
                this.isLoading = false
                return product
            }

            try {
                const { data } = await axios.get(`/api/products/${id}`)
                this.products.push(data)
                this.isLoading = false
                return data
            } catch (err) {
                this.isLoading = false
                throw new Error('Product not found')
            }
        },

        async create (product) {
            try {
                const { data } = await axios.post('/api/products', product)
                this.products.push(data)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async update (product, id) {
            try {
                const { data } = await axios.put(`/api/products/${id}`, product)
                const idx = this.products.findIndex(p => p.id === data.id)
                this.products[idx] = data
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async delete (id) {
            try {
                await axios.delete(`/api/products/${id}`)
                this.products = this.products.filter(w => w.id !== id)
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        getMany (ids) {
            return this.products.filter(item => ids.includes(item.id))
        },

        search (query) {
            return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        },

        findCode (code) {
            return this.products.find(product => product.code === code)
        },
        // in your productStore
        async getCalendarItems (productId) {
            try {
                const { data } = await axios.get(`/api/products/${productId}/calendarItems`)
                return data
            } catch (err) {
                throw new Error('Could not fetch calendar items')
            }
        }

    }
})
