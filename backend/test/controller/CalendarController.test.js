import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { CalendarController } from '../../src/controller/CalendarController.js'

describe('controller/CalendarController', () => {
    const calendarItems = [
        { id: 1, workshopId: 1, participantCount: 10, dateStart: new Date(), dateEnd: new Date() },
        { id: 2, workshopId: 2, participantCount: 25, dateStart: new Date(), dateEnd: new Date() }
    ]

    describe('all', () => {
        it('should return a list of calendar items', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { calendar: { findMany: sinon.stub().returns(calendarItems) } }
            const controller = new CalendarController(db)

            await controller.all({}, res)
            expect(db.calendar.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(calendarItems)).to.be.true
        })
    })

    describe('get', () => {
        it('should return a specific calendar item', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { calendar: { findUnique: sinon.stub().returns(calendarItems[0]) } }
            const controller = new CalendarController(db, {})

            await controller.get({ params: 1 }, res)
            expect(db.calendar.findUnique.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(calendarItems[0])).to.be.true
        })

        it('should return 404 if no calendar is found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { calendar: { findUnique: sinon.stub().returns(null) } }
            const controller = new CalendarController(db)

            try {
                await controller.get({ params: 1 }, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('calendar not found')
                expect(db.calendar.findUnique.calledOnce).to.be.true
            }
        })
    })

    describe('requiredStock', () => {
        it('should calculate the total amount of needed products', async () => {
            const req = { query: { startDate: '2023-06-15T12:12:00.000Z', endDate: '2023-08-15T12:12:00.000Z' } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const calendarService = {
                fetchCalendar: sinon.stub().returns(calendarItems),
                calculate: sinon.stub().returns({ 1: { quantity: 10 }, 2: { quantity: 25 } })
            }
            const controller = new CalendarController({}, calendarService)

            await controller.requiredStock(req, res)
            expect(calendarService.fetchCalendar.calledOnce).to.be.true
            expect(calendarService.calculate.calledOnceWith(calendarItems)).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({
                1: { quantity: 10 },
                2: { quantity: 25 }
            })).to.be.true
        })
    })
})
