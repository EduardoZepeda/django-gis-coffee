import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ChatState {
    chats: ChatBoxState[]
    update: (message: Message) => void
    open: (receiver: Message["receiver"]) => void
    close: (receiver: Message["receiver"]) => void
    setConversation: (receiver: Message["receiver"], messages: Message[]) => void
}


export const useChatStore = create<ChatState>()(
    devtools(
        (set) => ({
            chats: [],
            // update a chat with a new message
            update: (message) => set((state) => {
                // find the chat which message belongs to
                const chatIndex = state.chats.findIndex(({ user }) => user === message.receiver)
                // if found, update the conversation array with the new message
                if (chatIndex >= 0) {
                    state.chats[chatIndex].conversation = [...state.chats[chatIndex].conversation, message]
                    return { chats: [...state.chats] }
                }
                // if not, return the same state
                return { chats: [...state.chats, { user: message.receiver, open: false, active: true, fetched: false, conversation: [message] }] }
            }),
            // open a chat to a given user
            open: (receiver) => set((state) => {
                // find the chat which user belongs to
                const existentClosedChat = state.chats.find(({ user, open }) => user === receiver && open === false)
                if (existentClosedChat) {
                    // change open to true
                    return { chats: [{ ...existentClosedChat, open: true }, ...state.chats.filter(({ user }) => receiver !== user)] }
                }
                return { chats: [{ user: receiver, open: true, conversation: [], active: true, fetched: false }, ...state.chats.filter(({ user }) => receiver !== user)] }
            }),
            close: (receiver) => set((state) => {
                const existentOpenChat = state.chats.find(({ user, open }) => user === receiver && open === true)
                if (existentOpenChat) {
                    // change open to false
                    return { chats: [{ ...existentOpenChat, open: false }, ...state.chats.filter(({ user }) => receiver !== user)] }
                }
                return { chats: state.chats }
            }),
            // update a chat with a new message
            setConversation: (receiver, messages) => set((state) => {
                // find the chat which message belongs to
                const chatToUpdate = state.chats.find(({ user }) => user === receiver)
                // if found, update the conversation array with the new message
                if (chatToUpdate) {
                    // mark chat as fetched to prevent further refetches in useQuery's enabled
                    return { chats: [{ ...chatToUpdate, conversation: [...messages], fetched: true }, ...state.chats.filter(({ user }) => user !== receiver)] }
                }
                // if not, return the same state
                return { chats: [{ user: receiver, open: true, active: true, fetched: false, conversation: [...messages] }, ...state.chats] }
            }),
        }),
        {
            name: 'chat-storage',
        }
    )
)