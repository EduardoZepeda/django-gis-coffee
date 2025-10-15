import React from 'react'
import styles from '@styles/message.module.css'

const Success = ({ message }: MessageProp) => {
    return (
        <span className={styles.success}>{message}</span>
    )
}

export default Success