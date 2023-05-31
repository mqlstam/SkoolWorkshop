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

            await controller.getAll({}, res)
            expect(db.product.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(products)).to.be.true
        })

        it('should return 404 if no products are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { findMany: sinon.stub().returns([]) } }
            const controller = new ProductController(db)

            try {
                await controller.getAll({}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('no products found')
                expect(db.product.findMany.calledOnce).to.be.true
            }
        })
    })

    describe('post', () => {
        it('should post a new product', async () => {
            const req = {
                body: { name: 'Product 3', stock: 100, minStock: 10 }
            }

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { product: { create: sinon.stub().returns(req.body) } }
            const controller = new ProductController(db)

            await controller.post(req, res)

            expect(db.product.create.calledOnce).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true
            expect(res.send.calledOnceWith(req.body)).to.be.true
        })
    })

    it('should return 400 if product name is already taken', async () => {
        const error = new Error()
        error.code = 'P2002'

        const product = { ...products[0] }
        const req = {
            body: product
        }

        delete req.body.id

        const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
        const db = { product: { create: sinon.stub().throws(error) } }
        const controller = new ProductController(db)

        try {
            await controller.post(req, res)
            expect.fail('should have thrown an error')
        } catch (error) {
            expect(db.product.create.called).to.be.true
            expect(error.message).to.equal('Product already exists.')
            expect(error.status).to.equal(400)
        }
    })

    describe('put', () => {
        it('should successfully edit a product', async () => {
            const req = {
                params: { id: 1 },
                body: { name: 'Updated Product', stock: 150, minStock: 15 }
            }

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = {
                product: {
                    update: sinon.stub().returns(req.body)
                }
            }
            const controller = new ProductController(db)

            await controller.put(req, res)

            expect(db.product.update.calledOnceWith({
                where: { id: 1 },
                data: { name: 'Updated Product', stock: 150, minStock: 15 }
            })).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(req.body)).to.be.true
        })
    })
})
