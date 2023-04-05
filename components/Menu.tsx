import React from 'react'
import styles from '@styles/menu.module.css'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

const Menu = () => {
    const { data: session } = useSession()

    return (
        <ul className={styles.list}>
            <li className={styles.item}><Link href="/about">About</Link></li>
            {session ? null : <li className={styles.item}><Link href="/auth/register">Register</Link></li>}
            {session ? null : <li className={styles.item}><Link href="/auth/signin">Login</Link></li>}
            {session ? <li onClick={() => signOut()} className={styles.item}>Logout</li> : null}
            <li className={styles.item}><Link href="/new-additions">New additions</Link></li>
        </ul>
    )
}

export default Menu