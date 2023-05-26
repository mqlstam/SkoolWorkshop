import * as dotenv from 'dotenv'
import express from 'express'
import { WorkshopController } from './controller/WorkshopController.js'
import { ProductController } from './controller/ProductController.js'
import { PrismaClient } from '@prisma/client'
import { join } from 'path'
dotenv.config()

const db = new PrismaClient()
const workshopController = new WorkshopController(db)
const productController = new ProductController(db)

const app = express()
    .use(express.json())
    .use(express.static('public'))
    .get('/api/workshops', (req, res) => workshopController.get(req, res))
    .put('/api/workshops/:id', (req, res) => workshopController.put(req, res))
    .delete('/api/workshops/:id', (req, res) => workshopController.delete(req ,res))
    .get('/api/products', (req, res) => productController.get(req, res))


// catch-all routes, always return the index.html when route is not
// an API. vue-router will direct the user to the correct page.
app.all('/api/*', (req, res) => res.status(404).json({ error: 'API route not found' }))
    .get('*', (req, res) => res.sendFile(join(process.cwd(), 'public', 'index.html')))

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
