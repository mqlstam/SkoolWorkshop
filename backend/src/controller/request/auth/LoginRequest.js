import { Request } from '../Request.js'

export class LoginRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'password'],
        properties: {
            name: { type: 'string' },
            password: { type: 'string' }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
