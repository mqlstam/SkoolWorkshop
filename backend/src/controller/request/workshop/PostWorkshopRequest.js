import { Request } from '../Request.js'

export class PostWorkshopRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'groupSize', 'timesPerWeek'],
        properties: {
            name: { type: 'string' },
            groupSize: { type: 'number' },
            timesPerWeek: { type: 'number' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
