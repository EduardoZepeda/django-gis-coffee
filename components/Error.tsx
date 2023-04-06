import React from 'react'
import styles from '@styles/message.module.css'

const Error = ({ message }: MessageProp) => {
    return (
        <span className={styles.error}>An error ocurred: {message}</span>
    )
}

export default Error