import React from 'react'
import styles from '@styles/coffeeCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

function getDifferenceInDaysFromToday(date: string): number {
    const createdDate = new Date(date)
    const today = new Date()
    const diffTime = today.valueOf() - createdDate.valueOf()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const CoffeeCard = ({ id, properties: { name, address, created_date } }: CoffeeShopEntity) => {
    const numOfDaysLimit = 90

    return (
        <div className={styles.card}>
            <Link href={`/coffee-shops/${id}`}>
                <div className={styles.a}>
                    <Image className={styles.image} src={`/placeholder-coffee-shop-${Math.floor((Math.random() * 20) + 1).toString()}.jpg`} height={300} width={300} alt={'Coffee shop photography'} />
                    <div><strong>{name}</strong></div>
                    <div className={styles.address}>
                        <small>{address}</small>
                    </div>
                    {getDifferenceInDaysFromToday(created_date) < numOfDaysLimit ? <span className={styles.newAddition}>Added recently!</span> : null}
                </div>
            </Link>
        </div>
    )
}

export default CoffeeCard