export class CalendarService {
    constructor (db) {
        this.db = db
    }

    async fetchCalendar (startDate, endDate) {
        return await this.db.calendar.findMany({
            where: {
                startDate: { gte: startDate, lte: endDate }
            },
            include: {
                workshop: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            orderBy: [
                { startDate: 'asc' },
                { endDate: 'asc' }
            ]
        })
    }

    async saveCalendar (responseData) {
        await this.db.$transaction([
            this.db.calendar.deleteMany(),
            this.db.calendar.createMany({
                data: responseData
            })
        ])
        return responseData
    }

    async calculate (calendar) {
        if (!calendar.length) {
            return []
        }

        const result = {}
        for (let idx = 0; idx < calendar.length; idx++) {
            const calendarItem = calendar[idx]
            const overlappingCalendarItems = this.overlappingCalendarItems(calendar.slice(idx + 1), calendarItem)

            for (const workshopItem of calendarItem.workshop.items) {
                result[workshopItem.productId] ??= { quantity: 0 }
                const currentQuantity = result[workshopItem.productId].quantity

                if (!workshopItem.product.reusable) {
                    // When product is non-reusable, just add the quantity to the total.
                    result[workshopItem.productId].quantity = currentQuantity + this.neededProductQuantity(
                        workshopItem,
                        calendarItem.participantCount
                    )
                } else {
                    // When product is reusable, find the max required quantity at
                    // any given time. Here we need to take into account the
                    // overlapping calendar items that use the same workshopItem.
                    result[workshopItem.productId].quantity = Math.max(
                        currentQuantity,
                        this.neededReusableProductQuantity(
                            workshopItem,
                            calendarItem.participantCount,
                            overlappingCalendarItems
                        )
                    )
                }
            }
        }

        return result
    }

    neededProductQuantity (workshopItem, participantCount) {
        return Math.ceil(participantCount / workshopItem.people) * workshopItem.quantity
    }

    neededReusableProductQuantity (workshopItem, participantCount, overlappingCalendarItems) {
        // Get all the overlappingCalendar items that use the same product, then
        // sum the total participant count of all those calendar items including
        // the current calendar item.
        const totalParticipantCount = overlappingCalendarItems
            .filter((ci) => ci.workshop.items.find((i) => i.product.id === workshopItem.product.id))
            .reduce((acc, ci) => acc + ci.participantCount, participantCount)

        return this.neededProductQuantity(workshopItem, totalParticipantCount)
    }

    overlappingCalendarItems (calendar, current) {
        const result = []
        for (const calendarItem of calendar) {
            // Loop over all sorted calendar items after current,
            // if startDate of calendarItem is after endDate of current,
            // then calendarItem is not overlapping with current.
            if (calendarItem.startDate > current.endDate) {
                break
            }

            result.push(calendarItem)
        }

        return result
    }
}
