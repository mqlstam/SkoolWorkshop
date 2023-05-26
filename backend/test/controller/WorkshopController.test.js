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
})
