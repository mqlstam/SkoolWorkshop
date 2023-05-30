import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PutWorkshopRequest } from '../../../../src/controller/request/workshop/PutWorkshopRequest.js'

describe('controller/request/workshop/PutWorkshopRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'Workshop 1',
                groupSize: 10
            }
        }

        const data = new PutWorkshopRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
