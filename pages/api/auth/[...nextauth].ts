import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import fetch from 'isomorphic-fetch'

type User = {
    pk: number
    username: string
    email: string
    first_name: string
    last_name: string
    token: string
}

const options: NextAuthOptions = {
    debug: true,
    session: {},
    jwt: {},
    providers: [Credentials({
        name: 'credentials',
        credentials: {
            username: {
                type: 'text',
                label: 'username'
            },
            password: {
                type: 'password',
                label: 'password'
            }
        },
        async authorize(credentials, req) {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/credentials`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: new Headers({ 'content-type': 'application/json' })
            })
            const user = await res.json()
            // TODO Temporary solution, since api always return 200 checking the username property instead 
            // of checking the http status 
            // Please see: https://github.com/vercel/next.js/issues/46621
            if (res.ok && user && 'username' in user) {
                return user
            }
            return null
        }
    }
    )],
}

export default NextAuth(options)