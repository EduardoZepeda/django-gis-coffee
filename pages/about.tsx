import React from 'react'
import Image from 'next/image'
import styles from '@styles/pages.module.css'
import Head from 'next/head'

const About = () => {
    return (
        <>
            <Head>
                <title>Tamper | About</title>
                <meta name="description" content="We want to offer you the best speciality coffee shops reviews in Guadalajara" />
            </Head>
            <div className={styles.content}>
                <h1>About me</h1>
                <Image src={'/sui_400.jpg'} alt='Photography of the founder of Tamper, Sui' width={400} height={400} />
                <p>
                    This is the fan page of my blog where I share information about the coffee shops I visit and what I learn every day about coffee. I currently work as a barista in a small coffee shop in Ireland. Would you like to join me in this adventure to learn about coffee?
                </p>
            </div>
        </>
    )
}
export default About