export class WorkshopController {
    /**
     * GET /workshops
     */
    get(req, res) {
        res.status(200).send([
            {name: "Graffiti", groupSize: 25},
            {name: "Graffiti", groupSize: 25}
        ])
    }
}