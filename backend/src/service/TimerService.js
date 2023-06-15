export class TimerService {
    constructor (db) {
        this.db = db
    }

    async fetchProductsToOrder (requiredStock) {
        const productIds = Object.keys(requiredStock)
        const products = await this.db.products.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        const productsToOrder = []
        for (const product of products) {
            const requiredQuantity = requiredStock[product.id].quantity
            if (product.stock < requiredQuantity) {
                productsToOrder.push({
                    ...product,
                    orderQuantity: requiredQuantity - product.stock
                })
            }
        }

        return productsToOrder
    }
}

