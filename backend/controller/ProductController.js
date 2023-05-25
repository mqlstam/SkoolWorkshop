export class ProductController {
    /**
     * GET /products
     */
    get(req, res) {
        res.status(200).send([
            {name: "Graffiti Black", stock: 25, minStock: 10},
            {name: "Graffiti White", stock: 25, minStock: 10}
        ])
    }
}