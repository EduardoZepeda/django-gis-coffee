import Footer from '@components/Footer';
import Nav from '@components/Nav';
import React from 'react';
import styles from '@styles/layout.module.css';
import Main from '@components/Main';

const Layout = ({ children }: propsWithChildren) => {


    return (
        <div className={styles.container}>
            <Nav />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    )
}

export default Layout