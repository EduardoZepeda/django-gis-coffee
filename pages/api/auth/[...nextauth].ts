import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import fetch from 'isomorphic-fetch'
import { loginFrontend } from "@urls/index";

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
            const res = await fetch(loginFrontend, {
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