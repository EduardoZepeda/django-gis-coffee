import React from 'react'
import styles from '@styles/sidebar.module.css'
import Menu from '@components/Menu'
import Cross from '@components/Cross'

type sidebarProps = {
    menuOpen: boolean
    onClick: React.MouseEventHandler<HTMLElement>
}

const Sidebar = ({ menuOpen, onClick }: sidebarProps) => {

    return (
        <div className={`${styles.sidebar} ${menuOpen ? '' : styles.hidden}`}>
            <Menu />
            <Cross onClick={onClick} menuOpen={menuOpen} />
        </div>
    )
}

export default Sidebar