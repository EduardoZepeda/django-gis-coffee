import React from 'react'
import styles from '@styles/pages.module.css'
import Head from 'next/head'

const Cookies = () => {
    return (
        <div className={styles.content}>
            <Head>
                <title>Tamper | Cookies</title>
                <meta name="description" content="Tamper's cookie policy" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>Our cookie policy</h2>
            <p>Cookie Policy for Tamper</p>
            <p>Effective date: April 3, 2023</p>
            <p>At Tamper, we understand the importance of protecting your privacy and personal information. This Cookie Policy explains how we use cookies and similar tracking technologies when you use our website located at [insert website URL] (the “Site”).</p>
            <h2>What are cookies?</h2>
            <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work or to work more efficiently, as well as to provide information to the owners of the site. Cookies can be "session" cookies, which are deleted when you close your browser, or "persistent" cookies, which remain on your device for a longer period of time.</p>
            <h2>What cookies do we use?</h2>
            <p>We use both session cookies and persistent cookies on the Site. The cookies we use fall into the following categories:</p>
            <ol>
                <li>
                    <p>Essential cookies: These cookies are necessary to provide you with services available through our Site and to use some of its features, such as accessing secure areas. Without these cookies, some portions of our Site would not function properly.</p>
                </li>
                <li>
                    <p>Analytical cookies: These cookies allow us to collect information about how visitors use our Site, such as which pages they visit most frequently and if they receive error messages from certain pages. This helps us improve the way our Site works and provides a better user experience.</p>
                </li>
                <li>
                    <p>Advertising cookies: These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.</p>
                </li>
            </ol>
            <h2>How to control cookies?</h2>
            <p>You can control the use of cookies on our Site through your browser settings. Most browsers allow you to block cookies or to delete cookies already stored on your device. However, if you choose to block or delete cookies, some features of our Site may not function properly.</p>
            <h2>Changes to this Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal or regulatory reasons. If we make material changes to this Cookie Policy, we will notify you by posting a prominent notice on our Site or by sending you an email.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about our use of cookies, please contact us by email at placeholder@email.com</p>

        </div>
    )
}

export default Cookies