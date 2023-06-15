export class BlazorSkoolService {
    constructor (db, logger, blazorSkoolUrl) {
        this.db = db
        this.blazorSkoolUrl = blazorSkoolUrl
        this.logger = logger

        this.startDate = new Date()
        this.startDate.setDate(this.startDate.getDate() - 7)
        this.endDate = new Date()
        this.endDate.setMonth(this.endDate.getMonth() + 6)
    }

    async fetchCalendar () {
        const response = await fetch(`${this.blazorSkoolUrl}/api/calendar?startDate=${this.startDate.toISOString()}&endDate=${this.endDate.toISOString()}`)
        if (!response.ok) {
            throw new Error('failed to fetch calendar from BlazorSkool')
        }

        const data = await response.json()
        const workshops = await this.db.workshop.findMany({
            select: {
                id: true,
                name: true
            },
            where: {
                name: {
                    in: [...new Set(data.map((calendar) => calendar.name))]
                }
            }
        })

        return data.reduce((result, calendarItem) => {
            const workshop = workshops.find((workshop) => workshop.name === calendarItem.name)
            if (!workshop) {
                this.logger.warn(`workshop "${calendarItem.name}" not found`)
                return result
            }

            return [
                ...result,
                {
                    participantCount: calendarItem.participantCount,
                    startDate: new Date(calendarItem.startDateTime),
                    endDate: new Date(calendarItem.endDateTime),
                    workshopId: workshop.id
                }
            ]
        }, [])
    }
}
