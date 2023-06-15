import { Request } from '../Request.js'

export class PostWorkshopRequest extends Request {
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
