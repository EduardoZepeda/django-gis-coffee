import React from 'react'
import styles from '@styles/nav.module.css'
import Menu from '@components/Menu'
import Sidebar from '@components/Sidebar'
import Burguer from '@components/Burguer'
import Link from 'next/link'

const Nav = () => {


    return (
        <nav className={styles.nav}>
            <div className={styles.logo}><Link href="/">Tamper</Link></div>
            <div className={styles.menu}>
                <Menu />
            </div>
            <Burguer />
            <Sidebar />
        </nav>
    )
}

export default Nav