import React from 'react'
import styles from '@styles/layout.module.css'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Sidebar from './Sidebar'

interface propsWithChildren {
    children: React.ReactNode
}

const Layout = ({ children }: propsWithChildren) => {
    return (
        <div className={styles.container}>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default Layout