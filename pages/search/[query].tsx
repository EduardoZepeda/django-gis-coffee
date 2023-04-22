import CoffeeCard from '@components/CoffeeCard';
import Error from '@components/Error';
import Head from 'next/head';
import Loader from '@components/Loader';
import styles from '@styles/newestAdditions.module.css';
import { coffeeList } from '@urls/index';
import { fetchGet } from '@fetchUtils/useFetch';
import { useId, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Pagination from '@components/Pagination';

export default function SearchCoffeeShops() {
    const coffeeCardId = useId()
    const router = useRouter()
    const { data: session, status } = useSession()
    const token = session?.user?.token
    let intPage
    const { query, page } = router.query
    if (typeof page === 'string' && typeof page !== undefined) {
        intPage = parseInt(page)
    } else {
        intPage = 1
    }
    const [currentPage, setPage] = useState<number>(intPage)
    const { data, error, isLoading } = useQuery<CoffeeShopsResponse>({
        queryKey: ["coffeeShops", "search", query, currentPage],
        queryFn: () => fetchGet(coffeeList({ "query": query, "page": currentPage }), token),
        enabled: router.isReady && status !== 'loading'
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
                    <title>Tamper | search: {query}</title>
                    <meta name="description" content="Our newest additions to our database, let us find your favorite speciality coffee shop in Guadalajara" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h2>Coffee Shops that contains: {query}</h2>
                <div className={styles.container}>
                    {data.count > 0 ? data.results.features?.map(({ id, properties, type, geometry }: CoffeeShopEntity) =>
                        <CoffeeCard
                            id={id}
                            properties={properties}
                            type={type}
                            geometry={geometry}
                            key={`${coffeeCardId}-${id}`} />
                    ) : <div>Sorry, we didn't found any coffee shop</div>
                    }
                </div>
                <Pagination queryParams={{ "page": currentPage, "query": query ? query : undefined }} totalPages={Math.ceil(count / 20)} setPage={setPage} />
            </>
        )
    }

}
