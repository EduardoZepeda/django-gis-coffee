import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { loginUrl, getCurrentUserUrl } from '@urls/index'

const options: NextAuthOptions = {
    debug: true,
    session: {},
    jwt: {},
    secret: process.env.NEXTAUTH_SECRET,
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
            // Only POST method is valid
            if (req.method !== 'POST') {
                return null
            }
            try {
                const loginRequest = await fetch(loginUrl, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
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
                    return { ...userData, "token": key }
                }
                // Invalid credentials
                if (loginRequest.status === 400) {
                    const data = await loginRequest.json()
                    return null
                }
            } catch (err) {
                return null
            }
            return null
        },
    },
    )],
    callbacks: {
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (user) {
                token.username = user.username
                token.pk = user.pk
                token.token = user.token
            }
            return token;
        },
        async session({ session, token }) {
            /* Step 2: update the session.user based on the token object */
            if (token && session.user) {
                session.user.username = token.username
                session.user.pk = token.pk
                session.user.token = token.token
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    }
}

export default NextAuth(options)