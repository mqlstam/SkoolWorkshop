import jwt from 'jsonwebtoken'

/**
 * AuthMiddleware validates the JWT token and
 * sets the decoded token in the request object.
 * It rejects requests with no or invalid tokens.
 */
export class AuthMiddleware {
    validate (roles = null) {
        return (req, res, next) => {
            const token = (req.headers.authorization ?? '').split(' ')[1]
            if (!token) {
                res.status(401).send({ error: 'authorization required' })
                return
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                if (roles && !roles.includes(decoded.role)) {
                    res.status(403).send({ error: 'access denied' })
                    return
                }

                req.auth = decoded
                next()
            } catch (err) {
                res.status(401).send({ error: 'invalid token' })
            }
        }
    }
}
