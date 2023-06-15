import { Request } from '../Request.js'

export class CalculateRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        properties: {
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' }
        }
    }

    constructor (req) {
        const currentDate = new Date()
        const nextMonthDate = new Date()
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)

        super({
            startDate: req.query.startDate ?? currentDate.toISOString(),
            endDate: req.query.endDate ?? nextMonthDate.toISOString()
        })
    }
}
