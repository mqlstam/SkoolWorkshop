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
            const product = this.products.find(item => item.id === id)
            if (product) return product

            try {
                const { data } = await axios.get(`/api/products/${id}`)
                this.products.push(data)
                return data
            } catch (err) {
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

        search (query) {
            return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        },

        findCode (code) {
            return this.products.find(product => product.code === code)
        }
    }
})
