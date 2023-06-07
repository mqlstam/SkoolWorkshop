import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { UnknownRouteMiddleware } from '../../src/middleware/UnknownRouteMiddleware.js'
import { join } from 'path'

describe('middleware/UnknownRouteMiddleware', () => {
    it('should return route unknown message for unknown API endpoints', async () => {
        const next = sinon.stub()
        const req = { path: '/api/workshops' }
        const res = { status: sinon.stub().returnsThis(), json: sinon.stub() }

        const unknownRouteMiddleware = new UnknownRouteMiddleware()
        await unknownRouteMiddleware.exec(req, res, next)

        expect(res.status.calledOnceWith(404)).to.be.true
        expect(res.json.calledOnceWith({ error: 'API route not found' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should return index.html for unknown non-api routes', async () => {
        const next = sinon.stub()
        const req = { path: '/products' }
        const res = { sendFile: sinon.stub() }

        const unknownRouteMiddleware = new UnknownRouteMiddleware()
        await unknownRouteMiddleware.exec(req, res, next)

        expect(res.sendFile.calledOnceWith(join(process.cwd(), 'public', 'index.html'))).to.be.true
        expect(next.calledOnce).to.be.false
    })
})
