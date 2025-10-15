import React from 'react'
import styles from '@styles/sidebar.module.css'
import Menu from '@components/Menu'
import Cross from '@components/Cross'
import { useMenuStore } from '@store/menuStore';

const Sidebar = () => {
    const open = useMenuStore((state) => state.open)
    const closeMenu = useMenuStore((state) => state.closeMenu)

    return (
        <div className={`${styles.sidebar} ${open ? '' : styles.hidden}`}>
            <Cross show={open} handleClick={closeMenu} />
            <Menu />
        </div>
    )
}

export default Sidebar