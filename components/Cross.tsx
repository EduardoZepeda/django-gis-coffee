import React from 'react'
import styles from '@styles/cross.module.css'



const Cross = ({ show, handleClick }: sidebarProps) => {
    return (
        <div onClick={() => handleClick(false)} className={`${styles.cross} ${show ? '' : styles.hidden}`}>
        </div>
    )
}

export default Cross