import { join } from 'path'

/**
 * UnknownRouteMiddleware handles all unknown routes. It returns
 * an error message or index.html when route is not an API.
 */
export class UnknownRouteMiddleware {
    exec (req, res, next) {
        if (req.path.startsWith('/api')) {
            res.status(404).json({ error: 'API route not found' })
            return
        }

        // always return the index.html when route is not an API.
        // vue-router will direct the user to the correct page.
        res.sendFile(join(process.cwd(), 'public', 'index.html'))
    }
}
