import { Request } from '../Request.js'

export class PostProductRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'stock', 'minStock'],
        properties: {
            name: { type: 'string' },
            stock: { type: 'number' },
            minStock: { type: 'number' },
            code: { type: 'string' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
