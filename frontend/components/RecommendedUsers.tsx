import Loader from '@components/Loader';
import React, { useId } from 'react';
import RecommendedUserCard from './RecommendedUserCard';
import styles from '@styles/recommendedUsers.module.css';
import { fetchGet } from '@fetchUtils/useFetch';
import { recommendedUsersList } from '@urls/index';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';

const RecommendedUsers = () => {
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { data, error, isLoading } = useQuery<RecommendedUsers>({
        queryKey: ["recommended-users", session?.user?.username],
        queryFn: () => fetchGet(recommendedUsersList, token),
        enabled: status !== 'loading' && status !== 'unauthenticated'
    })
    const userKey = useId()

    if (status === "loading") {
        return <Loader />
    }

    if (error) {
        return null
    }

    if (data) {
        return (
            <>
                <h3>Other people you may know</h3>
                <div className={styles.container}>
                    {data?.results?.map((user: FollowingOrFollowersEntity, index: number) => <RecommendedUserCard key={`${userKey}-${index}`} {...user} />)}
                </div>
            </>
        )
    }
    return null

}

export default RecommendedUsers