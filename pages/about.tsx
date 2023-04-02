import React from 'react'
import Image from 'next/image'
import styles from '@styles/about.module.css'

const About = () => {
    return (
        <>
            <div className={styles.content}>
                <h1>About me</h1>
                <Image src={'/sui_400.jpg'} alt='Photography of the founder of Tamper, Sui' width={400} height={400} />
                <p>
                    This is the fan page of my blog where I share information about the coffee shops I visit and what I learn every day about coffee. I currently work as a barista in a small coffee shop. Would you like to join me to learn about coffee?
                </p>
                <p>
                    Traducción: Esta es la fan page de mi blog donde comparto información sobre las cafeterías que visito y lo que aprendo cada día sobre café. Actualmente trabajo como barista en una pequeña cafetería. ¿Te gustaría acompañarme a aprender sobre el café?
                    — Sui
                </p>
            </div>
        </>
    )
}
export default About