import { User } from 'next-auth'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { loginUrl, getCurrentUserUrl } from '@urls/index'

const credtest: NextApiHandler<User> = async (request: NextApiRequest, response: NextApiResponse) => {
    // Only POST method is valid
    if (request.method !== 'POST') {
        response.status(405).end()
        return
    }
    try {
        const result = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(request.body),
            headers: new Headers({ 'content-type': 'application/json' })
        })
        const data = await result.json()
        response.json({ "data": data, "status": "ok" })
        response.status(result.status).end
        return result
    }
    catch (e) {
        response.json({ "error": e })
        response.status(500).end()
        return
    }

}

export default credtest