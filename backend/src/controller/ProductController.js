export class ProductController {
    constructor(db) {
        this.db = db
    }

    async get(req, res) {
        const products = await this.db.product.findMany()
        if(!products.length) {
            res.status(404).send({message: 'No products found'})
            return
        }

        res.status(200).send(products)
    }
}