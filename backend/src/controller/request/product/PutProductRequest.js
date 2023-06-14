import { Request } from '../Request.js'

export class PutProductRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'stock', 'reusable'],
        properties: {
            name: { type: 'string' },
            stock: { type: 'number' },
            bufferStock: { type: ['number', 'null'] },
            code: { type: ['string', 'null'] },
            reusable: { type: 'boolean' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
