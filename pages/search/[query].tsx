import { useId } from 'react'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getCoffeeShopQuery } from '@services/coffeeShops'
import CoffeeCard from '@components/CoffeeCard'
import styles from '@styles/newestAdditions.module.css'
import Loader from '@components/Loader'
import Error from '@components/Error'
import { useRouter } from 'next/router'

export default function SearchCoffeeShops() {
    const coffeeCardId = useId()
    const router = useRouter()
    const { query } = router.query
    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", "search", query],
        queryFn: () => getCoffeeShopQuery(query)
    })

    if (error) {
        return <Error message={"Error"} />
    }
    if (isLoading) {
        return <Loader />
    }

    if (data) {
        return (
            <>
                <Head>
                    <title>Tamper | search: {query}</title>
                    <meta name="description" content="Our newest additions to our database, let us find your favorite speciality coffee shop in Guadalajara" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2>Coffee Shops that contains: {query}</h2>
                <div className={styles.container}>
                    {data.count > 0 ? data.results.features.map(({ id, properties, type, geometry }: FeaturesEntity) =>
                        <CoffeeCard
                            id={id}
                            properties={properties}
                            type={type}
                            geometry={geometry}
                            key={`${coffeeCardId}-${id}`} />
                    ) : <div>Sorry, we didn't found any coffee shop</div>
                    }
                </div>
            </>
        )
    }

}
