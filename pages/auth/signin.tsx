import Link from 'next/link';
import styles from '@styles/forms.module.css';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from 'next/head';
const Signin = ({ csrfToken, providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const { error, registration } = router.query

    if (error) console.log(error, registration);
    return (
        <>
            <Head>
                <title>{`Tamper | Signin`}</title>
                <meta name="description" content={`Login to tamper to find the best speciality coffee shops in Gdl`} />
            </Head>
            <div className={styles.formContainer}>
                <h3>Login</h3>
                {registration === 'success' ? <div className={styles.requestSuccess}>Registration done! Please try to login</div> : null}
                <form className={styles.form} method="post" action="/api/auth/callback/credentials">
                    <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                    <label className={styles.label} htmlFor="username">Username</label>
                    <input id="username" name="username" className={styles.input} placeholder='username' required />
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" className={styles.input} placeholder='password' required />
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
        </>
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