import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PostWorkshopRequest } from '../../../../src/controller/request/workshop/PostworkshopRequest.js'

describe('controller/request/workshop/PostworkshopRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'workshop 1',
                groupSize: 10
            }
        }

        const data = new PostWorkshopRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
