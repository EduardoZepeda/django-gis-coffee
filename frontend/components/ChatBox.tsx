import ChatMessage from '@components/ChatMessage';
import Cross from '@components/Cross';
import Error from '@components/Error';
import Link from 'next/link';
import Loader from '@components/Loader';
import React, {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState
} from 'react';
import styles from '@styles/chatBox.module.css';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { fetchGet } from '@fetchUtils/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { messageList } from '@urls/index';
import { useChatStore } from '@store/chatStore';
import { useInfiniteQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { InView } from 'react-intersection-observer';
import ButtonLoader from './ButtonLoader';

const ChatBox = ({ sender, receiver, ws, fetched }: ChatProps) => {
    // State store
    const chats = useChatStore((state) => state.chats)
    const close = useChatStore((state) => state.close)
    const setConversation = useChatStore((state) => state.setConversation)
    // controlled input
    const [message, setMessage] = useState<string>('')

    // key react component
    const chatId = useId()
    // Ref to container
    const anchorScroll = useRef<null | HTMLDivElement>(null)
    // Session data
    const { data: session, status } = useSession()
    const token = session?.user?.token

    // Retrieve past chat messages
    const { isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Chat>({
        queryKey: ["messages", receiver],
        queryFn: ({ pageParam = 1 }) => fetchGet(messageList({ "username": receiver, "page": pageParam }), token),
        enabled: status !== 'loading' && status !== 'unauthenticated' && !fetched,
        getNextPageParam: (lastPage, allPages) => {
            let nextPage: number | undefined
            if (lastPage.next) {
                nextPage = allPages.length + 1
            }
            return nextPage
        },
        onSuccess: (data) => {
            // data.pages is an array of responses
            // we get the results property of each response and end up with an array of conversations
            // we flatten it and reverse it to have the conversation in the correct chronological order
            const orderedMessages = [...data.pages.map(({ results }) => results || []).flat().reverse()].
                map((message) => ({ ...message, sender: message?.sender.username, receiver: message?.receiver.username }))
            setConversation(receiver, orderedMessages)

        }
    })


    // Check message is a valid message, for now only checks if it is non empty
    const validateMessage = useCallback(function validateMessage(text: string): boolean {
        // I owe the fancy validation here
        if (text.length > 0 && text.length <= 256) {
            return true
        }
        return false
    }, [])

    if (status === 'unauthenticated') {
        return null
    }

    const username = sender

    // Send message that contains message, receiver and sender (sender is ignored by the server and assigned to current user)
    function sendMessage(): void {
        if (validateMessage(message)) {
            ws?.send(JSON.stringify({
                'message': message.trim(),
                'receiver': receiver,
                'sender': sender
            }))
            setMessage('')
            anchorScroll.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    useEffect(() => {
        anchorScroll.current?.scrollIntoView({ behavior: "smooth" })
    })

    let socketStatus
    switch (ws?.readyState) {
        case 0:
            socketStatus = styles.connecting
        case 1:
            socketStatus = styles.open
        case 2:
            socketStatus = styles.closing
        case 3:
            socketStatus = styles.closed
    }

    const socketStatuses: socketStatuses = {
        0: 'connecting',
        1: 'open',
        2: 'closing',
        3: 'closed'
    }

    const conversation = chats.find(({ user }) => user === receiver)?.conversation
    if (conversation) {
        return (
            <div className={styles.chatWindow}>
                <div onClick={() => fetchNextPage()} className={styles.border}>
                    <div>
                        <strong>
                            <Link href={`/users/${receiver}`}>{receiver}</Link>
                        </strong>
                    </div>
                    <Cross show={true} handleClick={() => close(receiver)} />
                </div>
                <div className={styles.messages}>
                    {!!error && <Error message="There was an error loading the chat, please try again later" />}
                    {isLoading && <Loader />}
                    {!isLoading &&
                        !isFetchingNextPage &&
                        hasNextPage &&
                        (<InView as="div" style={{ textAlign: 'center' }} onChange={(inView, entry) => { if (inView) { fetchNextPage() } }}>
                            <ButtonLoader />
                        </InView>)}
                    {conversation.map(({ sender, message, timestamp }, index: number) => {
                        return <ChatMessage
                            key={`${chatId}-${index}`}
                            isSender={sender === username}
                            content={message}
                            timestamp={timestamp}
                        />
                    })}
                    {/* Dummy scroll that exists for scrolling to it when a new message arrives */}
                    <div ref={anchorScroll} className={styles.dummyDivForScroll}></div>
                </div>
                <div className={styles.statusContainer}>
                    <div className={`${styles.status} ${socketStatus}`}>{ws?.readyState !== 1 && typeof ws?.readyState === 'number' ? socketStatuses[ws?.readyState] : null}</div>
                </div>
                <div className={styles.message}>
                    <input
                        disabled={ws?.readyState !== 1 || isLoading}
                        value={message}
                        onChange={handleChange}
                        id="message"
                        className={styles.messageInput}
                        type="text"
                        onKeyUp={handleKeyDown}
                        placeholder='Type a message here...' />
                    <button
                        onClick={() =>
                            sendMessage()}
                        className={styles.btn}>
                        <FontAwesomeIcon size={'sm'} icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        )
    }
    return null
}

export default ChatBox


