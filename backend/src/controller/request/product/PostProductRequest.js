import { Request } from '../Request.js'

export class PostProductRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'stock', 'minStock'],
        properties: {
            name: { type: 'string' },
            stock: { type: 'number' },
            minStock: { type: 'number' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
