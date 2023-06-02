import { HttpError } from './error/HttpError.js'
import { PutWorkshopRequest } from './request/workshop/PutWorkshopRequest.js'


export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
        const workshops = await this.db.workshop.findMany()
        if (!workshops.length) {
            throw new HttpError(404, 'no workshops found')
        }

        res.status(200).send(workshops)
    }

    async get (req, res) {
        const id = req.params.id
        const workshop = await this.db.workshop.findUnique({
            where: { id: parseInt(id) }
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

    async post (req, res) {
        const { name, groupSize } = req.body

        if (!name || !groupSize) {
            res.status(400).send({ message: 'Name or Groupsize is missing' })
            return
        }

        try {
            const workshop = await this.db.workshop.create({
                data: {
                    name,
                    groupSize: parseInt(groupSize)
                }
            })

            res.status(201).send(workshop)
        } catch (error) {
            console.log(error.code)

            if (error.code === 'P2002') {
                res.status(400).send({ message: `Workshop with name ${name} already exists.` })
            }
        }
    
}
