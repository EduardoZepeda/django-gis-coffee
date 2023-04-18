import React from 'react';
import Router from 'next/router';
import styles from '@styles/forms.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMenuStore } from '@store/menuStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const SearchBar = () => {
    const closeMenu = useMenuStore((state) => state.closeMenu)
    const router = Router
    const searchSchema = z.object({
        query: z.string().min(3).max(255),
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SearchSchemaType>(
        {
            resolver: zodResolver(searchSchema)
        }
    )

    const onSubmit: SubmitHandler<SearchSchemaType> = data => {
        router.push(`/search/${data.query}?page=1`)
        reset()
        closeMenu()
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input
                id={"query"}
                className={`${styles.input} ${errors.query ? styles.inputError : styles.inputValid}`}
                defaultValue=""
                {...register("query",
                    {
                        required: true,
                    })}
                placeholder="Search" />
        </form>
    )
}

export default SearchBar