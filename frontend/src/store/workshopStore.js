import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        fetched: false,
        workshops: []
    }),
    actions: {
        async fetch (force = false) {
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
                return response
            } else {
                throw new Error(response.error)
            }
        },

        async fetchProductsNotInWorkshop(workshopId) {
            const { response, ok } = await API.Req('GET', `/api/workshops/${workshopId}/productsNotInWorkshop`);
            if (ok) {
                return response;
            } else {
                throw new Error(response.error);
            }
        },

        async create (workshop) {
            const { response, ok } = await API.Req('POST', '/api/workshops', { body: workshop })
            if (ok) {
                this.workshops.push(response)
            } else {
                throw new Error(response.error)
            }
        },

        async update (data, id) {
            const { response, ok } = await API.Req('PUT', `/api/workshops/${id}`, { body: data })
            if (ok) {
                const idx = this.workshops.findIndex(p => p.id === data.id)
                this.workshops[idx] = response
            } else {
                throw new Error(response.error)
            }
        },

        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/workshops/${id}`)
            if (ok) {
                this.workshops = this.workshops.filter(w => w.id !== id)
            } else {
                throw new Error(response.error)
            }
        },

        search (query) {
            return this.workshops.filter(workshop => workshop.name.toLowerCase().includes(query.toLowerCase()))
        },

        async addProduct(workshopId, productId, quantity) {
            const data = { productId, quantity };
            const { response, ok } = await API.Req('POST', `/api/workshops/${workshopId}/products`, { body: data });
            if (ok) {
              const workshopIndex = this.workshops.findIndex(workshop => workshop.id === workshopId);
              if (workshopIndex !== -1) {
                const productIndex = this.workshops[workshopIndex].items.findIndex(item => item.product.id === productId);
                if (productIndex !== -1) {
                  // Update the quantity if the product already exists in the workshop
                  this.workshops[workshopIndex].items[productIndex].quantity += quantity;
                } else {
                  // Add the product to the workshop if it doesn't already exist
                  this.workshops[workshopIndex].items.push({
                    product: response.product,
                    quantity: response.quantity,
                  });
                }
              }
            } else {
              throw new Error(response.message);
            }
          }
          
          
    }
})
