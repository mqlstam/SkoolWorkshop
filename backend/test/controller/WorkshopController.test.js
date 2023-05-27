import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { WorkshopController } from '../../src/controller/WorkshopController.js'

describe('WorkshopController', () => {
    const workshops = [
        { id: 1, name: 'Workshop 1', groupSize: 10 },
        { id: 2, name: 'Workshop 2', groupSize: 25 }
    ]

    describe('get', () => {
        it('should return a list of workshops', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns(workshops) } }
            const controller = new WorkshopController(db)

            await controller.get({}, res)
            expect(db.workshop.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshops)).to.be.true
        })

        it('should return 404 if no workshops are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns([]) } }
            const controller = new WorkshopController(db)

            await controller.get({}, res)
            expect(db.workshop.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(404)).to.be.true
            expect(res.send.calledOnceWith({ message: 'No workshops found' })).to.be.true
        })
    })

    describe('post', () => {
        it('should post a new workshop', async () => {
            const req = {
                body: { name: 'Workshop 3', groupSize: 15 }
            }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findUnique: sinon.stub().returns(null), post: sinon.stub().returns(req.body) } }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.calledOnce).to.be.true
            expect(db.workshop.post.calledOnce).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true
            expect(res.send.calledOnceWith(req.body)).to.be.true
        })

        it('should return 400 if workshop name is already taken', async () => {
            const req = {
                body: { name: 'Workshop 1', groupSize: 15 }
            }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findUnique: sinon.stub().returns(workshops[0]), post: sinon.stub() } }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.calledOnce).to.be.true
            expect(db.workshop.post.called).to.be.false
            expect(res.status.calledOnceWith(400)).to.be.true
            expect(res.send.calledOnceWith({ message: `Workshop with name ${req.body.name} already exists.` })).to.be.true
        })

        it('should return 400 if workshop name or groupSize is missing', async () => {
            const req = { body: {} }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findUnique: sinon.stub(), post: sinon.stub() } }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.called).to.be.false
            expect(db.workshop.post.called).to.be.false
            expect(res.status.calledOnceWith(400)).to.be.true
            expect(res.send.calledOnceWith({ message: 'Workshop name and groupSize are required.' })).to.be.true
        })
    })
})
