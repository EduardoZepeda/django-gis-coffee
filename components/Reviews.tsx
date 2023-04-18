import Error from '@components/Error';
import Link from 'next/link';
import Loader from '@components/Loader';
import React, { useId } from 'react';
import styles from '@styles/reviews.module.css';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '@fetchUtils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reviewList } from '@urls/index';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Reviews = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const keyId = useId()
    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", "reviews", id],
        queryFn: () => fetchGet(reviewList({ "shop_id": id }), token),
        enabled: router.isReady && status !== 'loading' && !!session
    })

    if (error) {
        return <Error message="Something went wrong loading your reviews" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (data?.count === 0) {
        return null
    }

    if (data) {
        return (
            <div className={styles.container}>
                <h2>Reviews</h2>
                {data.results.map(({ content, recommended, user: { username, profile_picture } }: ReviewResultsEntity, index: number) => (
                    <div key={`${keyId}-${index}`} className={styles.review}>
                        <Link href={`/users/${username}`}>
                            <div className={styles.author}>
                                <div>
                                    <img loading="lazy" className={styles.profilePicture} src={profile_picture ? profile_picture : '/no-profile-picture.jpg'} alt={`${username} profile picture`} />
                                </div>
                                <div>
                                    <strong>
                                        {username}:
                                    </strong>
                                </div>
                            </div>
                        </Link>
                        <p className={styles.content}>
                            <span className={styles.icon}>
                                <FontAwesomeIcon size={'sm'} icon={recommended ? faHeart : faHeartBroken} />
                            </span>
                            {" "}{content}
                        </p>
                    </div>
                ))
                }
            </div >
        )
    }

    return null

}

export default Reviews