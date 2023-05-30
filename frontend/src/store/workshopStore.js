import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        workshops: []
    }),
    actions: {
        async fetchWorkshops () {
            const { response, ok } = await API.Req('GET', '/api/workshops')
            if (ok) this.workshops = response
            else this.workshops = []
        }
    }
})
