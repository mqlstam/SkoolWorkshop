import { validate } from 'jsonschema'
import { HttpError } from '../error/HttpError.js'

/**
 * Request represents a request. It provides request validation.
 * @abstract
 */
export class Request {
    schema = {}

    constructor (req) {
        this.req = req
    }

    data () {
        const result = validate(this.req, this.schema)
        if (result.valid) {
            return this.req
        }

        throw new HttpError(
            400,
            'request is invalid',
            result.errors.map((error) => ({
                property: error.property,
                message: error.message
            }))
        )
    }
}
