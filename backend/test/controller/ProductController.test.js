import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ProductController } from '../../src/controller/ProductController.js'

describe('controller/ProductController', () => {
    const products = [
        { id: 1, name: 'Product 1', stock: 100, minStock: 10 },
        { id: 2, name: 'Product 2', stock: 200, minStock: 20 }
    ]

    describe('all', () => {
        it('should return a list of products', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findMany: sinon.stub().returns(products) } }
            const controller = new ProductController(db)

            await controller.all({}, res)
            expect(db.product.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(products)).to.be.true
        })

        it('should return 404 if no products are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findMany: sinon.stub().returns([]) } }
            const controller = new ProductController(db)

            try {
                await controller.all({}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('no products found')
                expect(db.product.findMany.calledOnce).to.be.true
            }
        })
    })

    describe('get', () => {
        it('should return a specific product', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findUnique: sinon.stub().returns(products[0]) } }
            const controller = new ProductController(db)

            await controller.get({ params: 1 }, res)
            expect(db.product.findUnique.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(products[0])).to.be.true
        })

        it('should return 404 if no product is found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findUnique: sinon.stub().returns(null) } }
            const controller = new ProductController(db)

            try {
                await controller.get({ params: 1 }, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('product not found')
                expect(db.product.findUnique.calledOnce).to.be.true
            }
        })
    })

    describe('post', () => {
        it('should create a new product', async () => {
            const req = { body: products[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { create: sinon.stub().returns(products[0]) } }
            const controller = new ProductController(db)

            await controller.post(req, res)
            expect(db.product.create.calledOnce).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true
            expect(res.send.calledOnceWith(products[0])).to.be.true
        })

        it('should return 400 when there is a conflict', async () => {
            const error = new Error()
            error.code = 'P2002'

            const req = { body: products[0] }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { create: sinon.stub().throws(error) } }
            const controller = new ProductController(db)

            try {
                await controller.post(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.product.create.calledOnce).to.be.true
                expect(err.message).to.equal('product already exists')
                expect(err.status).to.equal(400)
            }
        })
    })

    describe('put', () => {
        it('should update a product', async () => {
            const product = { ...products[0], name: 'Product 1 updated' }
            const req = { params: { id: 1 }, body: product }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { update: sinon.stub().returns(product) } }
            const controller = new ProductController(db)

            await controller.put(req, res)
            expect(db.product.update.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(product)).to.be.true
        })

        it('should return 404 when a product does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const product = { ...products[0], name: 'Workshop 1 updated' }
            const req = { params: { id: 1 }, body: product }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { update: sinon.stub().throws(error) } }
            const controller = new ProductController(db)

            try {
                await controller.put(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.product.update.calledOnce).to.be.true
                expect(err.message).to.equal('product not found')
                expect(err.status).to.equal(404)
            }
        })
    })

    describe('delete', () => {
        it('should delete a product', async () => {
            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { delete: sinon.stub() } }
            const controller = new ProductController(db)

            await controller.delete(req, res)
            expect(db.product.delete.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ message: 'product removed' })).to.be.true
        })

        it('should return 404 when a product does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { delete: sinon.stub().throws(error) } }
            const controller = new ProductController(db)

            try {
                await controller.delete(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.product.delete.calledOnce).to.be.true
                expect(err.message).to.equal('product not found')
                expect(err.status).to.equal(404)
            }
        })
    })
})
