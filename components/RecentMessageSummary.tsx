import React from 'react'
import styles from '@styles/recentMessages.module.css'
import Link from 'next/link'
import { format } from 'timeago.js';
import { useChatStore } from '@store/chatStore';
import { useMenuStore } from '@store/menuStore';


const RecentMessageSummary = ({ message, sender, receiver, timestamp, currentUser }: ChatResultsEntityPlusCurrentUser) => {
    const openChat = useChatStore((state) => state.open)
    const setOpenRecentConversations = useChatStore((state) => state.setOpenRecentConversations)
    const closeMenu = useMenuStore((state) => state.closeMenu)

    // Since message can have receiver as the current user we determiner whether user should we show
    const targetUser = currentUser === sender.username ? receiver : sender
    return (
        <div className={styles.messageItem} onClick={() => { openChat(targetUser?.username); setOpenRecentConversations(false); closeMenu() }}>
            <div><strong>{targetUser?.username}</strong></div>
            <div>{message.slice(0, 64)}{message.length > 64 ? '...' : null}</div>
            <div className={styles.messageTimestamp}><small>{format(timestamp)}</small></div>
        </div>
    )
}

export default RecentMessageSummary