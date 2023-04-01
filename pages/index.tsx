import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'

export default function Home() {
  // Prevents window not defined error 
  // See more here https://stackoverflow.com/questions/57704196/leaflet-with-next-js
  const Map = dynamic(
    () => import('@components/Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )
  return (
    <>
      <Head>
        <title>Tamper</title>
        {/* Block leaflet requisites CDN */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin="" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossOrigin=""></script>
        {/* EndBlock leaflet requisites CDN */}
        <meta name="description" content="Let us find your favorite speciality coffee shop in Guadalajara" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Map />
      </main>
    </>
  )
}
