import { Request } from '../Request.js'

export class PutWorkshopRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name'],
        properties: {
            name: { type: 'string' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
