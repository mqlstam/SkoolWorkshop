import * as dotenv from 'dotenv'
import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { WorkshopController } from './controller/WorkshopController.js'
import { ProductController } from './controller/ProductController.js'
import { PrismaClient } from '@prisma/client'
import { colorConsole } from 'tracer'
import { LoggerMiddleware } from './middleware/LoggerMiddleware.js'
import { ErrorMiddleware } from './middleware/ErrorMiddleware.js'
import { UnknownRouteMiddleware } from './middleware/UnknownRouteMiddleware.js'
import { UserController } from './controller/UserController.js'
import { AuthController } from './controller/AuthController.js'
import { AuthService } from './service/AuthService.js'
import { AuthMiddleware } from './middleware/AuthMiddleware.js'
import { WorkshopItemController } from './controller/WorkshopItemController.js'
import { CalendarController } from './controller/CalendarController.js'
import { CalendarService } from './service/CalendarService.js'
import {BlazorSkoolService} from "./service/BlazorSkoolService.js";
dotenv.config()

const db = new PrismaClient()
const logger = colorConsole()
const service = {
    auth: new AuthService(db),
    calendar: new CalendarService(db),
    blazorSkool: new BlazorSkoolService(db, logger, process.env.BLAZORSKOOL_URL)
}
const middleware = {
    auth: new AuthMiddleware(),
    logger: new LoggerMiddleware(logger),
    error: new ErrorMiddleware(logger, process.env.NODE_ENV === 'production'),
    unknownRoute: new UnknownRouteMiddleware()
}
const controller = {
    auth: new AuthController(db, service.auth),
    workshop: new WorkshopController(db),
    product: new ProductController(db),
    workshopItem: new WorkshopItemController(db),
    user: new UserController(db),
    calendar: new CalendarController(db, service.calendar, service.blazorSkool)
}

// Create express app and register middleware.
const app = express()
    .use(express.json())
    .use(cookieParser())
    .use(express.static('public'))
    .use((req, res, next) => middleware.logger.exec(req, res, next))

// Register routes.
app
    .post('/api/auth/login', (req, res) => controller.auth.login(req, res))
    .post('/api/auth/token', (req, res) => controller.auth.token(req, res))
    .post('/api/auth/logout', (req, res) => controller.auth.logout(req, res))

app
    .get('/api/workshops', middleware.auth.validate(), (req, res) => controller.workshop.all(req, res))
    .post('/api/workshops', middleware.auth.validate(), (req, res) => controller.workshop.post(req, res))
    .get('/api/workshops/:id', middleware.auth.validate(), (req, res) => controller.workshop.get(req, res))
    .put('/api/workshops/:id', middleware.auth.validate(), (req, res) => controller.workshop.put(req, res))
    .delete('/api/workshops/:id', middleware.auth.validate(['admin', 'user']), (req, res) => controller.workshop.delete(req, res))
    .get('/api/workshops/:id/items', middleware.auth.validate(), (req, res) => controller.workshop.items(req, res))
    .get('/api/workshops/:id/calendar', middleware.auth.validate(), (req, res) => controller.workshop.calendar(req, res))

app
    .get('/api/products', middleware.auth.validate(), (req, res) => controller.product.all(req, res))
    .get('/api/products/:id', middleware.auth.validate(), (req, res) => controller.product.get(req, res))
    .post('/api/products', middleware.auth.validate(), (req, res) => controller.product.post(req, res))
    .put('/api/products/:id', middleware.auth.validate(), (req, res) => controller.product.put(req, res))
    .delete('/api/products/:id', middleware.auth.validate(['admin', 'user']), (req, res) => controller.product.delete(req, res))

app
    .get('/api/workshopItems', middleware.auth.validate(), (req, res) => controller.workshopItem.all(req, res))
    .get('/api/workshopItems/:id', middleware.auth.validate(), (req, res) => controller.workshopItem.get(req, res))
    .post('/api/workshopItems', middleware.auth.validate(), (req, res) => controller.workshopItem.post(req, res))
    .put('/api/workshopItems/:id', middleware.auth.validate(), (req, res) => controller.workshopItem.put(req, res))
    .delete('/api/workshopItems/:id', middleware.auth.validate(['admin', 'user']), (req, res) => controller.workshopItem.delete(req, res))

app
    .get('/api/users', middleware.auth.validate('admin'), (req, res) => controller.user.all(req, res))
    .get('/api/users/:id', middleware.auth.validate('admin'), (req, res) => controller.user.get(req, res))
    .post('/api/users', middleware.auth.validate('admin'), (req, res) => controller.user.post(req, res))
    .put('/api/users/:id', middleware.auth.validate('admin'), (req, res) => controller.user.put(req, res))
    .delete('/api/users/:id', middleware.auth.validate('admin'), (req, res) => controller.user.delete(req, res))

app
    .get('/api/calendar', middleware.auth.validate(), (req, res) => controller.calendar.all(req, res))
    .get('/api/calendar/requiredStock', middleware.auth.validate(), (req, res) => controller.calendar.requiredStock(req, res))
    .get('/api/calendar/:id', middleware.auth.validate(), (req, res) => controller.calendar.get(req, res))
    .post('/api/calendar/refresh', middleware.auth.validate(), (req, res) => controller.calendar.refresh(req, res))

// Register error handlers.
app
    .use((err, req, res, next) => middleware.error.exec(err, req, res, next))
    .use((req, res, next) => middleware.unknownRoute.exec(req, res, next))

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`))
