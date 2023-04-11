import React from 'react'
import styles from '@styles/burguer.module.css'

const Burguer = ({ show, handleClick }: sidebarProps) => {
    return (
        <div onClick={() => handleClick(!show)} className={styles.burguer}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}
export default Burguer