import { defineStore } from 'pinia'
import { API } from '../util/Api.js'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        workshops: [],
        name: '',
        groupSize: null
    }),
    actions: {
        async fetch () {
            const { response, ok } = await API.Req('GET', '/api/workshops')
            if (ok) this.workshops = response
            else this.workshops = []
        },

        async delete (id) {
            const { response, ok } = await API.Req('DELETE', `/api/workshops/${id}`)
            if (ok) this.workshops = this.workshops.filter(w => w.id !== id)
            else throw new Error(response.message)
        },

        async get (id) {
            const workshop = this.workshops.find(item => item.id === id)
            if (workshop) return workshop

            const { response, ok } = await API.Req('GET', `/api/workshops/${id}`)
            if (ok) {
                this.workshops.push(response)
                return response
            } else throw new Error(response.message)
        },

        async update (data, id) {
            const { response, ok } = await API.Req('PUT', `/api/workshops/${id}`, { body: data })
            if (!ok) {
                throw new Error(response.message)
            }
        },

        setName (name) {
            this.name = name
        },

        setGroupSize (size) {
            this.groupSize = size
        },

        reset () {
            this.name = ''
            this.groupSize = null
        },

        async submitForm (imageRef) {
            console.log(`Submitting form with name ${this.name} and group size ${this.groupSize}`)
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('groupSize', this.groupSize)
            if (imageRef.value?.files[0]) {
                formData.append('image', imageRef.value.files[0])
            }

            const response = await fetch('/api/workshops', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const message = await response.text()
                console.error(`Error creating workshop: ${message}`)
                return
            }

            const createdWorkshop = await response.json()

            // Clear the form
            this.reset()

            // Here you could also add any code to handle the created workshop
            console.log(`Created workshop: ${JSON.stringify(createdWorkshop)}`)
        }
    }
})
