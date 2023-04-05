import React from 'react'
import styles from '@styles/error.module.css'

const Error = ({ message }: ErrorProp) => {
    return (
        <span className={styles.error}>An error ocurred: {message}</span>
    )
}

export default Error