import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { AuthController } from '../../src/controller/AuthController.js'

describe('controller/AuthController', () => {
    const user = {
        id: 1,
        name: 'test',
        password: '$argon2id$v=19$m=65536,t=3,p=4$4UM+U7fPZUUn4V5ot/rNlA$Pnfbpgwoj/XzRzLrSciRpGtXugs2oRNecCUDOnaIEAM', // 12345
        role: 'admin'
    }

    const session = {
        id: 'sessionId',
        created: new Date(),
        expires: new Date(),
        ipaddr: '127.0.0.1',
        user
    }

    describe('login', () => {
        it('should return 401 if user not found', async () => {
            const db = { user: { findUnique: sinon.stub().returns(null) } }
            const req = { body: { name: 'test', password: '12345' } }

            const controller = new AuthController(db, {})
            try {
                await controller.login(req, {})
                expect.fail('should throw error')
            } catch (err) {
                expect(err.status).to.equal(401)
                expect(err.message).to.equal('invalid credentials')
            }
        })

        it('should return 401 if password is invalid', async () => {
            const db = { user: { findUnique: sinon.stub().returns(user) } }
            const req = { body: { name: 'test', password: 'pass' } }

            const controller = new AuthController(db, {})
            try {
                await controller.login(req, {})
                expect.fail('should throw error')
            } catch (err) {
                expect(err.status).to.equal(401)
                expect(err.message).to.equal('invalid credentials')
            }
        })

        it('should return 200 and a token if credentials are valid', async () => {
            const db = { user: { findUnique: sinon.stub().returns(user) } }
            const authService = {
                generateSession: sinon.stub().returns('sessionId'),
                generateToken: sinon.stub().returns('token')
            }

            const req = {
                body: { name: 'test', password: '12345' },
                headers: [],
                socket: { remoteAddress: '127.0.0.1' }
            }

            const res = {
                cookie: sinon.stub().returnsThis(),
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            }

            const controller = new AuthController(db, authService)
            await controller.login(req, res)

            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ token: 'token' })).to.be.true
            expect(res.cookie.calledOnceWith('session', 'sessionId', sinon.match.object)).to.be.true
        })
    })

    describe('token', () => {
        it('should return 401 if session cookie is not set', async () => {
            const req = { cookies: {} }

            const controller = new AuthController({}, {})
            try {
                await controller.token(req, {})
                expect.fail('should throw error')
            } catch (err) {
                expect(err.status).to.equal(401)
                expect(err.message).to.equal('unauthorized')
            }
        })

        it('should return 401 if session is invalid', async () => {
            const req = { cookies: { session: 'sessionId' } }
            const authService = { validateSession: sinon.stub().returns(null) }

            const controller = new AuthController({}, authService)
            try {
                await controller.token(req, {})
                expect.fail('should throw error')
            } catch (err) {
                expect(err.status).to.equal(401)
                expect(err.message).to.equal('unauthorized')
            }
        })

        it('should return 200, refresh session and return a token when session is valid', async () => {
            const authService = {
                validateSession: sinon.stub().returns(session),
                refreshSession: sinon.stub().returns('sessionId'),
                generateToken: sinon.stub().returns('token')
            }

            const req = {
                headers: [],
                cookies: { session: 'sessionId' },
                socket: { remoteAddress: '127.0.0.1' }
            }

            const res = {
                cookie: sinon.stub().returnsThis(),
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            }

            const controller = new AuthController({}, authService)
            await controller.token(req, res)

            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ token: 'token' })).to.be.true
            expect(res.cookie.calledOnceWith('session', 'sessionId', sinon.match.object)).to.be.true
        })
    })

    describe('logout', () => {
        it('should return 401 if session cookie is not set', async () => {
            const db = { user: { findUnique: sinon.stub() } }
            const req = { cookies: {} }

            const controller = new AuthController(db, {})
            try {
                await controller.logout(req, {})
                expect.fail('should throw error')
            } catch (err) {
                expect(err.status).to.equal(401)
                expect(err.message).to.equal('unauthorized')
            }
        })

        it('should expire session and return 200', async () => {
            const authService = { expireSession: sinon.stub() }
            const req = { cookies: { session: 'sessionId' } }
            const res = {
                status: sinon.stub().returnsThis(),
                clearCookie: sinon.stub().returnsThis(),
                send: sinon.stub()
            }

            const controller = new AuthController({}, authService)
            await controller.logout(req, res)

            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ message: 'logged out' })).to.be.true
            expect(res.clearCookie.calledOnceWith('session')).to.be.true
        })
    })
})
