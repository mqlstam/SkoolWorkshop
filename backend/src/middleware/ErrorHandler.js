/**
 * ErrorHandler catches and logs errors and sends them to the client.
 */
export class ErrorHandler {
    constructor (logger, production) {
        this.logger = logger
        this.production = production
    }

    exec (err, req, res, next) {
        const status = err.status || 500
        const response = { error: err.message }

        if (this.production && status === 500) {
            // Hide internal error messages when running in production.
            response.error = 'internal server error'
        }

        if (err.data) {
            response.data = err.data
        }

        this.logger.error(req.ip, ' ', req.method, ' ', req.path, '\n', err.stack)
        res.status(status).send(response)
    }
}
