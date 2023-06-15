import { describe, it } from 'mocha'
import { expect } from 'chai'
import { CalculateRequest } from '../../../../src/controller/request/calendar/CalculateRequest.js'

describe('controller/request/calculate/CalculateRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            query: {
                startDate: '2021-01-01T11:11:11.111Z',
                endDate: '2021-01-02T11:11:11.111Z'
            }
        }
        const data = new CalculateRequest(req).data()
        expect(data).to.deep.equal(req.query)
    })

    it('should provide defaults', async () => {
        const currentDate = new Date()
        const nextMonthDate = new Date()
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)

        const data = new CalculateRequest({ query: {} }).data()
        expect(data).to.deep.equal({
            startDate: currentDate.toISOString(),
            endDate: nextMonthDate.toISOString()
        })
    })
})
