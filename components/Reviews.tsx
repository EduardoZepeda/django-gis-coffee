import React, { useId } from 'react'
import styles from '@styles/reviews.module.css'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getCoffeeShopReviewsById } from '@services/coffeeShops'
import Loader from '@components/Loader'
import Error from '@components/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Reviews = () => {
    const router = useRouter()
    const { id } = router.query
    const keyId = useId()
    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", "reviews", id],
        queryFn: () => getCoffeeShopReviewsById(id as string)
    })

    if (error) {
        return <Error message="Something went wrong loading your reviews" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (data.count === 0) {
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