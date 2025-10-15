import Link from 'next/link';
import React from 'react';
import styles from '@styles/footer.module.css';
import { facebookUrl, instagramUrl, tiktokUrl } from '@urls/index';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <Link aria-label="facebook link" href={facebookUrl}><FontAwesomeIcon size={size} icon={faFacebook} /></Link>
                <Link aria-label="instagram link" href={instagramUrl}><FontAwesomeIcon size={size} icon={faInstagram} /></Link>
                <Link aria-label="tiktok link" href={tiktokUrl}><FontAwesomeIcon size={size} icon={faTiktok} /></Link>
            </div>
            <div className={styles.legal}>
                <Link href="/cookies">Cookies Policy</Link>
                <Link href="/terms">Terms of use Policy</Link>
            </div>
        </footer>
    )
}

export default Footer