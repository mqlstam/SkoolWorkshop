import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),
    actions: {
        async fetchProducts() {
            const { response, ok } = await API.Req('GET', '/api/products')
            if (ok) this.products = response
            else this.products = []
        },

        async getProduct(id) {
            const { response, ok } = await API.Req('GET', `/api/products/${id}`)
            if (ok) return response
            else this.products = []
        },

        async createProduct(product) {
            const { response, ok } = await API.Req('POST', '/api/products', { body: product })
            console.log('Response:', response, 'OK:', ok)

            if (ok) this.products.push(response)
        },

        async updateProduct(product, id) {
            const { response, ok } = await API.Req('PUT', `/api/products/${id}`, { body: product })
            if (ok) {
                const index = this.products.findIndex(p => p.id === product.id)
                this.products[index] = response
            }
        },

        async delete(id) {
            const { response, ok } = await API.Req('DELETE', `/api/products/${id}`)
            if (ok) this.products = this.products.filter(w => w.id !== id)
            else throw new Error(response.message)
        },
    }
})

