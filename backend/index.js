import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {WorkshopController} from "./controller/WorkshopController.js"
import {ProductController} from './controller/ProductController.js'
import {PrismaClient} from "@prisma/client";

const app = express()
const port = 3000

const prisma = new PrismaClient()
const workshopController = new WorkshopController(prisma)
const productController = new ProductController(prisma)

app.get('/api/workshops', (req, res) => workshopController.get(req, res))
   .get('/api/products', (req, res) => productController.get(req, res))

app.listen(port, () => console.log(`listening on port ${port}`))
