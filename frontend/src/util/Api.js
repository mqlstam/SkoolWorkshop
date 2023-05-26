export class API {
    /**
     * Req executes a http request and returns the response.
     * @param url http destination url
     * @param token bearer token
     * @param method http method (POST, PUT etc...)
     * @param body body of request
     * @param headers additional headers of request
     * @returns {Promise<{response: *, ok: boolean, status: number}>}
     */
    static async Req (method, url, { body = null, headers = new Headers() } = {}) {
        const response = await fetch(url, { headers, method, body })
        const contentType = response.headers.get('content-type')
        return {
            response: contentType && contentType.indexOf('application/json') !== -1 ? await response.json() : await response.text(),
            ok: response.ok,
            status: response.status
        }
    }
}
