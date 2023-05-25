export class WorkshopController {
    constructor(prisma) {
        this.prisma = prisma
    }

    /**
     * GET /workshops
     */
    async get(req, res) {
        const workshops = await this.prisma.workshop.findMany()
        if(!workshops) {
            res.status(404).send({message: 'No workshops found'})
            return
        }

        res.status(200).send(workshops)
    }
}