import { PrismaClient } from '@prisma/client'
import { CalendarService } from './calendarService'
import { TimerService } from './timerService'
import nodemailer from 'nodemailer'

const db = new PrismaClient()
const calendarService = new CalendarService(db)
const timerService = new TimerService(db)

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'nlskoolworkshop@gmail.com',
        pass: 'Avans55!'
    }
})

setInterval(async () => {
    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(startDate.getFullYear() + 1)

    const calendar = await calendarService.fetchCalendar(startDate, endDate)
    const requiredStock = await calendarService.calculate(calendar)
    const productsToOrder = await timerService.fetchProductsToOrder(requiredStock)

    let productsToOrderMessage = productsToOrder.map(product => {
        return `Product ID: ${product.id}, Order Quantity: ${product.orderQuantity}`
    }).join('\n')

    const mailOptions = {
        from: 'nlskoolworkshop@gmail.com',
        to: 'info@skoolworkshop.nl',
        subject: 'Products to Order',
        text: productsToOrderMessage
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}, 1000 * 60 * 60)

