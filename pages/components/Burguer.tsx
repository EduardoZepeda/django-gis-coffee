import React from 'react'
import styles from '@styles/burguer.module.css'

const Burguer = ({ onClick }: sidebarProps) => {
    return (
        <div onClick={onClick} className={styles.burguer}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}
export default Burguer