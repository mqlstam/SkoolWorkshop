import { HttpError } from './error/HttpError.js'

export class CalendarController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
        const calendar = await this.db.calendar.findMany()
        res.status(200).send(calendar)
    }

    async get (req, res) {
        const id = req.params.id
        const calendar = await this.db.calendar.findUnique({
            where: { id: parseInt(id) }
        })

        if (!calendar) {
            throw new HttpError(404, 'calendar not found')
        }

        res.status(200).send(calendar)
    }
}
