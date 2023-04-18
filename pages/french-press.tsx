import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styles from '@styles/pages.module.css';

const FrenchPress = () => {
    return (
        <div className={styles.content}>
            <Head>
                <title>Tamper | French press</title>
                <meta name="description" content="French press brewing method introduction" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>The french press method</h2>
            <Image alt='french press picture' src='/french-press.jpg' width={300} height={300} />
            <p>The French press, also known as a press pot or plunger pot, is a classic brewing method that has been around since the early 20th century. It is a simple and easy-to-use brewing method that produces a rich, full-bodied cup of coffee that is loved by many coffee enthusiasts.</p>
            <p>The French press brewing method involves combining coarsely ground coffee and hot water in a cylindrical carafe and allowing the coffee to steep for several minutes. Then, a plunger with a mesh filter is pressed down to separate the coffee grounds from the brewed coffee, resulting in a smooth and flavorful cup of coffee.</p>
            <p>One of the benefits of the French press method is that it allows you to control the brewing process, so you can adjust the strength and flavor of your coffee to suit your taste. For example, if you prefer a stronger cup of coffee, you can use more coffee grounds or steep for a longer time.</p>
            <p>To get started with the French press method, you'll need a few key items, including a French press carafe, coarsely ground coffee, a kettle for heating water, and a timer. Once you have your supplies, you can start by heating the water to just below boiling point.</p>
            <p>While the water is heating, add the coarsely ground coffee to the French press carafe and pour in the hot water. Set a timer for four minutes and allow the coffee to steep. When the timer goes off, press down on the plunger to separate the coffee grounds from the brewed coffee.</p>
            <p>The French press method is great for those who enjoy a bold and full-bodied cup of coffee. The metal mesh filter used in the French press allows the coffee oils and flavors to pass through into the brewed coffee, resulting in a rich and complex flavor profile. Plus, the French press is an affordable and easy-to-use brewing method that can be used at home or on the go.</p>
            <p>In conclusion, the French press is a classic and beloved brewing method that produces a delicious and flavorful cup of coffee. If you're looking for a simple and efficient way to brew your coffee, give the French press a try and experience the unique and robust flavors it has to offer.</p>
        </div>
    )
}

export default FrenchPress