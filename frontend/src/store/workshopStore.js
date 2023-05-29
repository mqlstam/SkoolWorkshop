import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore('workshop', {
    state: () => ({
        name: '',
        groupSize: null
    }),
    actions: {
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
        async submitForm () {
            const response = await fetch('/api/workshops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: this.name, groupSize: this.groupSize })
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
