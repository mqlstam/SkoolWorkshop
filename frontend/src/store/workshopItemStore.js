import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkshopItemStore = defineStore('workshopItem', {
    state: () => ({
        cache: {}
    }),
    actions: {
        async byWorkshop (id, force = false) {
            if (this.cache[id] && !force) return this.cache[id]

            try {
                const { data } = await axios.get(`/api/workshops/${id}/items`)
                this.cache[id] = data
                return data
            } catch (err) {
                this.cache[id] = []
                return this.cache[id]
            }
        },

        async create (workshopItem) {
            try {
                const { data } = await axios.post('/api/workshopItems', workshopItem)

                if (this.cache[workshopItem.workshopId]) {
                    this.cache[workshopItem.workshopId].push(data)
                }
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async update (workshopItem, id) {
            try {
                const { data } = await axios.put(`/api/workshopItems/${id}`, workshopItem)

                if (this.cache[workshopItem.workshopId]) {
                    const idx = this.cache[workshopItem.workshopId].findIndex(w => w.id === id)
                    this.cache[workshopItem.workshopId][idx] = data
                }
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        },

        async delete (id) {
            try {
                await axios.delete(`/api/workshopItems/${id}`)

                for (const workshopId in this.cache) {
                    const idx = this.cache[workshopId].findIndex(w => w.id === id)
                    if (idx > -1) {
                        this.cache[workshopId].splice(idx, 1)
                        break
                    }
                }
            } catch (err) {
                throw new Error(err.response.data.error)
            }
        }
    }
})
