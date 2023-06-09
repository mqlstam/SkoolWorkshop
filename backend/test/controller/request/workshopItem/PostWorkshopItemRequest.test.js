import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PostWorkshopItemRequest } from '../../../../src/controller/request/workshopItem/PostWorkshopItemRequest.js'

describe('controller/request/workshop/PostWorkshopItemRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                workshopId: 1,
                productId: 1,
                quantity: 10
            }
        }

        const data = new PostWorkshopItemRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
