import { describe, it } from 'mocha'
import { expect } from 'chai'
import {PostUserRequest} from "../../../../src/controller/request/user/PostUserRequest.js"

describe('controller/request/user/PostUserRequest', () => {
    it('should accept valid requests', async () => {
        const req = {
            body: {
                name: 'user',
                password: 'password',
                role: 'admin'
            }
        }

        const data = new PostUserRequest(req).data()
        expect(data).to.deep.equal(req.body)
    })
})
