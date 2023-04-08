import React from 'react'
import styles from '@styles/followUnfollow.module.css'
import { useSession } from "next-auth/react"
import { useMutation } from 'react-query'
import { followUser, unfollowUser } from '@services/users'
import Loader from '@components/Loader'
import { useQueryClient } from 'react-query'

const FollowUnfollow = ({ user, followed }: FollowUnfollowProps) => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()
    const { mutate, isLoading } = useMutation({
        mutationFn: followed ? unfollowUser : followUser,
        onSuccess: () => {
            // Invalidate queries related to current user and profile
            // wrap them in a promise so both are applied
            return Promise.all([
                queryClient.invalidateQueries(user),
                queryClient.invalidateQueries(session?.user?.username)
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
            onClick={() => { mutate(user) }}
            className={`${styles.btn} ${followed ? styles.unfollow : styles.follow}`}>{followed ? "Unfollow" : "Follow"}
        </button>
    )
}

export default FollowUnfollow