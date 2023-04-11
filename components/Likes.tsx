import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '@styles/likes.module.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';
import { fetchDelete, fetchPost } from '@fetchUtils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { likeCreate, likeDestroy } from '@urls/index';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';


const Likes = ({ liked, likes, id }: LikesProps) => {
    const queryClient = useQueryClient()
    const [userLikedShop, setUserLikedShop] = useState<boolean>(liked)
    const [likesNumber, setLikesNumber] = useState<number>(likes?.length || 0)
    const { data: session } = useSession()
    const token = session?.user?.token
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
    const { mutate, isLoading } = useMutation({
        mutationFn: () => (userLikedShop ? fetchDelete(likeDestroy(id.toString()), token) : fetchPost(likeCreate(id.toString()), {}, token)),
        onSuccess: () => {
            setLikesNumber(userLikedShop ? likesNumber - 1 : likesNumber + 1)
            setUserLikedShop(!userLikedShop)
            queryClient.invalidateQueries({ queryKey: ['coffeeShops'] })
        },
    })

    useEffect(() => { }, [userLikedShop, likesNumber])

    return (
        <>
            {likes ? <div onClick={() => { mutate() }} className={styles.likes}>
                <FontAwesomeIcon size={'lg'} icon={userLikedShop ? faHeart : faEmptyHeart} />
                {" "}<strong>{likesNumber}
                </strong>
            </div> : null}
        </>
    )
}

export default Likes