import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ErrorHandler } from '../../src/middleware/ErrorHandler.js'

describe('middleware/ErrorHandler', () => {
    it('should handle errors', async () => {
        const logger = { error: sinon.stub() }
        const err = {
            status: 500,
            message: 'error message',
            stack: 'error stack'
        }
        const req = { ip: '192.168.1.1', method: 'GET', path: '/api/workshops' }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const errorHandler = new ErrorHandler(logger, false)
        await errorHandler.exec(err, req, res, next)

        expect(res.status.calledOnceWith(err.status)).to.be.true
        expect(res.send.calledOnceWith({ error: err.message })).to.be.true
        expect(logger.error.calledOnceWith(req.ip, ' ', req.method, ' ', req.path, '\n', err.stack)).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should hide error messages in production', async () => {
        const logger = { error: sinon.stub() }
        const err = {
            status: 500,
            message: 'error message',
            stack: 'error stack'
        }
        const req = { ip: '192.168.1.1', method: 'GET', path: '/api/workshops' }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const errorHandler = new ErrorHandler(logger, true)
        await errorHandler.exec(err, req, res, next)

        expect(res.status.calledOnceWith(err.status)).to.be.true
        expect(res.send.calledOnceWith({ error: 'internal server error' })).to.be.true
        expect(logger.error.calledOnceWith(req.ip, ' ', req.method, ' ', req.path, '\n', err.stack)).to.be.true
        expect(next.calledOnce).to.be.false
    })
})
