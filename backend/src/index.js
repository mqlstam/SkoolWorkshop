import * as dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import { WorkshopController } from './controller/WorkshopController.js'
import { ProductController } from './controller/ProductController.js'
import { PrismaClient } from '@prisma/client'
import { colorConsole } from 'tracer'
import { AccessLogger } from './middleware/AccessLogger.js'
import { ErrorHandler } from './middleware/ErrorHandler.js'
import { UnknownRouteHandler } from './middleware/UnknownRouteHandler.js'
dotenv.config()

const db = new PrismaClient()
const logger = colorConsole()
const middleware = {
    accessLogger: new AccessLogger(logger),
    errorHandler: new ErrorHandler(logger, process.env.NODE_ENV === 'production'),
    unknownRouteHandler: new UnknownRouteHandler()
}
const controller = {
    workshop: new WorkshopController(db),
    product: new ProductController(db)
}

// Create express app and register middleware.
const app = express()
    .use(express.json())
    .use(express.static('public'))

// Register routes.
app
    .get('/api/workshops', (req, res) => controller.workshop.get(req, res))
    .put('/api/workshops/:id', (req, res) => controller.workshop.put(req, res))
    .delete('/api/workshops/:id', (req, res) => controller.workshop.delete(req, res))
    .get('/api/products', (req, res) => controller.product.get(req, res))
    .delete('/api/products/:id', (req, res) => controller.product.delete(req, res))

// Register error handlers.
app
    .use((err, req, res, next) => middleware.errorHandler.exec(err, req, res, next))
    .use((req, res, next) => middleware.unknownRouteHandler.exec(req, res, next))

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
