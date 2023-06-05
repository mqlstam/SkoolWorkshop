import { Request } from '../Request.js'

export class PutProductRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'stock', 'minStock' , 'code'],
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
