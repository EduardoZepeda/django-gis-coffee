import Cross from '@components/Cross';
import Error from '@components/Error';
import Loader from '@components/Loader';
import React, { useId } from 'react';
import styles from '@styles/feed.module.css';
import { messageList } from '@urls/index';
import { fetchGet } from '@fetchUtils/useFetch';
import { useChatStore } from '@store/chatStore';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import RecentMessageSummary from './RecentMessageSummary';

const RecentMessages = () => {
    const openRecentConversations = useChatStore((state) => state.openRecentConversations)
    const setOpenRecentConversations = useChatStore((state) => state.setOpenRecentConversations)
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const { data, error, isLoading } = useQuery<Chat>({
        queryKey: ["RecentMessages", session?.user?.username],
        queryFn: () => fetchGet(messageList({ 'recent': true, 'username': session?.user?.username }), token),
        enabled: status !== 'loading' && status !== 'unauthenticated'
    })
    const recentMessageId = useId()

    if (status === 'unauthenticated') {
        return null
    }

    return (
        <div className={`${styles.container} ${openRecentConversations ? '' : styles.hidden}`}>
            <Cross show={openRecentConversations} handleClick={() => setOpenRecentConversations(!setOpenRecentConversations)} />
            <h3>Recent Messages</h3>
            <div className={styles.user}>
                {error ? <Error message={"We couldn't get your recent message history. Please try refreshing the page."} /> : null}
                {isLoading ? <Loader /> : null}
                {data ? <ul>
                    {data?.results?.map((message, index: number) => <li key={`${recentMessageId}-${index}`}>
                        <RecentMessageSummary {...message} currentUser={session?.user?.username || ''} />
                    </li>)
                    }
                </ul>
                    :
                    null}
            </div>
        </div>
    )
}

export default RecentMessages