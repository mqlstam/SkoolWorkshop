import { HttpError } from './error/HttpError.js'

export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async get (req, res) {
        const workshops = await this.db.workshop.findMany()
        if (!workshops.length) {
            throw new HttpError(404, 'no workshops found')
        }

        res.status(200).send(workshops)
    }
}
