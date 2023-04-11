import Link from 'next/link';
import styles from '@styles/forms.module.css';
import Success from '@components/Success';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchPost } from '@fetchUtils/useFetch';
import { reviewCreate } from '@urls/index';
import { useQueryClient } from 'react-query';

const reviewSchema = z.object({
    content: z.string().min(10).max(255),
    recommended: z.boolean(),
    shop: z.string()
})

const ReviewForm = ({ id }: ReviewFormProps) => {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const token = session?.user?.token
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<reviewSchemaType>(
        {
            resolver: zodResolver(reviewSchema),
            defaultValues: {
                recommended: true
            }
        }
    )

    const { mutate, isLoading, isSuccess, isError } = useMutation({
        mutationFn: (data: reviewSchemaType) => fetchPost(reviewCreate(), data, token),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coffeeShops"] })
    })

    const onSubmit: SubmitHandler<reviewSchemaType> = data => {
        mutate(data)
    }

    if (!session) {
        return <Link href="/auth/signin">Login to left a review</Link>
    }

    if (isSuccess) {
        return <Success message={"Your review was published successfully"} />
    }

    return (
        <div className={styles.formContainer}>
            <h3>Post a review</h3>
            {isError ? <div className={styles.requestError}>Some error ocurred</div> : null}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label} htmlFor="content">Content</label>
                <textarea
                    id={"content"}
                    className={`${styles.input} ${errors.content ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("content",
                        {
                            required: true,
                        })}
                    placeholder="Tell us how was your visit" />
                <span className={styles.inputErrorMessage}>{errors.content?.message}</span>

                {/* Contrlled checkbox so icons get rerendered according to checkbox value */}
                <Controller
                    render={({ field }) => (

                        // render check controlled input
                        <><label className={styles.label} htmlFor="recommended">

                            <FontAwesomeIcon
                                className={`${styles.heart} ${field.value ? '' : styles.iconInactive}`}
                                onClick={() => setValue("recommended", true)}
                                size={'2xl'}
                                icon={faHeart} />{" "}
                            <FontAwesomeIcon
                                onClick={() => setValue("recommended", false)}
                                className={`${styles.heart} ${!field.value ? '' : styles.iconInactive}`}
                                size={'2xl'}
                                icon={faHeartBroken} />

                        </label>
                            <input
                                type={"checkbox"}
                                id={"recommended"}
                                defaultChecked={field.value}
                                className={styles.checkBoxRecommended}
                                placeholder="recommended"
                            />
                            <span className={styles.inputErrorMessage}>{errors.recommended?.message}</span></>)}
                    // end render check controlled input

                    name="recommended"
                    control={control}
                    defaultValue={true}
                />

                <input
                    id={"shop"}
                    type={"hidden"}
                    defaultValue={id} {...register("shop",
                        {
                            required: true,
                        })}
                />
                <span className={styles.inputErrorMessage}>{errors.shop?.message}</span>

                <button className={styles.submit} type="submit" disabled={isLoading} >Send review</button>
            </form>
        </div>
    )
}

export default ReviewForm
