import { HttpError } from './error/HttpError.js'
import { LoginRequest } from './request/auth/LoginRequest.js'
import * as argon2 from 'argon2'

/**
 * AuthController provides authentication endpoints.
 * User should login using the /api/auth/login endpoint,
 * then use the /api/auth/token endpoint to refresh the token.
 */
export class AuthController {
    constructor (db, authService) {
        this.db = db
        this.authService = authService
    }

    async login (req, res) {
        const auth = new LoginRequest(req).data()
        const user = await this.db.user.findUnique({
            where: { name: auth.name }
        })

        if (!user || !(await argon2.verify(user.password, auth.password))) {
            throw new HttpError(401, 'invalid credentials')
        }

        const ipaddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const sessionId = await this.authService.generateSession(user, ipaddr)

        res.status(200)
            .cookie('session', sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: this.authService.sessionLifetime,
                path: '/api/auth'
            })
            .send({ token: this.authService.generateToken(user) })
    }

    async token (req, res) {
        const sessionId = req.cookies.session
        if (!sessionId) {
            throw new HttpError(401, 'unauthorized')
        }

        const session = await this.authService.validateSession(sessionId)
        if (!session) {
            throw new HttpError(401, 'unauthorized')
        }

        const ipaddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const newSessionId = await this.authService.refreshSession(session, ipaddr)
        res.status(200)
            .cookie('session', newSessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: this.authService.sessionLifetime,
                path: '/api/auth'
            })
            .send({ token: this.authService.generateToken(session.user) })
    }

    async logout (req, res) {
        const sessionId = req.cookies.session
        if (!sessionId) {
            throw new HttpError(401, 'unauthorized')
        }

        await this.authService.expireSession(sessionId)

        res.status(200)
            .clearCookie('session', { path: '/api/auth' })
            .send({ message: 'logged out' })
    }
}
