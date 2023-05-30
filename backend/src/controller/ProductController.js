export class ProductController {
    constructor (db) {
        this.db = db
    }

    async get (req, res) {
        const products = await this.db.product.findMany()
        if (!products.length) {
            res.status(404).send({ message: 'No products found' })
            return
        }

        res.status(200).send(products)
    }

    async delete (req, res) {
        const productId = req.params.id;
        try {
            await this.db.product.delete({
                where: {
                    id: parseInt(productId)
                }
            })
            res.status(200).send({message: `Product with ID ${productId} removed`})
        } catch (err) {
            if(err.meta.cause === 'Record to delete does not exist.') {
                res.status(404).send({ message: `Product with ID  ${productId} not found`})
            }
        }
    }
}
