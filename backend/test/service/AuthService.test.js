import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { AuthService } from '../../src/service/AuthService.js'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = '{secret}'
describe('service/authService', () => {
    describe('generateSession', () => {
        it('should store a new random session', async () => {
            const db = { session: { create: sinon.stub() } }
            const user = { id: 1, role: 'user' }
            const ipaddr = '127.0.0.1'

            const authService = new AuthService(db)
            await authService.generateSession(user, ipaddr)

            expect(db.session.create.calledOnceWith({
                data: {
                    id: sinon.match.string,
                    created: sinon.match.date,
                    expires: sinon.match.date,
                    ipaddr,
                    user: { connect: { id: user.id } }
                }
            })).to.be.true
        })

        it('should generate random session ids', async () => {
            const db = { session: { create: sinon.stub() } }
            const user = { id: 1, role: 'user' }
            const ipaddr = '127.0.0.1'

            const authService = new AuthService(db)
            const session1 = await authService.generateSession(user, ipaddr)
            const session2 = await authService.generateSession(user, ipaddr)

            expect(session1).to.be.a('string')
            expect(session2).to.be.a('string')
            expect(session1).to.not.equal(session2)
        })
    })

    describe('validateSession', () => {
        it('should return null if session does not exist', async () => {
            const db = { session: { findUnique: sinon.stub().returns(null) } }
            const authService = new AuthService(db)
            const result = await authService.validateSession('session')
            expect(result).to.be.null
        })

        it('should return null if session is expired', async () => {
            const session = {
                id: 'session',
                created: new Date(Date.now() - 10000),
                expires: new Date(Date.now() - 1000),
                user: { id: 1, role: 'user' }
            }
            const db = { session: { findUnique: sinon.stub().returns(session) } }
            const authService = new AuthService(db)
            const result = await authService.validateSession('session')
            expect(result).to.be.null
        })

        it('should return session if session is valid', async () => {
            const session = {
                id: 'session',
                created: new Date(Date.now() - 10000),
                expires: new Date(Date.now() + 1000),
                user: { id: 1, role: 'user' }
            }
            const db = { session: { findUnique: sinon.stub().returns(session) } }
            const authService = new AuthService(db)
            const result = await authService.validateSession('session')
            expect(result).to.eql(session)
        })
    })

    describe('refreshSession', () => {
        it('should update session with new random session id', async () => {
            const session = {
                id: 'session',
                created: new Date(Date.now() - 10000),
                expires: new Date(Date.now() + 1000),
                user: { id: 1, role: 'user' }
            }
            const db = { session: { update: sinon.stub() } }
            const ipaddr = '127.0.0.1'

            const authService = new AuthService(db)
            await authService.refreshSession(session, ipaddr)

            expect(db.session.update.calledOnceWith({
                where: { id: session.id },
                data: {
                    id: sinon.match.string,
                    expires: sinon.match.date,
                    ipaddr
                }
            })).to.be.true
            expect(db.session.update.firstCall.args[0].data.id).to.not.equal(session.id)
        })
    })

    describe('expireSession', () => {
        it('should update the expiration time of the session', async () => {
            const sessionId = 'session'
            const db = { session: { update: sinon.stub() } }

            const authService = new AuthService(db)
            await authService.expireSession(sessionId)

            expect(db.session.update.calledOnceWith({
                where: { id: sinon.match.string },
                data: { expires: sinon.match.date }
            })).to.be.true
            expect(db.session.update.firstCall.args[0].data.expires).to.be.lessThanOrEqual(new Date())
        })
    })

    describe('generateToken', () => {
        it('should generate a token', async () => {
            const user = { id: 1, role: 'user' }

            const authService = new AuthService()
            const token = await authService.generateToken(user)
            const data = jwt.verify(token, process.env.JWT_SECRET)

            expect(token).to.be.a('string')
            expect(data.id).to.equal(user.id)
            expect(data.role).to.equal(user.role)
        })
    })
})
