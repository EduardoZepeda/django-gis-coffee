import React from 'react'
import styles from '@styles/sidebar.module.css'
import Menu from '@components/Menu'
import Cross from '@components/Cross'

const Sidebar = ({ show, handleClick }: sidebarProps) => {

    return (
        <div className={`${styles.sidebar} ${show ? '' : styles.hidden}`}>
            <Menu />
            <Cross show={show} handleClick={handleClick} />
        </div>
    )
}

export default Sidebar