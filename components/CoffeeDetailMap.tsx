
import { LatLngLiteral } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import Head from 'next/head'

const CoffeeDetailMap = ({ lat, lng }: LatLngLiteral) => {

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://a.tile.openstreetmap.org" crossOrigin='' />
                <link rel="preconnect" href="https://b.tile.openstreetmap.org" crossOrigin='' />
                <link rel="preconnect" href="https://c.tile.openstreetmap.org" crossOrigin='' />
            </Head>
            <MapContainer center={{ lat, lng }} zoom={16} scrollWheelZoom={true} style={{
                height: "100%", width: "100%", minHeight: '400px', zIndex: "9"
            }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={{ lat, lng }} />
            </MapContainer >
        </>
    )
}

export default CoffeeDetailMap