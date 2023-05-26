export class ProductController {
    /**
     * GET /products
     */
    get(req, res) {
        res.status(200).send([
            {name: "Graffiti", variants: [{variant: "Zwart", stock: 2}, {variant: "Wit", stock: 20}], minStock: 10},
            {name: "Graffiti", variants: [{variant: "Blauw", stock: 35}, {variant: "Rood", stock: 12}], minStock: 10},
        ])
    }
}