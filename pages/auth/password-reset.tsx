import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import styles from '@styles/forms.module.css'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from 'react-query'
import { resetPassword } from '@services/users'

const resetPasswordEmail = z.object({
    email: z.string().email(),
})

const PasswordReset = () => {
    const [sentEmail, setSentEmail] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<resetPasswordType>(
        { resolver: zodResolver(resetPasswordEmail) }
    )

    const mutation = useMutation(resetPassword, {
        onSuccess: () => {
            setSentEmail(true)
        }
    })

    const onSubmit: SubmitHandler<resetPasswordType> = data => {
        mutation.mutate(data)
    }

    return (
        <div className={styles.formContainer}>
            <h3>Recover password</h3>
            <div>Please write down the mail you used to register, we will send you instructions to reset your password</div>
            {mutation.isError ? <div className={styles.requestError}>Some error ocurred</div> : null}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                    id={"email"}
                    className={`${styles.input} ${errors.email ? styles.inputError : styles.inputValid}`}
                    defaultValue="" {...register("email",
                        {
                            required: true,
                        })}
                    placeholder="Email" />
                <span className={styles.inputErrorMessage}>{errors.email?.message}</span>
                <button className={styles.submit} type="submit" disabled={mutation.isLoading || sentEmail} >Send reset password instructions</button>
            </form>
            {sentEmail ? <div className={styles.requestSuccess}>Check your inbox! If the email was correct we will send an email to that address!</div> : null}
        </div>
    )
}

export default PasswordReset

