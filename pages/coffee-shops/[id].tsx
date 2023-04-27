import dynamic from 'next/dynamic';
import Error from '@components/Error';
import Head from 'next/head';
import Likes from '@components/Likes';
import Loader from '@components/Loader';
import React from 'react';
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
import Gallery from '@components/Gallery';
// Prevents window not defined error 
// See more here https://stackoverflow.com/questions/57704196/leaflet-with-next-js
const CoffeeDetailMap = dynamic(
    () => import('@components/CoffeeDetailMap'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
)


const CoffeeShop = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { data, error, isLoading } = useQuery<CoffeeShopEntity>({
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
        const { id, geometry: { coordinates }, properties: { name, address, roaster, content, rating, likes, url, liked, reviewed } }: CoffeeShopEntity = data
        return (
            <section className={styles.detail}>
                <Head>
                    <title>Tamper | {name}</title>
                </Head>
                <h2>{name}</h2>
                <div className={styles.info}>
                    <Gallery />
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

                <div className={styles.map}>
                    <h2>Coffee shop location</h2>
                    <CoffeeDetailMap lat={coordinates[1]} lng={coordinates[0]} />
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
            </section>
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