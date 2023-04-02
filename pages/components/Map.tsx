
import { MapContainer, TileLayer } from 'react-leaflet'
import { GdlLocation } from '@components/GuadalajaraLocation';
import { LocationMarker } from '@components/LocationMarker'


const Map = () => {

    return (
        <MapContainer center={GdlLocation} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )
}

export default Map
