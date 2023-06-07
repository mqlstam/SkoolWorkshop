import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { AuthMiddleware } from '../../src/middleware/AuthMiddleware.js'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = '{secret}'
describe('middleware/AuthMiddleware', () => {
    it('should reject requests without authorization header', async () => {
        const req = { headers: {} }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnceWith(401)).to.be.true
        expect(res.send.calledOnceWith({ error: 'authorization required' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should reject requests with an empty authorization header', async () => {
        const req = { headers: { authorization: '' } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnceWith(401)).to.be.true
        expect(res.send.calledOnceWith({ error: 'authorization required' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should reject requests with an invalid authorization header', async () => {
        const req = { headers: { authorization: 'Bearer  ' } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnceWith(401)).to.be.true
        expect(res.send.calledOnceWith({ error: 'authorization required' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should reject requests with an invalid token', async () => {
        const token = jwt.sign({ id: 1, role: 'admin' }, 'test')
        const req = { headers: { authorization: `Bearer ${token}` } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnceWith(401)).to.be.true
        expect(res.send.calledOnceWith({ error: 'invalid token' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should reject requests with an expired token', async () => {
        const token = jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '-1s' })
        const req = { headers: { authorization: `Bearer ${token}` } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnceWith(401)).to.be.true
        expect(res.send.calledOnceWith({ error: 'invalid token' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should reject requests from accounts with insufficient permissions', async () => {
        const token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '10m' })
        const req = { headers: { authorization: `Bearer ${token}` } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate(['admin'])(req, res, next)

        expect(res.status.calledOnceWith(403)).to.be.true
        expect(res.send.calledOnceWith({ error: 'access denied' })).to.be.true
        expect(next.calledOnce).to.be.false
    })

    it('should accept valid tokens', async () => {
        const token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '10m' })
        const req = { headers: { authorization: `Bearer ${token}` } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate()(req, res, next)

        expect(res.status.calledOnce).to.be.false
        expect(res.send.calledOnce).to.be.false
        expect(next.calledOnce).to.be.true
    })

    it('should accept valid tokens that include permissions', async () => {
        const token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '10m' })
        const req = { headers: { authorization: `Bearer ${token}` } }
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const next = sinon.stub()

        const authMiddleware = new AuthMiddleware()
        authMiddleware.validate(['admin', 'user'])(req, res, next)

        expect(res.status.calledOnce).to.be.false
        expect(res.send.calledOnce).to.be.false
        expect(next.calledOnce).to.be.true
    })
})
