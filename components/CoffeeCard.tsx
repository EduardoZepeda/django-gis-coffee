import React from 'react'
import styles from '@styles/coffeeCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CoffeeCard = ({ id, properties: { name, address } }: FeaturesEntity) => {
    return (
        <div className={styles.card}>
            <Link href={`/coffee-shops/${id}`}>
                <div className={styles.a}>
                    <Image className={styles.image} src={'/placeholder-coffee-shop.jpg'} height={300} width={300} alt={'Coffee shop photography'} />
                    <div><strong>{name}</strong></div>
                    <div className={styles.address}><small>{address}</small></div>
                </div>
            </Link>
        </div>
    )
}

export default CoffeeCard