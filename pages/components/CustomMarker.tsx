import React, { useId } from "react"
import { Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { LatLngExpression } from "leaflet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, faFire } from '@fortawesome/free-solid-svg-icons'

type MarkerProps = {
    coordinates: LatLngExpression
    name: string;
    address?: string;
    roaster?: boolean;
    rating?: number;
}


export const CustomMarker = ({ coordinates, name, address, roaster, rating }: MarkerProps) => {
    function renderStars(rating: number) {
        // Render stars rating
        // ~~ is similar to math floor
        const list = [...Array.from(Array(~~rating).keys())]
        const stars = list.map((element) => <FontAwesomeIcon key={`${useId}-${element}`} icon={faStar} />)
        // Check if number ends in 0.5 if that's the case, add half a star
        if (rating - ~~rating === 0.5) {
            return [...stars, <FontAwesomeIcon icon={faStarHalf} />]
        }
        return stars
    }
    const starsId = useId()

    return (
        <Marker position={coordinates}>
            <Popup>{ }</Popup>
            <Tooltip direction="bottom" offset={[0, 20]} opacity={0.8} permanent>
                <div><strong>{name}</strong></div>
                <small>{address}</small>
                <div>{typeof rating === 'number' && rating > 0 ? renderStars(rating) : null}</div>
                <div>{roaster ? <FontAwesomeIcon icon={faFire} /> : null}</div>
            </Tooltip>
        </Marker >
    )
}