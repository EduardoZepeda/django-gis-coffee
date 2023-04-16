import ChatBox from '@components/ChatBox';
import styles from '@styles/chatBox.module.css';
import { useChatStore } from '@store/chatStore';
import { useSession } from 'next-auth/react';
import React, {
    useId,
    useEffect,
    useRef,
} from 'react';


const ChatBoxContainer = () => {
    // For this project, create a SINGLE websocket to serve all interaction between user and server
    let ws = useRef<WebSocket | null>(null)
    // load state and actions
    const chats = useChatStore((state) => state.chats)
    const updateMessages = useChatStore((state) => state.update)
    const chatId = useId()
    // Token is necesary as a query parameter to session connection
    const { data: session, status } = useSession()
    const token = session?.user?.token
    const username = session?.user?.username

    useEffect(() => {
        // token is needed for ws authentication
        if (token === undefined) { return }
        // Create socket connection, WebSocket only exists on loaded DOM, hence it should initialize only inside useEffect
        ws.current = new WebSocket('ws://' + '127.0.0.1:8000' + '/ws/chat/' + `?token=${token}`)

        const wsCurrent = ws.current
        // If component is destroyed, close web socket
        return (() => {
            // check if socket connection was successful before closing it
            // otherwise a warning appears on console
            if (wsCurrent.readyState === 1) {
                wsCurrent.close()
            }
        })

    }, [status])

    useEffect(() => {
        if (!ws.current) return
        // Everytime a message is received, updateMessages
        ws.current.onmessage = function (e) {
            const data: Message = JSON.parse(e.data)
            if (data) {
                updateMessages(data)
            }
        }
    })


    if (username) {
        return (
            <div className={styles.container}>
                {/* render only chats that are open */}
                {chats.
                    filter(({ open }) => open === true).
                    map(({ user }, index) => <ChatBox key={`${chatId}-${index}`} ws={ws.current} sender={username} receiver={user} />)}
            </div>
        )
    }
    return null
}

export default ChatBoxContainer


