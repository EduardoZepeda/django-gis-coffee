import NextAuth, { DefaultSession, DefaultUser, Session as S } from "next-auth"
import { JWT } from "next-auth/jwt"


declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        username: string;
        token: string
        pk: number;
    }
}

declare module "next-auth" {
    interface User extends DefaultUser {
        username: string;
        token: string
        pk: number;
    }

    interface Session extends S {
        user?: {
            username: string;
            token: string
            pk: number;
        }
    }
}

