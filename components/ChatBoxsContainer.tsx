import ChatBox from '@components/ChatBox';
import styles from '@styles/chatBox.module.css';
import { useChatStore } from '@store/chatStore';
import { useSession } from 'next-auth/react';
import { webSocketUrl } from '@urls/index';
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

    function connectWs(): WebSocket {
        ws.current = new WebSocket(webSocketUrl({ token: token }))
        // on new message received update messages
        ws.current.onmessage = function (e) {
            const data: Message = JSON.parse(e.data)
            if (data) {
                updateMessages(data)
            }
        }
        // onclose try to connect again
        ws.current.onclose = function (e) {
            setTimeout(function () {
                connectWs();
            }, 2000);
        }
        // on error, close the socket which triggers a new reconnection
        ws.current.onerror = function (err) {
            ws.current?.close();
        }
        return ws.current
    }

    useEffect(() => {
        // token is needed for ws authentication
        if (token === undefined || ws.current) { return }
        // Create socket connection, WebSocket only exists on loaded DOM, hence it should initialize only inside useEffect
        const wsCurrent = connectWs()

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
    })


    if (username) {
        return (
            <div className={styles.container}>
                {/* render only chats that are open */}
                {chats.
                    filter(({ open }) => open === true).
                    map(({ user, fetched }, index) => <ChatBox
                        key={`${chatId}-${index}`}
                        ws={ws.current}
                        sender={username}
                        receiver={user}
                        fetched={fetched} />)}
            </div>
        )
    }
    return null
}

export default ChatBoxContainer


