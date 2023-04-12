import React from 'react'
import styles from '@styles/feed.module.css'
import Link from 'next/link'

const FeedItem = ({ user: { username: user, profile_picture }, action, target: { id, name, username }, created }: Feed) => {
    return (
        <section className={styles.feedItem}>
            <div className={styles.profilePicture}>
                <img src={profile_picture} className={styles.img} alt={`feed profile picture`} />
            </div>
            <div className={styles.action}>
                <Link href={`/${action === 'followed' ? `users/${username}` : `coffee-shops/${id?.toString()}`}`}>
                    {`${user} ${action} ${username ? username : name}`}
                </Link>
            </div>
        </section>
    )
}

export default FeedItem