import { HttpError } from './error/HttpError.js'

export class ProductController {
    constructor (db) {
        this.db = db
    }

    async get (req, res) {
        const products = await this.db.product.findMany()
        if (!products.length) {
            throw new HttpError(404, 'no products found')
        }

        res.status(200).send(products)
    }

    async delete (req, res) {
        const productId = req.params.id
        try {
            await this.db.product.delete({
                where: {
                    id: parseInt(productId)
                }
            })
            res.status(200).send({ message: 'Product removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'Product not found')
            }
            throw new HttpError(400, 'Could not delete product')
        }
    }
}
