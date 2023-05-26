import * as dotenv from 'dotenv'

import express from 'express'
import { WorkshopController } from './controller/WorkshopController.js'
import { ProductController } from './controller/ProductController.js'
import { PrismaClient } from '@prisma/client'
dotenv.config()

const db = new PrismaClient()
const workshopController = new WorkshopController(db)
const productController = new ProductController(db)

const app = express()
    .get('/api/workshops', (req, res) => workshopController.get(req, res))
    .get('/api/products', (req, res) => productController.get(req, res))

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
