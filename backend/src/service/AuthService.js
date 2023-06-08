import { randomBytes, createHash } from 'crypto'
import jwt from 'jsonwebtoken'

/**
 * AuthService provides methods for generating, validating,
 * and expiring sessions and generating tokens. It is used by
 * the AuthController.
 */
export class AuthService {
    sessionSize = 64 // 64 bytes
    sessionLifetime = 604800000 // 7 days in milliseconds
    accessTokenLifetime = '10m'

    constructor (db) {
        this.db = db
    }

    async generateSession (user, ipaddr) {
        const sessionId = randomBytes(this.sessionSize).toString('base64url')
        const hash = createHash('sha256').update(sessionId).digest('base64url')
        await this.db.session.create({
            data: {
                id: hash,
                created: new Date(),
                expires: new Date(Date.now() + this.sessionLifetime),
                ipaddr,
                user: { connect: { id: user.id } }
            }
        })
        return sessionId
    }

    async validateSession (sessionId) {
        const hash = createHash('sha256').update(sessionId).digest('base64url')
        const session = await this.db.session.findUnique({
            where: { id: hash },
            include: { user: true }
        })

        if (!session || session.expires < new Date()) {
            return null
        }

        return session
    }

    async refreshSession (session, ipaddr) {
        const sessionId = randomBytes(this.sessionSize).toString('base64url')
        const hash = createHash('sha256').update(sessionId).digest('base64url')
        await this.db.session.update({
            where: { id: session.id },
            data: {
                id: hash,
                ipaddr,
                expires: new Date(Date.now() + this.sessionLifetime)
            }
        })
        return sessionId
    }

    async expireSession (sessionId) {
        const hash = createHash('sha256').update(sessionId).digest('base64url')
        await this.db.session.update({ where: { id: hash }, data: { expires: new Date() } })
    }

    generateToken ({ id, role }) {
        return jwt.sign(
            { id, role },
            process.env.JWT_SECRET,
            { expiresIn: this.accessTokenLifetime }
        )
    }
}
