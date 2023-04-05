import { useForm, SubmitHandler } from "react-hook-form";
import styles from '@styles/forms.module.css'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from 'react-query'
import { registerUser } from '@services/users'
import { useRouter } from 'next/navigation'

const newUserSchema = z.object({
    username: z.string().max(150).min(1),
    password1: z.string().min(8),
    password2: z.string(),
    email: z.string().email(),
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
})

type NewUserType = {
    username: string
    email: string,
    password1: string,
    password2: string,
};

export default function Register() {
    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<NewUserType>(
        { resolver: zodResolver(newUserSchema) }
    )

    const mutation = useMutation(registerUser, {
        onSuccess: () => {
            push("/auth/signin")
        }
    })

    const onSubmit: SubmitHandler<NewUserType> = data => {
        mutation.mutate(data)
    }


    return (
        <>
            <h2>Register an account</h2>
            {mutation.isError ? <div className={styles.requestError}>Some error ocurred</div> : null}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    id={"username"}
                    className={`${styles.input} ${errors.username ? styles.inputError : styles.inputValid}`}
                    defaultValue="" {...register("username", { required: true })}
                    placeholder="Username" />
                <span className={styles.inputErrorMessage}>{errors.username?.message}</span>


                {/* Email */}
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


                {/* Password */}
                <label className={styles.label} htmlFor="password">Password</label>
                <input
                    id={"password"}
                    className={`${styles.input} ${errors.password1 ? styles.inputError : styles.inputValid}`}
                    defaultValue="" {...register("password1",
                        {
                            required: true,
                            minLength: 8,
                        })}
                    placeholder="Password" />
                <span className={styles.inputErrorMessage}>{errors.password1?.message}</span>


                {/* password2 */}
                <label className={styles.label} htmlFor="password2">Password Confirmation</label>
                <input
                    id={"password2"}
                    className={`${styles.input} ${errors.password2 ? styles.inputError : styles.inputValid}`}
                    defaultValue="" {...register("password2", { required: true })} placeholder="Password confirmation" />
                <span className={styles.inputErrorMessage}>{errors.password2?.message}</span>

                {/* Submit */}
                <button className={styles.submit} type="submit" disabled={mutation.isLoading} > Register</button>
            </form >
        </>
    );
}