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
        async deleteProduct (productId) {
            const { response, ok } = await API.Req('DELETE', '/api/products/' + productId)
        }
    }
})
