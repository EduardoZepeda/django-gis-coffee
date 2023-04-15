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
                const chatToUpdate = state.chats.find(({ user }) => user === message.receiver)
                // if found, update the conversation array with the new message
                if (chatToUpdate) {
                    return { chats: [{ ...chatToUpdate, conversation: [message, ...chatToUpdate.conversation] }, ...state.chats.filter(({ user }) => user !== message.receiver)] }
                }
                // if not, return the same state
                return { chats: [{ user: message.receiver, open: false, active: true, conversation: [message] }, ...state.chats] }
            }),
            // open a chat to a given user
            open: (receiver) => set((state) => {
                // find the chat which user belongs to
                const existentClosedChat = state.chats.find(({ user, open }) => user === receiver && open === false)
                if (existentClosedChat) {
                    // change open to true
                    return { chats: [{ ...existentClosedChat, open: true }, ...state.chats.filter(({ user }) => receiver !== user)] }
                }
                return { chats: [{ user: receiver, open: true, conversation: [], active: true }, ...state.chats.filter(({ user }) => receiver !== user)] }
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
                    return { chats: [{ ...chatToUpdate, conversation: [...messages] }, ...state.chats.filter(({ user }) => user !== receiver)] }
                }
                // if not, return the same state
                return { chats: [{ user: receiver, open: true, active: true, conversation: [...messages] }, ...state.chats] }
            }),
        }),
        {
            name: 'chat-storage',
        }
    )
)