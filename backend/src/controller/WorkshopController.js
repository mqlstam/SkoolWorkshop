export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async get (req, res) {
        const workshops = await this.db.workshop.findMany()
        if (!workshops.length) {
            res.status(404).send({ message: 'No workshops found' })
            return
        }

        res.status(200).send(workshops)
    }

    async post (req, res) {
        const { name, groupSize } = req.body

        // Data validation
        if (!name || !groupSize) {
            res.status(400).send({ message: 'Workshop name and group size are required.' })
            return
        }

        try {
            const existingWorkshop = await this.db.workshop.findUnique({ where: { name } })
            if (existingWorkshop) {
                res.status(400).send({ message: `Workshop with name ${name} already exists.` })
                return
            }
            console.log(name, groupSize)
            const workshop = await this.db.workshop.create({
                data: { name, groupSize }
            })

            res.status(201).send(workshop)
        } catch (err) {
            // Log error for debugging
            console.error(err)

            res.status(500).send({ message: 'An error occurred while creating the workshop.' })
        }
    }
}
