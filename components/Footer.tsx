import React from 'react'
import styles from '@styles/footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

const Footer = () => {
    const size = 'xl'

    return (
        <footer className={styles.footer}>
            <div className={styles.menu}>
                <div className={styles.column}>
                    <h3>Coffee methods</h3>
                    <Link href="/chemex">Chemex</Link>
                    <Link href="/v60">V60</Link>
                    <Link href="/french-press">French press</Link>
                </div>
            </div>
            <div className={styles.social}>
                <FontAwesomeIcon size={size} icon={faFacebook} />
                <FontAwesomeIcon size={size} icon={faInstagram} />
                <FontAwesomeIcon size={size} icon={faTiktok} />
            </div>
            <div className={styles.legal}>
                <Link href="/cookies">Cookies Policy</Link>
                <Link href="/terms">Terms of use Policy</Link>
            </div>
        </footer>
    )
}

export default Footer