import { defineStore } from 'pinia'
import axios from 'axios'

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        fetched: false,
        calendarItems: []
    }),
    actions: {
        async fetch (force = false) {
            if (this.fetched && !force) return

            try {
                const { data } = await axios.get('/api/calendar')
                this.calendarItems = data
                this.fetched = true
            } catch {
                this.calendarItems = []
            }
        }
    }
})
