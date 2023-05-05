import Feed from '@components/Feed';
import Link from 'next/link';
import React from 'react';
import RecentMessages from '@components/RecentMessages';
import SearchBar from '@components/SearchBar';
import styles from '@styles/menu.module.css';
import { signOut, useSession } from 'next-auth/react';
import { useChatStore } from '@store/chatStore';
import { useFeedStore } from '@store/feedbarStore';
import { useMenuStore } from '@store/menuStore';



const Menu = () => {
    const { data: session } = useSession()
    const openFeedbar = useFeedStore((state) => state.openFeedbar)
    const closeMenu = useMenuStore((state) => state.closeMenu)
    const setOpenRecentConversations = useChatStore((state) => state.setOpenRecentConversations)
    const iconSize = 'lg'
    // add a closeMenu on every li member so overlay closes when entering a new page.
    return (
        <>
            <ul className={styles.list}>
                <li><SearchBar /></li>
                <li onClick={closeMenu} className={styles.item}><Link href="/about">About</Link></li>
                {session ? null : <li onClick={closeMenu} className={styles.item}><Link href="/auth/register">Register</Link></li>}
                {session ? null : <li onClick={closeMenu} className={styles.item}><Link href="/auth/signin">Login</Link></li>}
                {session ? <li onClick={closeMenu} className={styles.item}><Link href={`/users/${session.user?.username}`}>Profile</Link></li> : null}
                {session ? <li onClick={() => signOut()} className={styles.item}>Logout</li> : null}
                {session ? <li onClick={openFeedbar} className={styles.item}>Feed</li> : null}
                {session ? <li onClick={() => setOpenRecentConversations(true)} className={styles.item}>Messages</li> : null}
                <li onClick={closeMenu} className={styles.item}><Link href="/new-additions?page=1">New additions</Link></li>
            </ul>
            <Feed />
            <RecentMessages />
        </>
    )
}

export default Menu