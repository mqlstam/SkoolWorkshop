import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { LoggerMiddleware } from '../../src/middleware/LoggerMiddleware.js'

describe('middleware/LoggerMiddleware', () => {
    it('should log requests', async () => {
        const logger = { log: sinon.stub() }
        const next = sinon.stub()
        const req = { ip: '192.168.1.1', method: 'GET', path: '/api/workshops' }

        const loggerMiddleware = new LoggerMiddleware(logger)
        await loggerMiddleware.exec(req, {}, next)

        expect(logger.log.calledOnceWith(req.ip, ' ', req.method, ' ', req.path)).to.be.true
        expect(next.calledOnce).to.be.true
    })
})
