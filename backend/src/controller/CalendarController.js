import { HttpError } from './error/HttpError.js'
import { CalculateRequest } from './request/calendar/CalculateRequest.js'

export class CalendarController {
    constructor (db, calendarService) {
        this.db = db
        this.calendarService = calendarService
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

    async requiredStock (req, res) {
        const request = new CalculateRequest(req).data()
        const startDate = request.startDate
        const endDate = request.endDate

        const calendar = await this.calendarService.fetchCalendar(startDate, endDate)
        const result = await this.calendarService.calculate(calendar)

        res.status(200).send(result)
    }
}
