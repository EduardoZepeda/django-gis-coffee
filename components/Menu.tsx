import React, { useState } from 'react'
import styles from '@styles/menu.module.css'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import SearchBar from '@components/SearchBar'
import Feed from '@components/Feed'

const Menu = () => {
    const { data: session } = useSession()
    const [openFeed, setOpenFeed] = useState<boolean>(false)


    return (
        <>
            <ul className={styles.list}>
                <li><SearchBar /></li>
                <li className={styles.item}><Link href="/about">About</Link></li>
                {session ? null : <li className={styles.item}><Link href="/auth/register">Register</Link></li>}
                {session ? null : <li className={styles.item}><Link href="/auth/signin">Login</Link></li>}
                {session ? <li className={styles.item}><Link href={`/users/${session.user?.username}`}>Profile</Link></li> : null}
                {session ? <li onClick={() => signOut()} className={styles.item}>Logout</li> : null}
                {session ? <li onClick={() => setOpenFeed(!openFeed)} className={styles.item}>Feed</li> : null}
                <li className={styles.item}><Link href="/new-additions?page=1">New additions</Link></li>
            </ul>
            <Feed openFeed={openFeed} setOpenFeed={setOpenFeed} />
        </>
    )
}

export default Menu