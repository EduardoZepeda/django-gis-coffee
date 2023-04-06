import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect, useRef, useMemo, useCallback, useId } from 'react'
import { LatLngLiteral, LocationEvent, Marker as MarkerType } from 'leaflet'
import { GdlLocation } from '@components/GuadalajaraLocation';
import { CustomMarker } from '@components/CustomMarker';
import { shopsByLocation } from '@urls/index'
import Link from 'next/link'

export const LocationMarker = () => {
    // If map clicked, won't ask for location again
    const [firstClick, setFirstClick] = useState<boolean>(true)
    // Position is set when clicked, drag a marker or accepted location request
    const [position, setPosition] = useState<LatLngLiteral>(GdlLocation)
    const [coffeeShops, setCoffeeShops] = useState<CoffeeShops | undefined>()
    // Disables or activates marker draggable status
    const [draggable, setDraggable] = useState<boolean>(true)
    const markerRef = useRef<MarkerType | null>(null)

    useEffect(() => { }, [position])


    const eventHandlers = useMemo(
        () => ({
            // If marker is dragged, search coffee shops where drags end
            dragend() {
                const marker: MarkerType | null = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    fetchCoffeeShopsData(marker.getLatLng())
                }
            },
        }),
        [],
    )

    // Toggle between draggable status, taken from docs
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    // Search coffee shops by latitude and longitude
    const fetchCoffeeShopsData = async ({ lat, lng }: LatLngLiteral) => {
        const response = await fetch(shopsByLocation + `?longitude=${lng}&latitude=${lat}`);
        const coffeeShops = await response.json();
        setCoffeeShops(coffeeShops)
    }

    const map = useMapEvents({
        // if clicked for the first time, ask for location
        // otherwise take clicked point as the location to search nearest coffee shops
        click(e) {
            if (firstClick) {
                setPosition(e.latlng)
                setFirstClick(false)
                map.locate()
            } else {
                setPosition(e.latlng)
                fetchCoffeeShopsData(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            }
        },
        // if user accepts location request, take the clicked point as the location to search nearest coffee shops
        locationfound(e: LocationEvent) {
            setPosition(e.latlng)
            fetchCoffeeShopsData(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
        locationerror(e) {
            fetchCoffeeShopsData(position)
        }
    })
    const marker = useId()
    return (
        <>
            {/* if coffee shops render them otherwise set draggable marker */}
            {coffeeShops?.results?.features ? coffeeShops?.results?.features?.map(({ geometry: { coordinates }, properties, id }, index) => {
                const formatedCoordinates: LatLngLiteral = { lat: coordinates[1], lng: coordinates[0] }
                return (
                    <CustomMarker key={`${marker}-${index}`} coordinates={formatedCoordinates} {...properties} id={id} />
                )
            }) : (null)
            }
            <Marker
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable
                            ? 'Marker is draggable'
                            : 'Click here to make marker draggable'}
                    </span>
                </Popup>
            </Marker>
        </>
    )
}
