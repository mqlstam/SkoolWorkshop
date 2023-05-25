import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import {WorkshopController} from "./controller/WorkshopController.js"
import {ProductController} from './controller/ProductController.js'

const app = express()
const port = 3000

const workshopController = new WorkshopController()
const productController = new ProductController()

app.get('/workshops', (req, res) => workshopController.get(req, res))
   .get('/products', (req, res) => productController.get(req, res))

app.listen(port, () => console.log(`listening on port ${port}`))
