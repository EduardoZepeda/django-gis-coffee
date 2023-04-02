import React from 'react'
import styles from '@styles/layout.module.css'
import Nav from '@components/Nav'
import Footer from '@components/Footer'
import mainStyles from '@/styles/Home.module.css'

interface propsWithChildren {
    children: React.ReactNode
}

const Layout = ({ children }: propsWithChildren) => {
    return (
        <div className={styles.container}>
            <Nav />
            <main className={mainStyles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout