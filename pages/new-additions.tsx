import CoffeeCard from '@components/CoffeeCard';
import Error from '@components/Error';
import Head from 'next/head';
import Loader from '@components/Loader';
import styles from '@styles/newestAdditions.module.css';
import { coffeeList } from '@urls/index';
import { fetchGet } from '@fetchUtils/useFetch';
import { useId, useState } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import Pagination from '@components/Pagination';
import { useRouter } from 'next/router';

export default function NewestAdditions() {
    const coffeeCardId = useId()
    const router = useRouter()
    const { page } = router.query
    let intPage
    if (typeof page === 'string' && typeof page !== undefined) {
        intPage = parseInt(page)
    } else {
        intPage = 1
    }
    const [currentPage, setPage] = useState<number>(intPage)
    const { data: session, status } = useSession()
    const token = session?.user?.token

    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", currentPage],
        queryFn: () => fetchGet(coffeeList({ "page": currentPage }), token),
        enabled: status !== 'loading' && router.isReady
    })

    if (error) {
        return <Error message={"Error"} />
    }

    if (isLoading) {
        return <Loader />
    }

    if (data) {
        const { count } = data
        return (
            <>
                <Head>
                    <title>Tamper | new additions</title>
                    <meta name="description" content="Our newest additions to our database, let us find your favorite speciality coffee shop in Guadalajara" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2>Newest coffee shops</h2>
                <section className={styles.container}>
                    {data.results.features.map(({ id, properties, type, geometry }: FeaturesEntity) =>
                        <CoffeeCard
                            id={id}
                            properties={properties}
                            type={type}
                            geometry={geometry}
                            key={`${coffeeCardId}-${id}`} />
                    )
                    }
                </section>
                <Pagination queryParams={{ "page": currentPage }} totalPages={Math.ceil(count / 20)} setPage={setPage} />
            </>
        )
    }

}
