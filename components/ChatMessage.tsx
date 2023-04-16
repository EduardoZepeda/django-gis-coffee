import React from 'react'
import styles from '@styles/chatMessage.module.css'
import { format } from 'timeago.js';

const ChatMessage = ({ isSender, timestamp, content }: ChatMessageProps) => {
    return (
        <div title={format(timestamp)} className={`${styles.bubble} ${isSender ? styles.sender : styles.receiver}`}>
            {content}
        </div>
    )
}

export default ChatMessage


