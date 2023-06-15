import { HttpError } from './error/HttpError.js'
import { RequiredStockRequest } from './request/calendar/RequiredStockRequest.js'

export class CalendarController {
    constructor (db, calendarService, blazorService) {
        this.db = db
        this.calendarService = calendarService
        this.blazorService = blazorService
    }

    async all (req, res) {
        const calendar = await this.db.calendar.findMany({
            orderBy: {
                startDate: 'asc'
            }
        })
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
        const request = new RequiredStockRequest(req).data()
        const startDate = request.startDate
        const endDate = request.endDate

        const calendar = await this.calendarService.fetchCalendar(startDate, endDate)
        const result = await this.calendarService.calculate(calendar)

        res.status(200).send(result)
    }

    async refresh (req, res) {
        const response = await this.blazorService.fetchCalendar()
        await this.calendarService.saveCalendar(response)
        res.status(200).send({ message: 'calendar refreshed' })
    }
}
