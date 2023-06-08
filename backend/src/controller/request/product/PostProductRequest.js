import { Request } from '../Request.js'

export class PostProductRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'stock', 'reusable'],
        properties: {
            name: { type: 'string' },
            stock: { type: 'number' },
            code: { type: ['string', 'null'] },
            reusable: { type: 'boolean' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
