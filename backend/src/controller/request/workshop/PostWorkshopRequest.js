import { Request } from '../Request.js'

export class PostWorkshopRequest extends Request {
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
