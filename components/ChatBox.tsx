import ChatMessage from '@components/ChatMessage';
import Cross from '@components/Cross';
import Error from '@components/Error';
import Link from 'next/link';
import Loader from '@components/Loader';
import React, {
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
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';

const ChatBox = ({ sender, receiver, ws }: ChatProps) => {
    // State store
    const chats = useChatStore((state) => state.chats)
    const close = useChatStore((state) => state.close)
    const setConversation = useChatStore((state) => state.setConversation)

    // controlled input
    const [message, setMessage] = useState<string>('')

    // key react component
    const chatId = useId()
    // Ref to container
    const conversationContainer = useRef(null)
    // Session data
    const { data: session, status } = useSession()
    const token = session?.user?.token

    // Retrieve past chat messages
    const { data, error, isLoading } = useQuery({
        queryKey: ["messages", receiver],
        queryFn: () => fetchGet(messageList({ "username": receiver }), token),
        enabled: status !== 'loading' && status !== 'unauthenticated' && chats.find(({ user }) => user === receiver)?.conversation.length === 0,
        onSuccess: (data) => {
            setConversation(receiver, convertApiResponseToConversation(data.results))
        }
    })

    function convertApiResponseToConversation(results: ApiMessageResponse[]): Message[] {
        return results.map(({ message, receiver, sender, timestamp }) => { return { "message": message, "receiver": receiver.username, "timestamp": timestamp, "sender": sender.username } })
    }

    if (error) {
        return <Error message="There was an error loading the chat, please try again later" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (status === 'unauthenticated') {
        return null
    }

    const username = sender

    // Check message is a valid message, for now only checks if it is non empty
    function validateMessage(text: string): boolean {
        // I owe the fancy validation here
        if (text.length > 0 && text.length <= 256) {
            return true
        }
        return false
    }

    // Send message that contains message, receiver and sender (sender is ignored by the server and assigned to current user)
    function sendMessage(): void {
        if (validateMessage(message)) {
            ws?.send(JSON.stringify({
                'message': message.trim(),
                'receiver': receiver,
                'sender': sender
            }))
            setMessage('')
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

    const conversation = chats.find(({ user }) => user === receiver)?.conversation

    if (conversation) {
        return (
            <div className={styles.chatWindow}>
                <div className={styles.border}>
                    <div>
                        <strong>
                            <Link href={`/users/${receiver}`}>{receiver}</Link>
                        </strong>
                    </div>
                    <Cross show={true} handleClick={() => close(receiver)} />
                </div>
                <div ref={conversationContainer} className={styles.messages}>
                    {conversation.map(({ sender, message, timestamp }, index: number) => <ChatMessage
                        key={`${chatId}-${index}`}
                        isSender={sender === username}
                        content={message}
                        timestamp={timestamp}
                    />)}
                </div>
                <div className={styles.message}>
                    <input
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


