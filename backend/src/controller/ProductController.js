import { HttpError } from './error/HttpError.js'
import { PostProductRequest } from './request/product/PostProductRequest.js'
import { PutProductRequest } from './request/product/PutProductRequest.js'

export class ProductController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
        const products = await this.db.product.findMany()
        res.status(200).send(products)
    }

    async get (req, res) {
        const id = req.params.id
        const product = await this.db.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                workshopItems: {
                    include: {
                        workshop: true
                    }
                }
            }
        })
        if (!product) {
            throw new HttpError(404, 'Product not found')
        }
        res.status(200).send(product)
    }

    async post (req, res) {
        const product = new PostProductRequest(req).data()

        try {
            const result = await this.db.product.create({ data: product })
            res.status(201).send(result)
        } catch (err) {
            if (err.code === 'P2002') {
                throw new HttpError(400, 'product already exists')
            }
            throw new HttpError(500, 'could not create product')
        }
    }

    async put (req, res) {
        const id = req.params.id
        const product = new PutProductRequest(req).data()

        try {
            const result = await this.db.product.update({
                where: { id: parseInt(id) },
                data: product
            })

            res.status(200).send(result)
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'product not found')
            }
            throw new HttpError(500, 'could not edit product')
        }
    }

    async delete (req, res) {
        const id = req.params.id
        try {
            await this.db.product.delete({
                where: { id: parseInt(id) }
            })

            res.status(200).send({ message: 'product removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'product not found')
            }
            throw new HttpError(500, 'could not delete product')
        }
    }

    async getCalendarItems (req, res) {
        const productId = Number(req.params.productId)

        // Fetch the associated WorkshopItems
        const workshopItems = await this.db.workshopItem.findMany({
            where: { productId }
        })

        // Fetch the associated Workshops and Calendar items
        const calendarItems = []
        for (const workshopItem of workshopItems) {
            const workshop = await this.db.workshop.findUnique({
                where: { id: workshopItem.workshopId },
                include: { calendar: true }
            })
            calendarItems.push(...workshop.calendar)
        }

        // Send the calendar items to the frontend
        res.json(calendarItems)
    }
}
