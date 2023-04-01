import React from 'react'
import styles from '@styles/menu.module.css'
import Link from 'next/link'

const Menu = () => {
    return (
        <ul className={styles.list}>
            <li className={styles.item}><Link href="">link</Link></li>
            <li className={styles.item}><Link href="">link</Link></li>
            <li className={styles.item}><Link href="">link</Link></li>
            <li className={styles.item}><Link href="">link</Link></li>
            <li className={styles.item}><Link href="">link</Link></li>
            <li className={styles.item}><Link href="">link</Link></li>
        </ul>
    )
}

export default Menu