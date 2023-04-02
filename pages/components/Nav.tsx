import React, { useState } from 'react'
import styles from '@styles/nav.module.css'
import Menu from '@components/Menu'
import Sidebar from '@components/Sidebar'
import Burguer from '@components/Burguer'
import Link from 'next/link'

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const toggleMenu = (): void => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}><Link href="/">Tamper</Link></div>
            <div className={styles.menu}>
                <Menu />
            </div>
            <Burguer onClick={toggleMenu} />
            <Sidebar onClick={toggleMenu} menuOpen={menuOpen} />
        </nav>
    )
}

export default Nav