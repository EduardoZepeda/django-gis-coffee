import React from "react"
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import RenderStars from "./RenderStars"

export const CustomMarker = ({ coordinates, name, address, roaster, rating }: CustomMarkerProps) => {

    return (
        <Marker position={coordinates}>
            <Popup>{ }</Popup>
            <Tooltip direction="bottom" offset={[0, 20]} opacity={0.8} permanent>
                <div><strong>{name}</strong></div>
                <small>{address}</small>
                <div><RenderStars rating={rating} /></div>
                <div>{roaster ? <FontAwesomeIcon icon={faFire} /> : null}</div>
            </Tooltip>
        </Marker >
    )
}