import { User } from 'next-auth'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { loginUrl, getCurrentUserUrl } from '@urls/index'

const credentials: NextApiHandler<User> = async (request: NextApiRequest, response: NextApiResponse) => {
    const invalidCredentials = { "message": "invalid credentials" }
    const apiError = { "message": "Something went wrong while trying to login. Please try again later" }
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
        response.json(loginRequest)
        response.status(200).end()
        return
    } catch (err) {
        response.json(err);
        response.status(500).end();
        return
    }
}

export default credentials