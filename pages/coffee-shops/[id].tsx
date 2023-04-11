import Error from '@components/Error';
import Head from 'next/head';
import Image from 'next/image';
import Likes from '@components/Likes';
import Loader from '@components/Loader';
import React, { useEffect } from 'react';
import RenderStars from '@components/RenderStars';
import ReviewForm from '@components/ReviewForm';
import Reviews from '@components/Reviews';
import styles from '@styles/coffeeDetails.module.css';
import { coffeeDetail } from '@urls/index';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '@fetchUtils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const CoffeeShop = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", id],
        queryFn: () => fetchGet(coffeeDetail(id, {}), token),
        enabled: router.isReady && status !== 'loading'
    })


    if (!id) {
        return null
    }

    if (error) {
        return <Error message={"We couldn't get the data for this coffee Shop. Please try again."} />
    }

    if (isLoading) {
        return <Loader />
    }

    if (data) {
        const { id, properties: { name, address, roaster, content, rating, likes, url, liked, reviewed } }: FeaturesEntity = data
        return (
            <div className={styles.detail}>
                <Head>
                    <title>Tamper | {name}</title>
                </Head>
                <h2>{name}</h2>
                <div className={styles.info}>
                    <div>
                        <Image className={styles.image} src={'/placeholder-coffee-shop.jpg'} height={300} width={300} alt={'Coffee shop photography'} />
                    </div>
                    <div>
                        {/* Likes */}
                        <Likes liked={liked} likes={likes} id={id} />
                        {/* EndLikes */}

                        {/* address */}
                        <div className={styles.address}>{address !== '' ? address : "No address has been provided, yet."}</div>
                        {/* endAddress */}

                        {/* Stars */}
                        <div className={styles.stars}>
                            <RenderStars rating={rating} />
                        </div>
                        {/* endStars */}

                        {/* Roster */}
                        {roaster ? <div className={styles.roaster}>
                            <FontAwesomeIcon icon={faFire} />
                            {" "}<strong>Roaster
                            </strong>
                        </div> : null}
                        {/* EndRoaster */}
                    </div>
                </div>


                {/* Premium review */}
                {content ? (
                    <div className={styles.review}>
                        <h2>Our expert barista review:</h2>
                        <div className={styles.reviewText} dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                ) : null}
                {/* end Premium review */}

                {/* Reviews */}
                <Reviews />
                {/* End Reviews */}

                {reviewed ? null : <ReviewForm id={url} />}
            </div>
        )
    }


}

// export async function getServerSideProps() {
//     const router = useRouter()
//     const { id } = router.query
//     // Fetch data from external API
//     const res = await fetch(`${getCoffeeShopById}${id}`)
//     const data = await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
// }


export default CoffeeShop