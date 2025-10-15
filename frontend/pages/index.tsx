import Head from 'next/head'
import dynamic from 'next/dynamic'

// Prevents window not defined error 
// See more here https://stackoverflow.com/questions/57704196/leaflet-with-next-js
const Map = dynamic(
  () => import('@components/Map'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)

export default function Home() {

  return (
    <>
      <Head>
        <title>Tamper</title>
        <meta name="description" content="Let us find your favorite speciality coffee shop in Guadalajara" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Tamper</h1>
      <h2>Nearby Coffee Shops in Gdl</h2>
      <p>Let us find your favorite speciality coffee shop in Guadalajara</p>
      <Map />
    </>
  )
}
