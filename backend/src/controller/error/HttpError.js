/**
 * HttpError represents an error with a status code. It is used
 * to send errors to the client.
 */
export class HttpError extends Error {
    constructor (status, message, data = null) {
        super(message)
        this.status = status
        this.data = data
    }
}
