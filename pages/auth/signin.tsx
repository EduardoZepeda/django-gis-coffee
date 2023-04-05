import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import styles from '@styles/forms.module.css'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Signin = ({ csrfToken, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const { error } = router.query

    return (
        <div className={styles.formContainer}>
            <h3>Login</h3>
            <form className={styles.form} method="post" action="/api/auth/callback/credentials">
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <label className={styles.label} htmlFor="username">Username</label>
                <input id="username" name="username" className={styles.input} placeholder='username' value={"***REMOVED***"} required />
                <label className={styles.label} htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className={styles.input} value={"***REMOVED***"} placeholder='password' required />
                <Link href={"/auth/password-reset"}>Forgot password?</Link>
                <button type="submit" className={styles.submit}>Login</button>
                {
                    providers &&
                    Object.values(providers).map(provider => {
                        if (provider.name === 'credentials') {
                            return
                        }
                        return (
                            <div key={provider.name} style={{ marginBottom: 0 }}>
                                <button className={styles.submit} onClick={() => signIn(provider.id)} >
                                    Sign in with{' '} {provider.name}
                                </button>
                            </div>
                        )
                    })
                }
            </form>
            {error ? <div className={styles.requestError}>The username and/or the password are not valid!</div> : null}
        </div>
    )
}

export default Signin

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context
    const session = await getSession({ req })
    if (session) {
        return { redirect: { destination: '/' } }
    }
    const providers = await getProviders()
    const csrfToken = await getCsrfToken(context)
    return {
        props: {
            providers,
            csrfToken
        },
    }
}