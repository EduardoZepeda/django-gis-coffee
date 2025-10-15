import React from "react"
import { Marker, Tooltip } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import RenderStars from "./RenderStars"
import Router from "next/router"

export const CustomMarker = ({ coordinates, name, address, roaster, rating, id }: CustomMarkerProps) => {
    const router = Router


    return (
        <Marker eventHandlers={{
            click: (e) => {
                router.push(`/coffee-shops/${id}`)
            },
        }} position={coordinates} >
            <Tooltip eventHandlers={{
                click: (e) => {
                    router.push(`/coffee-shops/${id}`)
                },
            }} direction="bottom" offset={[0, 20]} opacity={0.8} permanent>
                <div><strong>{name}</strong></div>
                <small>{address}</small>
                <div><RenderStars rating={rating} /></div>
                <div>{roaster ? <FontAwesomeIcon icon={faFire} /> : null}</div>
            </Tooltip>
        </Marker >
    )
}