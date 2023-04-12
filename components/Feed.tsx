import Error from '@components/Error';
import FeedItem from '@components/FeedItem';
import Loader from '@components/Loader';
import React, { useId } from 'react';
import styles from '@styles/feed.module.css';
import { feedUrl } from '@urls/index';
import { fetchGet } from '@fetchUtils/useFetch';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import Cross from '@components/Cross';

const Feed = ({ openFeed, setOpenFeed }: FeedProps) => {
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { data, error, isLoading } = useQuery({
        queryKey: ["coffeeShops", session?.user?.username],
        queryFn: () => fetchGet(feedUrl, token),
        enabled: status !== 'loading' && status !== 'unauthenticated'
    })
    const feedId = useId()

    if (status === 'unauthenticated') {
        return null
    }

    return (
        <div className={`${styles.container} ${openFeed ? '' : styles.hidden}`}>
            <h3>Feed</h3>
            <Cross show={openFeed} handleClick={setOpenFeed} />
            <div className={styles.user}>
                {error ? <Error message={"We couldn't get your feed. Please try refreshing the page."} /> : null}
                {isLoading ? <Loader /> : null}
                {data ? <ul>
                    {data?.results?.map(({ action, target, user, created }: Feed, index: number) => <li key={`${feedId}-${index}`}>
                        <FeedItem action={action} target={target} user={user} created={created} />
                    </li>)
                    }
                </ul>
                    :
                    null}

            </div>
        </div>
    )
}

export default Feed