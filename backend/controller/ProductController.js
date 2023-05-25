export class ProductController {
    constructor(prisma) {
        this.prisma = prisma
    }

    /**
     * GET /products
     */
    async get(req, res) {
        const products = await this.prisma.product.findMany()
        if(!products) {
            res.status(404).send({message: 'No products found'})
            return
        }

        res.status(200).send(products)
    }
}