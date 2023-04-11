import React from 'react';
import styles from '@styles/forms.module.css';
import { fetchPost } from '@fetchUtils/useFetch';
import { resetPasswordUrl } from '@urls/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';

const resetPasswordEmail = z.object({
    email: z.string().email(),
})

const PasswordReset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<resetPasswordType>(
        { resolver: zodResolver(resetPasswordEmail) }
    )

    const { mutate, isError, isLoading, isSuccess } = useMutation({
        mutationFn: (data: resetPasswordType) => fetchPost(resetPasswordUrl, data, undefined)
    })

    const onSubmit: SubmitHandler<resetPasswordType> = data => {
        mutate(data)
    }

    return (
        <>
            <Head>
                <title>{`Tamper | Password reset`}</title>
                <meta name="description" content={`Did you forget your tamper's password? enter this link to reset your password`} />
            </Head>
            <div className={styles.formContainer}>
                <h3>Recover password</h3>
                <div>Please write down the mail you used to register, we will send you instructions to reset your password</div>
                {isError ? <div className={styles.requestError}>Some error ocurred</div> : null}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        id={"email"}
                        className={`${styles.input} ${errors.email ? styles.inputError : styles.inputValid}`}
                        defaultValue="" {...register("email",
                            {
                                required: true,
                            })}
                        placeholder="Email" />
                    <span className={styles.inputErrorMessage}>{errors.email?.message}</span>
                    <button className={styles.submit} type="submit" disabled={isLoading || isSuccess} >Send reset password instructions</button>
                </form>
                {isSuccess ? <div className={styles.requestSuccess}>Check your inbox! If the email was correct we will send an email to that address!</div> : null}
            </div>
        </>
    )
}

export default PasswordReset

