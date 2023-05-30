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
}
