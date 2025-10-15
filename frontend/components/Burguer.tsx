import React from 'react'
import styles from '@styles/burguer.module.css'
import { useMenuStore } from '@store/menuStore';

const Burguer = () => {
    const openMenu = useMenuStore((state) => state.openMenu)

    return (
        <div onClick={openMenu} className={styles.burguer}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}
export default Burguer