import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ProductController } from '../../src/controller/ProductController.js'

describe('controller/ProductController', () => {
    const products = [
        { id: 1, name: 'Product 1', stock: 100, minStock: 10 },
        { id: 2, name: 'Product 2', stock: 200, minStock: 20 }
    ]

    describe('get', () => {
        it('should return a list of products', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findMany: sinon.stub().returns(products) } }
            const controller = new ProductController(db)

            await controller.get({}, res)
            expect(db.product.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(products)).to.be.true
        })

        it('should return 404 if no products are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findMany: sinon.stub().returns([]) } }
            const controller = new ProductController(db)

            try {
                await controller.get({}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('no products found')
                expect(db.product.findMany.calledOnce).to.be.true
            }
        })
    })

    describe('delete', () => {
        it('Product not found, return 404', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { delete: sinon.stub() } }
            const controller = new ProductController(db)

            try {
                await controller.delete({ params: 10 }, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('Product not found')
                expect(db.product.delete.calledOnce).to.be.true
            }
        })
    })
})
