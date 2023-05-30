/**
 * AccessLogger logs all requests to the console.
 */
export class AccessLogger {
    constructor (logger) {
        this.logger = logger
    }

    exec (req, res, next) {
        this.logger.log(req.ip, ' ', req.method, ' ', req.path)
        next()
    }
}
