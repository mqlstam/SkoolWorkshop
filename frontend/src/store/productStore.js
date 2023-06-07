import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useProductStore = defineStore('product', {
    state: () => ({
        fetched: false,
        products: []
    }),
    actions: {
        async fetch (force = false) {
            if (this.fetched && !force) return

            const { response, ok } = await API.Req('GET', '/api/products')
            if (ok) {
                this.products = response
                this.fetched = true
            } else {
                this.products = []
            }
        },

        async get (id) {
            const product = this.products.find(item => item.id === id)
            if (product) return product

            const { response, ok } = await API.Req('GET', `/api/products/${id}`)
            if (ok) {
                this.products.push(response)
                return response
            } else {
                throw new Error(response.error)
            }
        },

        async create (product) {
            const { response, ok } = await API.Req('POST', '/api/products', { body: product })
            if (ok) {
                this.products.push(response)
            } else {
                throw new Error(response.error)
            }
        },

        async update (data, id) {
            const { response, ok } = await API.Req('PUT', `/api/products/${id}`, { body: data })
            if (ok) {
                const idx = this.products.findIndex(p => p.id === data.id)
                this.products[idx] = response
            } else {
                throw new Error(response.error)
            }
        },

        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/products/${id}`)
            if (ok) {
                this.products = this.products.filter(w => w.id !== id)
            } else {
                throw new Error(response.error)
            }
        },

        search (query) {
            return this.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        },

        findCode (code) {
            return this.products.find(product => product.code === code)
        },

        async addCode (code, productName) {
            await this.update({ code: code }, this.products.find(productName))
            this.products.find(product => product.name === productName).code = code
        }
    }
})
