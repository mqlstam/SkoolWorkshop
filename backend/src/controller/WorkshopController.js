import { HttpError } from './error/HttpError.js'
import { PutWorkshopRequest } from './request/workshop/PutWorkshopRequest.js'

export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
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

    async get (req, res) {
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

    async put (req, res) {
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

    async delete (req, res) {
        const id = req.params.id
        try {
            await this.db.workshop.delete({
                where: { id: parseInt(id) }
            })

            res.status(200).send({ message: 'workshop removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'workshop not found')
            }
            throw new HttpError(500, 'could not remove workshop')
        }
    }
}
