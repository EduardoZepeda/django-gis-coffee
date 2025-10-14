import { User } from 'next-auth'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { loginUrl, getCurrentUserUrl } from '@urls/index'

const credentials: NextApiHandler<User> = async (request: NextApiRequest, response: NextApiResponse) => {
    const invalidCredentials = { "message": "invalid credentials" }
    // Only POST method is valid
    if (request.method !== 'POST') {
        response.status(405).end()
        return
    }
    try {
        const loginRequest = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(request.body),
            headers: new Headers({ 'content-type': 'application/json' })
        })
        // Invalid credentials
        if (loginRequest.status !== 200) {
            //TODO Bug, always returns 200 see https://github.com/vercel/next.js/issues/46621
            response.json(invalidCredentials)
            response.status(loginRequest.status).end()
            return
        }
        // Valid credentials
        if (loginRequest.status === 200) {
            const { key } = await loginRequest.json()
            // If user managed to login in server, get its current data from this endpoint using newly adquired token
            const currentUser = await fetch(getCurrentUserUrl, {
                method: 'GET',
                // This route is only for authenticated users, add token to headers
                headers: new Headers({ 'content-type': 'application/json', 'Authorization': `Token ${key}` },)
            })
            const userData = await currentUser.json()
            response.json({ ...userData, "token": key })
            response.status(200).end()
            return
        }
    } catch (err) {
        response.json(err);
        response.status(500).end();
    }
}

export default credentials