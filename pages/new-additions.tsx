import { useId } from 'react'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getNewestCoffeeshops } from '@services/coffeeShops'
import CoffeeCard from '@components/CoffeeCard'
import styles from '@styles/newestAdditions.module.css'
import Link from 'next/link'
import Loader from '@components/Loader'
import Error from '@components/Error'

export default function NewestAdditions() {
    const coffeeCardId = useId()

    const { data, error, isLoading } = useQuery({
        queryKey: ["newestCoffeeShops"],
        queryFn: getNewestCoffeeshops
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
                    <title>Tamper | new additions</title>
                    <meta name="description" content="Our newest additions to our database, let us find your favorite speciality coffee shop in Guadalajara" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2>Newest coffee shops</h2>
                <div className={styles.container}>
                    {data.results.features.map(({ id, properties, type, geometry }: FeaturesEntity) =>
                        <CoffeeCard
                            id={id}
                            properties={properties}
                            type={type}
                            geometry={geometry}
                            key={`${coffeeCardId}-${id}`} />
                    )
                    }
                </div>
            </>
        )
    }

}
