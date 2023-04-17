import React from 'react'
import styles from '@styles/cross.module.css'


const Cross = ({ show, handleClick }: crossProps) => {
    return (
        <div onClick={() => handleClick()} className={`${styles.cross} ${show ? '' : styles.hidden}`}>
        </div>
    )
}

export default Cross