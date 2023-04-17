
import { LatLngLiteral } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker } from 'react-leaflet'


const CoffeeDetailMap = ({ lat, lng }: LatLngLiteral) => {

    return (
        <MapContainer center={{ lat, lng }} zoom={16} scrollWheelZoom={true} style={{
            height: "100%", width: "100%", minHeight: '400px'
        }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={{ lat, lng }} />
        </MapContainer >
    )
}

export default CoffeeDetailMap