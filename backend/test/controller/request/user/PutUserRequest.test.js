import { describe, it } from 'mocha'
import { expect } from 'chai'
import { PutUserRequest } from '../../../../src/controller/request/user/PutUserRequest.js'

describe('controller/request/user/PutUserRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'user',
                password: 'password',
                role: 'admin'
            }
        }

        const data = new PutUserRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
