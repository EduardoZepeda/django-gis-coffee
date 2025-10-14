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
        // TODO Temporary solution, since api always return 200 checking the username property instead 
        // of checking the http status 
        // Please see: https://github.com/vercel/next.js/issues/46621
        // It's supposed to be fixed but I keep seeing the same error
        // Valid credentials
        if (loginRequest.ok) {
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
        // Invalid credentials
        if (loginRequest.status === 400) {
            const data = await loginRequest.json()
            response.json({ "message": data?.non_field_errors.join(", ") })
            response.status(400).end()
            return
        }
        // Default for non-ok and non-400 errors
        response.json(apiError)
        response.status(loginRequest.status).end()
        return
    } catch (err) {
        response.json(err);
        response.status(500).end();
        return
    }
}

export default credentials