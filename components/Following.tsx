import React, { useId } from 'react'
import styles from '@styles/overlay.module.css'
import Link from 'next/link'
import FollowUnfollow from '@components/FollowUnfollow'
import { useQueryClient } from 'react-query'

const Following = ({ openModal, setOpenModal, username }: OverlayProps) => {
    const keyId = useId()
    const queryClient = useQueryClient()
    const profile = queryClient.getQueryData<Profile>(["users", username]);

    if (profile) {
        const { following } = profile
        return (
            <div className={`${styles.overlay} ${openModal ? "" : styles.hidden}`}>
                <div className={styles.socialAccounts}>
                    <h3>Following</h3>
                    <div className={styles.cross} onClick={() => { setOpenModal(false) }}></div>
                    <div>
                        {following.length !== 0 ? following.map(({ username, profile_picture, followed }: FollowingOrFollowersEntity, index: number) => {
                            return (
                                <div key={`${keyId}-${index}`} className={styles.account}>
                                    <Link onClick={() => setOpenModal(false)} href={`/users/${username}`}>
                                        <div className={styles.user}>
                                            <img loading="lazy"
                                                className={styles.profilePicture}
                                                src={profile_picture ? profile_picture : '/no-profile-picture.jpg'}
                                                alt={`${username} profile picture`} />
                                            <div>{username}</div>
                                        </div>
                                    </Link>
                                    <FollowUnfollow followed={followed} user={username} />
                                </div>
                            )
                        }) : <div>Nothing to see here ~</div>
                        }
                    </div>
                </div>
            </div >
        )
    }

    return null

}

export default Following