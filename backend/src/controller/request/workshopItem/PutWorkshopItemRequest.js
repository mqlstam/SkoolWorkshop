import { Request } from '../Request.js'

export class PutWorkshopItemRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['workshopId', 'productId', 'quantity'],
        properties: {
            workshopId: { type: 'number' },
            productId: { type: 'number' },
            people: { type: 'number' },
            quantity: { type: 'number' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
