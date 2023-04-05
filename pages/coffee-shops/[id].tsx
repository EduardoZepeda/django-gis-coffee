import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getCoffeeShopById } from '@services/coffeeShops'
import Image from 'next/image'
import Loader from '@components/Loader'
import Error from '@components/Error'
import styles from '@styles/coffeeDetails.module.css'
import RenderStars from '@components/RenderStars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faHeart } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import Likes from '@components/Likes'

const CoffeeShop = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useQuery({
        queryKey: [`coffeesShop-${id}`],
        queryFn: () => getCoffeeShopById(id as string)
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
        const { id, properties: { name, address, roaster, content, rating, likes } }: FeaturesEntity = data
        console.log(data)
        return (
            <>
                <Head>
                    <title>Tamper | {name}</title>
                </Head>
                <h2>{name}</h2>
                <div className={styles.info}>
                    <div>
                        <Image className={styles.image} src={'/cafeteria_1.jpg'} height={300} width={300} alt={'Coffee shop photography'} />
                    </div>
                    <div>
                        {/* Likes */}
                        <Likes likes={likes} id={id} />
                        {/* EndLikes */}

                        {/* address */}
                        <div className={styles.address}>{address}</div>
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


            </>
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