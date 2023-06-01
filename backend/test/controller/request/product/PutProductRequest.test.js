import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PutProductRequest } from '../../../../src/controller/request/product/PutProductRequest.js'

describe('controller/request/product/PutProductRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'product 1',
                stock: 10,
                minStock: 5
            }
        }

        const data = new PutProductRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
