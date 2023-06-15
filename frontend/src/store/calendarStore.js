import { defineStore } from 'pinia'
import axios from 'axios'

const today = new Date()
const nextMonth = new Date()
nextMonth.setMonth(nextMonth.getMonth() + 1)

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        fetched: false,
        calendarItems: [],
        requiredStock: {},
        startDate: today,
        endDate: nextMonth
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
        },

        async fetchRequiredStock () {
            try {
                const { data } = await axios.get(`/api/calendar/requiredStock?startDate=${this.startDate.toISOString()}&endDate=${this.endDate.toISOString()}`)
                this.requiredStock = data
            } catch {
                this.requiredStock = {}
            }
        },

        async refresh () {
            try {
                await axios.post('/api/calendar/refresh')
                await this.fetch(true)
            } catch {
                throw new Error('failed to refresh calendar')
            }
        }
    }
})
