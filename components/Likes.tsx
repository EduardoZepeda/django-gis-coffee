import React, { useState, useEffect } from 'react'
import styles from '@styles/likes.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons'
import { useSession } from "next-auth/react"
import { useMutation } from 'react-query'
import { LikeCoffeeShop, UnlikeCoffeeShop } from '@services/coffeeShops'
import Link from 'next/link'

const Likes = ({ liked, likes, id }: LikesProps) => {
    const { data: session } = useSession()
    const [likesNumber, setLikesNumber] = useState<number>(likes?.length || 0)
    if (!session) {
        return (
            <div className={styles.likes}>
                <FontAwesomeIcon size={'lg'} icon={faHeart} />
                {" "}<strong><Link href="/auth/signin">Login to like this shop</Link>
                </strong>
            </div>
        )
    }
    // if session id is in likes' array, set userLikedShop to false, if not to true
    const [userLikedShop, setUserLikedShop] = useState<boolean>(liked)
    const mutation = useMutation(userLikedShop ? UnlikeCoffeeShop : LikeCoffeeShop, {
        onSuccess: () => {
            setLikesNumber(userLikedShop ? likesNumber - 1 : likesNumber + 1)
            setUserLikedShop(!userLikedShop)
        }
    })

    useEffect(() => { }, [userLikedShop, likesNumber])

    return (
        <>
            {likes ? <div onClick={() => mutation.mutate(id)} className={styles.likes}>
                <FontAwesomeIcon size={'lg'} icon={userLikedShop ? faHeart : faEmptyHeart} />
                {" "}<strong>{likesNumber}
                </strong>
            </div> : null}
        </>
    )
}

export default Likes