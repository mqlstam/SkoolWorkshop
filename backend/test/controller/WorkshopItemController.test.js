import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { WorkshopItemController } from '../../src/controller/WorkshopItemController.js'

describe('controller/WorkshopItemController', () => {
    const workshopItems = [
        { id: 1, workshopId: 1, productId: 1, quantity: 10 },
        { id: 2, workshopId: 1, productId: 2, quantity: 20 }
    ]

    describe('all', () => {
        it('should return a list of workshopItems', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { findMany: sinon.stub().returns(workshopItems) } }
            const controller = new WorkshopItemController(db)

            await controller.all({}, res)
            expect(db.workshopItem.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshopItems)).to.be.true
        })
    })

    describe('get', () => {
        it('should return a specific workshopItem', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { findUnique: sinon.stub().returns(workshopItems[0]) } }
            const controller = new WorkshopItemController(db)

            await controller.get({ params: 1 }, res)
            expect(db.workshopItem.findUnique.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshopItems[0])).to.be.true
        })

        it('should return 404 if no workshopItem is found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { findUnique: sinon.stub().returns(null) } }
            const controller = new WorkshopItemController(db)

            try {
                await controller.get({ params: 1 }, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('workshopItem not found')
                expect(db.workshopItem.findUnique.calledOnce).to.be.true
            }
        })
    })

    describe('post', () => {
        it('should create a new workshopItem', async () => {
            const req = { body: workshopItems[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { create: sinon.stub().returns(workshopItems[0]) } }
            const controller = new WorkshopItemController(db)

            await controller.post(req, res)
            expect(db.workshopItem.create.calledOnce).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true
            expect(res.send.calledOnceWith(workshopItems[0])).to.be.true
        })

        it('should return 400 when there is a conflict', async () => {
            const error = new Error()
            error.code = 'P2002'

            const req = { body: workshopItems[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { create: sinon.stub().throws(error) } }
            const controller = new WorkshopItemController(db)

            try {
                await controller.post(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.workshopItem.create.calledOnce).to.be.true
                expect(err.message).to.equal('workshopItem already exists')
                expect(err.status).to.equal(400)
            }
        })
    })

    describe('put', () => {
        it('should update a workshopItem', async () => {
            const workshopItem = { ...workshopItems[0], quantity: 1000 }
            const req = { params: { id: 1 }, body: workshopItem }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { update: sinon.stub().returns(workshopItem) } }
            const controller = new WorkshopItemController(db)

            await controller.put(req, res)
            expect(db.workshopItem.update.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshopItem)).to.be.true
        })

        it('should return 404 when a workshopItem does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const workshopItem = { ...workshopItems[0], quantity: 1000 }
            const req = { params: { id: 1 }, body: workshopItem }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { update: sinon.stub().throws(error) } }
            const controller = new WorkshopItemController(db)

            try {
                await controller.put(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.workshopItem.update.calledOnce).to.be.true
                expect(err.message).to.equal('workshopItem not found')
                expect(err.status).to.equal(404)
            }
        })
    })

    describe('delete', () => {
        it('should delete a workshopItem', async () => {
            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { delete: sinon.stub() } }
            const controller = new WorkshopItemController(db)

            await controller.delete(req, res)
            expect(db.workshopItem.delete.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ message: 'workshopItem removed' })).to.be.true
        })

        it('should return 404 when a workshopItem does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshopItem: { delete: sinon.stub().throws(error) } }
            const controller = new WorkshopItemController(db)

            try {
                await controller.delete(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.workshopItem.delete.calledOnce).to.be.true
                expect(err.message).to.equal('workshopItem not found')
                expect(err.status).to.equal(404)
            }
        })
    })
})
