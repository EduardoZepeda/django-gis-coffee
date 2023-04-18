
import { MapContainer, TileLayer } from 'react-leaflet'
import { GdlLocation } from '@components/GuadalajaraLocation';
import { LocationMarker } from '@components/LocationMarker'
import Head from 'next/head';

const Map = () => {

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://a.tile.openstreetmap.org" crossOrigin='' />
                <link rel="preconnect" href="https://b.tile.openstreetmap.org" crossOrigin='' />
                <link rel="preconnect" href="https://c.tile.openstreetmap.org" crossOrigin='' />
            </Head>
            <MapContainer center={GdlLocation} zoom={12} scrollWheelZoom={true} style={{
                height: "100%", width: "100%", minHeight: '800px', zIndex: "9"
            }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer >
        </>
    )
}

export default Map
