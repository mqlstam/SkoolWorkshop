import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { AccessLogger } from '../../src/middleware/AccessLogger.js'

describe('middleware/AccessLogger', () => {
    it('should log requests', async () => {
        const logger = { log: sinon.stub() }
        const next = sinon.stub()
        const req = { ip: '192.168.1.1', method: 'GET', path: '/api/workshops' }

        const accessLogger = new AccessLogger(logger)
        await accessLogger.exec(req, {}, next)

        expect(logger.log.calledOnceWith(req.ip, ' ', req.method, ' ', req.path)).to.be.true
        expect(next.calledOnce).to.be.true
    })
})
