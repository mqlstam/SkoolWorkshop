import { HttpError } from './error/HttpError.js'
import { PutWorkshopRequest } from './request/workshop/PutWorkshopRequest.js'
import { PostWorkshopRequest } from './request/workshop/PostWorkshopRequest.js'

export class WorkshopController {
    constructor(db) {
        this.db = db
    }

    async all(req, res) {
        const workshops = await this.db.workshop.findMany({
            select: {
                id: true,
                name: true,
                groupSize: true,
                items: {
                    select: {
                        quantity: true,
                        product: true
                    }
                }
            }
        })

        if (!workshops.length) {
            throw new HttpError(404, 'no workshops found')
        }

        res.status(200).send(workshops)
    }

    async get(req, res) {
        const id = req.params.id
        const workshop = await this.db.workshop.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                name: true,
                groupSize: true,
                items: {
                    select: {
                        quantity: true,
                        product: true
                    }
                }
            }
        })

        if (!workshop) {
            throw new HttpError(404, 'workshop not found')
        }

        res.status(200).send(workshop)
    }

    async getProductsWithoutWorkshop(req, res) {
        const workshopId = req.params.id; 
    
        const productsInWorkshop = await this.db.workshopProduct.findMany({
            where: {
                workshopId: parseInt(workshopId),
            },
            select: {
                productId: true
            }
        });
    
        const productIdsInWorkshop = productsInWorkshop.map(wp => wp.productId);
    
        const productsNotInWorkshop = await this.db.product.findMany({
            where: {
                id: {
                    notIn: productIdsInWorkshop
                }
            }
        });
    
        if (!productsNotInWorkshop.length) {
            throw new HttpError(404, 'no products found that are not in this workshop')
        }
    
        res.status(200).send(productsNotInWorkshop);
    }

    async put(req, res) {
        const id = req.params.id
        const workshop = new PutWorkshopRequest(req).data()

        try {
            const result = await this.db.workshop.update({
                where: { id: parseInt(id) },
                data: workshop
            })

            res.status(200).send(result)
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'workshop not found')
            }
            throw new HttpError(500, 'could not edit workshop')
        }
    }

    async delete(req, res) {
        const id = req.params.id
        try {
            await this.db.workshop.delete({ where: { id: parseInt(id) }})

            res.status(200).send({ message: 'workshop removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'workshop not found')
            }
            throw new HttpError(500, 'could not remove workshop')
        }
    }

    async post(req, res) {
        const workshop = new PostWorkshopRequest(req).data()

        try {
            const result = await this.db.workshop.create({ data: workshop })
            res.status(201).send(result)
        } catch (err) {
            if (err.code === 'P2002') {
                throw new HttpError(400, 'workshop already exists')
            }
            throw new HttpError(500, 'could not create workshop')
        }
    }

    async addProduct(req, res) {
        const workshopId = parseInt(req.params.id);
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        
        const workshop = await this.db.workshop.findUnique({ where: { id: workshopId } });
        const product = await this.db.product.findUnique({ where: { id: productId } });

        if (!workshop || !product) {
            return res.status(404).json({ error: 'Workshop or product not found' });
        }

        const workshopProduct = await this.db.workshopProduct.create({
            data: {
                workshopId,
                productId,
                quantity
            }
        });

        return res.status(201).json(workshopProduct);
    }

    async removeProduct(req, res) {
        const workshopId = parseInt(req.params.id);
        const productId = parseInt(req.params.productId);

        const workshopProduct = await this.db.workshopProduct.findFirst({
            where: {
                workshopId,
                productId
            }
        });

        if (!workshopProduct) {
            return res.status(404).json({ error: 'Product not found in the specified workshop' });
        }

        await this.db.workshopProduct.delete({
            where: {
                workshopId,
                productId
            }
        });

        return res.status(200).json({ message: 'Product removed from the workshop' });
    }

}
