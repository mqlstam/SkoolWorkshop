import multer from 'multer'

const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1000000 // Limit filesize to 1mb (adjust as necessary)
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

export class WorkshopController {
    constructor (db) {
        this.db = db
    }

    async post (req, res) {
        // Multer middleware for handling file uploads
        upload.single('image')(req, res, async (err) => {
            if (err) {
                res.status(400).send({ message: 'Image upload failed.' })
                return
            }
            // Data validation
            if (!req.body.name || !req.body.groupSize) {
                res.status(400).send({ message: 'Workshop name and group size are required.' })
                return
            }
            try {
                const existingWorkshop = await this.db.workshop.findUnique({ where: { name: req.body.name } })
                if (existingWorkshop) {
                    res.status(400).send({ message: `Workshop with name ${req.body.name} already exists.` })
                    return
                }

                const workshop = await this.db.workshop.create({
                    data: { name: req.body.name, groupSize: parseInt(req.body.groupSize), imagePath: req.file.path }
                })

                res.status(201).send(workshop)
            } catch (err) {
                // Log error for debugging
                console.error(err)
                res.status(500).send({ message: 'An error occurred while creating the workshop.' })
            }
        })
    }
}
