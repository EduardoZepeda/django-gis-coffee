import { useState } from 'react';
import styles from '@styles/forms.module.css';
import { fetchPost } from '@fetchUtils/useFetch';
import { registerUserUrl } from '@urls/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newUserSchema = z.object({
    username: z.string().max(150).min(1),
    password1: z.string().min(8),
    password2: z.string(),
    email: z.string().email(),
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
})

export default function Register() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<NewUserType>(
        { resolver: zodResolver(newUserSchema) }
    )

    const { mutate, isError, isLoading, error } = useMutation({
        mutationFn: (data: NewUserType) => fetchPost(registerUserUrl, data, undefined),
        onSuccess: () => {
            router.push({
                pathname: "/auth/signin",
                query: { "registration": "success" }
            })
        },
    })

    const onSubmit: SubmitHandler<NewUserType> = data => {
        mutate(data)
    }


    let registerError: djError

    // Check if unknown type correspond to custom type for error 
    function isDrfRequestError(obj: any): obj is djError {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            'message' in obj &&
            'cause' in obj
        )
    }

    if (isDrfRequestError(error)) {
        registerError = error
    } else {
        registerError = { "message": "", "cause": {} }
    }


    return (
        <>
            <h2>Register an account</h2>
            {isError ? <div className={styles.requestError}>{registerError?.message}</div> : null}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    id={"username"}
                    className={`${styles.input} ${errors.username ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("username", { required: true })}
                    placeholder="Username" />
                <span className={styles.inputErrorMessage}>{errors.username?.message}{registerError?.cause?.username}</span>


                {/* Email */}
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    id={"email"}
                    className={`${styles.input} ${errors.email ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("email",
                        {
                            required: true,
                        })}
                    placeholder="Email" />
                <span className={styles.inputErrorMessage}>{errors.email?.message}{registerError?.cause?.email}</span>


                {/* Password */}
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    id={"password"}
                    type="password"
                    className={`${styles.input} ${errors.password1 ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("password1",
                        {
                            required: true,
                            minLength: 8,
                        })}
                    placeholder="Password" />
                <span className={styles.inputErrorMessage}>{errors.password1?.message}{registerError?.cause?.password1}</span>


                {/* password2 */}
                <label className={styles.label} htmlFor="password2">Password Confirmation</label>
                <input
                    id={"password2"}
                    type="password"
                    className={`${styles.input} ${errors.password2 ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("password2", { required: true })}
                    placeholder="Password confirmation" />
                <span className={styles.inputErrorMessage}>{errors.password2?.message}</span>

                {/* Submit */}
                <button className={styles.submit} type="submit" disabled={isLoading} > Register</button>
            </form >
        </>
    );
}