import { Request } from '../Request.js'

export class PutUserRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'role'],
        properties: {
            name: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'enum', enum: ['admin', 'user', 'intern'] }
        }
    }

    constructor (req) {
        super(req.body)
    }
}
