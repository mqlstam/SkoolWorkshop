import { HttpError } from './error/HttpError.js'
import { PostWorkshopItemRequest } from './request/workshopItem/PostWorkshopItemRequest.js'
import { PutWorkshopItemRequest } from './request/workshopItem/PutWorkshopItemRequest.js'

export class WorkshopItemController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
        const workshopItems = await this.db.workshopItem.findMany()
        if (!workshopItems.length) {
            throw new HttpError(404, 'no workshopItems found')
        }

        res.status(200).send(workshopItems)
    }

    async get (req, res) {
        const id = req.params.id
        const workshopItem = await this.db.workshopItem.findUnique({
            where: { id: parseInt(id) }
        })

        if (!workshopItem) {
            throw new HttpError(404, 'workshopItem not found')
        }

        res.status(200).send(workshopItem)
    }

    async post (req, res) {
        const workshopItem = new PostWorkshopItemRequest(req).data()

        try {
            const result = await this.db.workshopItem.create({
                data: workshopItem
            })
            res.status(201).send(result)
        } catch (err) {
            if (err.code === 'P2002') {
                throw new HttpError(400, 'workshopItem already exists')
            }
            throw new HttpError(500, 'could not create workshopItem')
        }
    }

    async put (req, res) {
        const id = req.params.id
        const workshopItem = new PutWorkshopItemRequest(req).data()

        try {
            const result = await this.db.workshopItem.update({
                where: { id: parseInt(id) },
                data: workshopItem
            })

            res.status(200).send(result)
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'workshopItem not found')
            }
            throw new HttpError(500, 'could not edit workshopItem')
        }
    }

    async delete (req, res) {
        const id = req.params.id
        try {
            await this.db.workshopItem.delete({
                where: { id: parseInt(id) }
            })

            res.status(200).send({ message: 'workshopItem removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'workshopItem not found')
            }
            throw new HttpError(500, 'could not delete workshopItem')
        }
    }
}
