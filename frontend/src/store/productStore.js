import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),
    actions: {
        async fetchProducts () {
            const { response, ok } = await API.Req('GET', '/api/products')
            if (ok) this.products = response
            else this.products = []
        },
        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/products/${id}`)
            if (ok) this.products = this.products.filter(w => w.id !== id)
            else throw new Error(response.message)
        }
    }
})
