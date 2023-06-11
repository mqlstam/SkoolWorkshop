import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PutWorkshopItemRequest } from '../../../../src/controller/request/workshopItem/PutWorkshopItemRequest.js'

describe('controller/request/workshop/PutWorkshopItemRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                workshopId: 1,
                productId: 1,
                quantity: 10
            }
        }

        const data = new PutWorkshopItemRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
