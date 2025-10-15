"use server"

import { User } from 'next-auth'
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { loginUrl, getCurrentUserUrl } from '@urls/index'
import { fetchPost } from '@fetchUtils/useFetch'

const credtest: NextApiHandler<User> = async (request: NextApiRequest, response: NextApiResponse) => {
    // Only POST method is valid
    if (request.method !== 'POST') {
        response.status(405).send({})
        return
    }
    try {
        const result = await fetchPost(loginUrl, request.body, undefined)
        response.status(200).send({ "data": result, "status": "ok" })
        return
    }
    catch (e) {
        if (e instanceof Error) {
            response.status(500).send({ "error": { "cause": e?.cause, "message": e?.message, "url": loginUrl.hostname + loginUrl.pathname } })
        }
        return
    }

}

export default credtest