import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { UserController } from '../../src/controller/UserController.js'

describe('controller/UserController', () => {
    const users = [
        { id: 1, name: 'admin', password: 'password', role: 'admin' },
        { id: 2, name: 'user', password: 'password', role: 'user' }
    ]

    describe('all', () => {
        it('should return a list of users', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { findMany: sinon.stub().returns(users) } }
            const controller = new UserController(db)

            await controller.all({}, res)
            expect(db.user.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(users.map(({ password, ...user }) => user))).to.be.true
        })

        it('should return 404 if no users are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { findMany: sinon.stub().returns([]) } }
            const controller = new UserController(db)

            try {
                await controller.all({}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('no users found')
                expect(db.user.findMany.calledOnce).to.be.true
            }
        })
    })

    describe('get', () => {
        it('should return a specific user', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { findUnique: sinon.stub().returns(users[0]) } }
            const controller = new UserController(db)

            await controller.get({ params: 1 }, res)
            expect(db.user.findUnique.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true

            const { password, ...result } = users[0]
            expect(res.send.calledOnceWith(result)).to.be.true
        })

        it('should return 404 if no user is found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { findUnique: sinon.stub().returns(null) } }
            const controller = new UserController(db)

            try {
                await controller.get({ params: 1 }, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('user not found')
                expect(db.user.findUnique.calledOnce).to.be.true
            }
        })
    })

    describe('post', () => {
        it('should create a new user', async () => {
            const req = { body: users[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { create: sinon.stub().returns(users[0]) } }
            const controller = new UserController(db)

            await controller.post(req, res)
            expect(db.user.create.calledOnce).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true

            const { password, ...result } = users[0]
            expect(res.send.calledOnceWith(result)).to.be.true
        })

        it('should return 400 when there is a conflict', async () => {
            const error = new Error()
            error.code = 'P2002'

            const req = { body: users[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { create: sinon.stub().throws(error) } }
            const controller = new UserController(db)

            try {
                await controller.post(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.user.create.calledOnce).to.be.true
                expect(err.message).to.equal('user already exists')
                expect(err.status).to.equal(400)
            }
        })
    })

    describe('put', () => {
        it('should update a user', async () => {
            const user = { ...users[0], name: 'User 1 updated' }
            const req = { params: { id: 1 }, body: user }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { update: sinon.stub().returns(user) } }
            const controller = new UserController(db)

            await controller.put(req, res)
            expect(db.user.update.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true

            const { password, ...result } = user
            expect(res.send.calledOnceWith(result)).to.be.true
        })

        it('should return 404 when a user does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const user = { ...users[0], name: 'Workshop 1 updated' }
            const req = { params: { id: 1 }, body: user }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { update: sinon.stub().throws(error) } }
            const controller = new UserController(db)

            try {
                await controller.put(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.user.update.calledOnce).to.be.true
                expect(err.message).to.equal('user not found')
                expect(err.status).to.equal(404)
            }
        })
    })

    describe('delete', () => {
        it('should delete a user', async () => {
            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { delete: sinon.stub() } }
            const controller = new UserController(db)

            await controller.delete(req, res)
            expect(db.user.delete.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ message: 'user removed' })).to.be.true
        })

        it('should return 404 when a user does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { user: { delete: sinon.stub().throws(error) } }
            const controller = new UserController(db)

            try {
                await controller.delete(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.user.delete.calledOnce).to.be.true
                expect(err.message).to.equal('user not found')
                expect(err.status).to.equal(404)
            }
        })
    })
})
