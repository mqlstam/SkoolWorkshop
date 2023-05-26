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
}
