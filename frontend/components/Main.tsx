import React from 'react'
import mainStyles from '@styles/Home.module.css';
import ChatBoxContainer from '@components/ChatBoxsContainer';
import { useSession } from 'next-auth/react';

const Main = ({ children }: propsWithChildren) => {
    const { status } = useSession()

    return (
        <main className={mainStyles.main}>
            {children}
            {/* dont render chatboxs if user is not authenticated */}
            {status !== 'authenticated' ? null : <ChatBoxContainer />}
        </main>
    )
}

export default Main