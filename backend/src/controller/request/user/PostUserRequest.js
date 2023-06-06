import { Request } from '../Request.js'

export class PostUserRequest extends Request {
    schema = {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'password', 'role'],
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
