import {PrismaClient} from "@prisma/client";

import { HttpError } from './error/HttpError.js'

export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async get (req, res) {
        const workshops = await this.db.workshop.findMany()
        if (!workshops.length) {
            throw new HttpError(404, 'no workshops found')
        }

        res.status(200).send(workshops)
    }

    async delete (req, res) {
        const workshopId = req.params.id
        try {
            const deletedWorkshop = await this.db.workshop.delete({
                where: {
                    id: parseInt(workshopId)
                }
            })
            res.status(200).send({ message: `Workshop with ID ${workshopId} removed`, data: deletedWorkshop })
        } catch (err) {
            res.status(404).send({ message: `Workshop with ID  ${workshopId} not found` })
        }
    }

    async put (req, res) {
        const workshopId = req.params.id
        const updatedData = req.body
        try {
            const updatedWorkshop = await this.db.workshop.update({
                where: {
                    id: parseInt(workshopId)
                },
                data: {
                    name: updatedData.name,
                    groupSize: updatedData.groupSize
                }
            })
            res.status(200).send({ message: `Workshop with ID ${workshopId} edited`, data: updatedWorkshop })
        } catch (err) {
            res.status(404).send({ message: `Workshop with ID  ${workshopId} not found` })
        }
    }
}
