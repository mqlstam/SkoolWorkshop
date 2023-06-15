import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { CalendarService } from '../../src/service/CalendarService.js'

describe('service/calendarService', () => {
    describe('fetchCalendar', () => {
        it('should fetch calendar', async () => {
            const db = { calendar: { findMany: sinon.stub() } }

            const calendarService = new CalendarService(db)
            await calendarService.fetchCalendar()

            expect(db.calendar.findMany.calledOnce).to.be.true
        })
    })
})
