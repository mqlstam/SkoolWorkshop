import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PostProductRequest } from '../../../../src/controller/request/product/PostProductRequest.js'

describe('controller/request/product/PostProductRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'product 1',
                stock: 10,
                minStock: 5
            }
        }

        const data = new PostProductRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})