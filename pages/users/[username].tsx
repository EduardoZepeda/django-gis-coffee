import Error from '@components/Error';
import Followers from '@components/Followers';
import Following from '@components/Following';
import FollowUnfollow from '@components/FollowUnfollow';
import Loader from '@components/Loader';
import React, { useEffect, useState } from 'react';
import styles from '@styles/users.module.css';
import { fetchGet } from '@fetchUtils/useFetch';
import { useQuery } from 'react-query';
import { userDetail } from '@urls/index';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head'

const User = () => {
    const [openFollowers, setOpenFollowers] = useState<boolean>(false)
    const [openFollowing, setOpenFollowing] = useState<boolean>(false)
    const router = useRouter()
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { username } = router.query
    const { data, error, isLoading } = useQuery<Profile>({
        queryKey: ["users", username],
        queryFn: () => fetchGet(userDetail(username, {}), token),
        // only execute query after username is present
        enabled: router.isReady && status !== 'loading'
    },
    )

    useEffect(() => {
        // prevents rerenders because router query doesn't return path parameter immediately
        if (!username) {
            return
        }
    }, [data])


    if (error) {
        return <Error message="Something went wrong loading this page" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (data) {
        const { bio, username, profile_picture, following, followers, followed } = data
        return (
            <>
                <Head>
                    <title>{`Tamper | ${username}`}</title>
                    <meta name="description" content={`${username} ${bio}`} />
                </Head>
                <div className={styles.container}>
                    <Followers openModal={openFollowers} setOpenModal={setOpenFollowers} username={username} />
                    <Following openModal={openFollowing} setOpenModal={setOpenFollowing} username={username} />
                    <img
                        loading="lazy"
                        className={styles.profilePicture} src={profile_picture ? profile_picture : '/no-profile-picture.jpg'}
                        width={120}
                        height={120}
                        alt={`${username} profile picture`} />
                    <h2>{username}</h2>
                    <FollowUnfollow followed={followed} user={username} />
                    <div className={styles.bio}>{bio}</div>
                    <div className={styles.social}>
                        <div onClick={() => { setOpenFollowing(true); setOpenFollowers(false) }}>
                            <strong>{following.length}</strong>
                            {" "} Following
                        </div>
                        <div onClick={() => { setOpenFollowers(true); setOpenFollowing(false) }}>
                            <strong>{followers.length}</strong>
                            {" "} Followers
                        </div>
                    </div>
                </div >
            </>
        )
    }

    return null

}

export default User