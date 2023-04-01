import React from 'react'
import styles from '@styles/cross.module.css'

type sidebarProps = {
    menuOpen: boolean
    onClick: React.MouseEventHandler<HTMLElement>
}

const Cross = ({ menuOpen, onClick }: sidebarProps) => {
    return (
        <div onClick={onClick} className={`${styles.cross} ${menuOpen ? '' : styles.hidden}`}>
        </div>
    )
}

export default Cross