import Loader from '@components/Loader';
import React from 'react';
import styles from '@styles/followUnfollow.module.css';
import { fetchPost } from '@fetchUtils/useFetch';
import { followCreate, followDestroy } from '@urls/index';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useSession } from 'next-auth/react';

const FollowUnfollow = ({ user, followed }: FollowUnfollowProps) => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { mutate, isLoading } = useMutation({
        mutationFn: () => (followed ? fetchPost(followDestroy(user), {}, token) : fetchPost(followCreate(user), {}, token)),
        onSuccess: () => {
            // Invalidate queries related to current user and profile
            // wrap them in a promise so both are applied
            return Promise.all([
                queryClient.invalidateQueries({ queryKey: ['users'] }),
                queryClient.invalidateQueries({ queryKey: ['recommended-users', session?.user?.username] }),
            ])
        }
    })

    if (status === "loading") {
        return <Loader />
    }

    // Is same user as session user don't shop follow button
    if (session?.user?.username === user) {
        return null
    }

    return (
        <button
            disabled={isLoading}
            onClick={() => { mutate() }}
            className={`${styles.btn} ${followed ? styles.unfollow : styles.follow}`}>{followed ? "Unfollow" : "Follow"}
        </button>
    )
}

export default FollowUnfollow