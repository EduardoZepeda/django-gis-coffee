import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styles from '@styles/pages.module.css';

const Chemex = () => {
    return (
        <div className={styles.content}>
            <Head>
                <title>Tamper | Chemex</title>
                <meta name="description" content="Chemex brewing method introduction" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2>The chemex brewing method</h2>
            <Image alt='chemex picture' src='/chemex.jpg' width={300} height={300} />
            <p>If you're a coffee lover looking for a new and unique way to prepare your morning brew, then you might want to give the Chemex coffee method a try. The Chemex is a pour-over coffee maker that has been around since the 1940s, and it has gained a loyal following among coffee enthusiasts for its ability to produce a clean, smooth, and flavorful cup of coffee.</p>
            <p>The Chemex coffee method involves placing a special paper filter in the top of the Chemex carafe and then adding freshly ground coffee to the filter. You then pour hot water over the coffee grounds in a slow, circular motion, allowing the water to saturate the grounds and extract the flavor from the beans.</p>
            <p>One of the benefits of the Chemex coffee method is that it allows you to control the brewing process, so you can adjust the flavor and strength of your coffee to suit your tastes. Plus, because the Chemex uses a paper filter, it produces a cleaner cup of coffee than other methods that use metal filters.</p>
            <p>To get started with the Chemex coffee method, you'll need a few things, including a Chemex carafe, Chemex paper filters, a kettle for heating water, and freshly roasted coffee beans. You'll also need a coffee grinder to grind the beans just before brewing, as this will help to preserve the flavor and aroma of the coffee.</p>
            <p>Once you have your supplies, you can start by heating the water to just below boiling point. While the water is heating, place a paper filter in the top of the Chemex carafe and add the freshly ground coffee. When the water is ready, pour a small amount over the coffee grounds to allow them to bloom, and then continue pouring the water in a slow, circular motion.</p>
            <p>The amount of coffee and water you use will depend on your personal preference, but a good rule of thumb is to use one tablespoon of coffee for every six ounces of water. Experiment with different amounts of coffee and water to find the perfect balance for your taste.</p>
            <p>Overall, the Chemex coffee method is a great way to enjoy a delicious and satisfying cup of coffee. With a little practice and experimentation, you can perfect your brewing technique and enjoy a truly unique and flavorful cup of coffee every morning.</p>
        </div>
    )
}

export default Chemex