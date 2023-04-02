import React from 'react'
import styles from '@styles/menu.module.css'
import Link from 'next/link'

const Menu = () => {
    return (
        <ul className={styles.list}>
            <li className={styles.item}><Link href="/about">About</Link></li>
            <li className={styles.item}><Link href="/register">Register</Link></li>
            <li className={styles.item}><Link href="/login">Login</Link></li>
            <li className={styles.item}><Link href="/logout">Logout</Link></li>
            <li className={styles.item}><Link href="/new-additions">New additions</Link></li>
        </ul>
    )
}

export default Menu