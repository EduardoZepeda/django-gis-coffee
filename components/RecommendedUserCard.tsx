import React from 'react'
import styles from '@styles/recommendedUsers.module.css';
import FollowUnfollow from './FollowUnfollow';
import Link from 'next/link';

const RecommendedUserCard = ({ username, followed, profile_picture }: FollowingEntityOrFollowersEntity) => {
    return (
        <div className={styles.card}>
            <Link className={styles.card} href={`/users/${username}`}>
                <img loading="lazy" className={styles.img} src={profile_picture ? profile_picture : '/no-profile-picture.jpg'} alt="" />
                <span><strong>{username}</strong></span>
            </Link>
            <FollowUnfollow followed={followed} user={username} />
        </div>
    )
}

export default RecommendedUserCard