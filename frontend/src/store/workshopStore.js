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
