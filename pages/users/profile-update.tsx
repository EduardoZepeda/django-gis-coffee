import Error from '@components/Error';
import Head from 'next/head';
import Loader from '@components/Loader';
import styles from '@styles/forms.module.css';
import { fetchGet } from '@fetchUtils/useFetch';
import { fetchUpdateWithFiles } from '@fetchUtils/useFetch';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import { userDetail } from '@urls/index';
import { useRouter } from 'next/router';
import { userUpdate } from '@urls/index';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 5 MB max size
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const newUserSchema = z.object({
    username: z.string().max(150).min(1),
    bio: z.string().max(250).min(1),
    profile_picture: z
        .any().optional() // if there is no file pass all validations
        .refine((files) => !!files || files?.[0]?.size <= MAX_FILE_SIZE, `Max size is 5MB.`)
        .refine(
            (files) => !!files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})

export default function Register() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const username = session?.user?.username
    const { data, error: queryError, isLoading: queryIsLoading } = useQuery<Profile>({
        queryKey: ["users", username],
        queryFn: () => fetchGet(userDetail(username, {}), token),
        // only execute query after username is present
        enabled: router.isReady && status !== 'loading'
    },
    )


    // Form
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>(
        {
            resolver: zodResolver(newUserSchema),
            defaultValues: {
                username: data?.username || '',
                bio: data?.bio || ''
            }
        }
    )
    // endForm


    const { mutate, isError, isLoading, error } = useMutation({
        mutationFn: (data: FormData) => fetchUpdateWithFiles(userUpdate(username), data, token),
        onSuccess: () => {
            router.push({
                pathname: `/users/${username}`,
                query: { "registration": "success" }
            })
        },
    })


    const convertProfileFormToFormData = (data: ProfileForm): FormData => {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('bio', data.bio)
        if (data.profile_picture && data.profile_picture.length > 0) {
            formData.append('profile_picture', data.profile_picture[0])
        }
        return formData
    }


    const onSubmit: SubmitHandler<ProfileForm> = data => {
        mutate(convertProfileFormToFormData(data))
    }


    let updateError: djError


    if (isDrfRequestError(error)) {
        updateError = error
    } else {
        updateError = { "message": "", "cause": {} }
    }

    // Check if unknown type correspond to custom type for error 
    function isDrfRequestError(obj: any): obj is djError {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            'message' in obj &&
            'cause' in obj
        )
    }


    if (queryIsLoading) {
        return <Loader />
    }

    if (queryError) {
        return <Error message={"There was an error loading your profile, please refresh the page or try again later"} />
    }

    return (
        <>
            <Head>
                <title>{`Tamper | Update`}</title>
                <meta name="description" content={`Update your account profile for the best speciality coffee shop experience`} />
            </Head>
            <h2>Update your profile</h2>
            {isError ? <div className={styles.requestError}>{updateError?.message}</div> : null}
            <form encType="multipart/form-data" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <label className={styles.label} htmlFor="username">Username</label>
                <input
                    id={"username"}
                    className={`${styles.input} ${errors.username ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("username", { required: true })}
                    placeholder="Username" />
                <span className={styles.inputErrorMessage}>{errors.username?.message}{updateError?.cause?.username}</span>


                {/* Bio */}
                <label className={styles.label} htmlFor="bio">Bio</label>
                <textarea
                    id={"bio"}
                    className={`${styles.input} ${errors.bio ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("bio",
                        {
                            required: true,
                        })}
                    placeholder="Bio" />
                <span className={styles.inputErrorMessage}>{errors.bio?.message}{updateError?.cause?.email}</span>

                <input
                    id={"profile_picture"}
                    type='file'
                    className={`${styles.fileInput} ${errors.profile_picture ? styles.inputError : styles.inputValid}`}
                    defaultValue=""
                    {...register("profile_picture", { required: false })}

                />
                <span className={styles.inputErrorMessage}>{errors.profile_picture?.message}{updateError?.cause?.profile_picture}</span>

                {/* Submit */}
                <button className={styles.submit} type="submit" disabled={isLoading} > Update</button>
            </form >
        </>
    );
}