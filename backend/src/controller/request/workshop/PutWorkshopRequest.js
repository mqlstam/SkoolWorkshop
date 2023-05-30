import { Request } from '../Request.js'

export class PutWorkshopRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'groupSize'],
        properties: {
            name: { type: 'string' },
            groupSize: { type: 'number' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
