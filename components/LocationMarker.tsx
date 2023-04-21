import { Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet'
import { useRef, useMemo, useEffect, useId } from 'react'
import { LatLngLiteral, LocationEvent, Marker as MarkerType } from 'leaflet'
import { CustomMarker } from '@components/CustomMarker';
import { useMapStore } from '@store/mapStore';
import { fetchGet } from '@fetchUtils/useFetch';
import { useQuery } from 'react-query';
import { coffeeList } from '@urls/index';
import ButtonLoader from '@components/ButtonLoader';
import Error from '@components/Error';

export const LocationMarker = () => {
    // If map clicked, won't ask for location again
    const isFirstClick = useMapStore((state) => state.isFirstClick)
    const setFirstClick = useMapStore((state) => state.setFirstClick)
    const position = useMapStore((state) => state.position)
    const setPosition = useMapStore((state) => state.setPosition)
    const isDraggable = useMapStore((state) => state.isDraggable)
    const toggleIsDraggable = useMapStore((state) => state.toggleIsDraggable)
    const coffeeShops = useMapStore((state) => state.coffeeShops)
    const setCoffeeShops = useMapStore((state) => state.setCoffeeShops)
    // Position is set when clicked, drag a marker or accepted location request
    // Disables or activates marker draggable status
    const markerRef = useRef<MarkerType | null>(null)

    const { error, isLoading, refetch } = useQuery<CoffeeShops>({
        queryKey: ["map", position.lng, position.lat],
        queryFn: () => fetchGet(coffeeList({ "latitude": position.lat, "longitude": position.lng }), undefined),
        enabled: !isFirstClick,
        onSuccess: (data: CoffeeShops) => {
            setCoffeeShops(data?.results.features)
        }
    })

    const eventHandlers = useMemo(
        () => ({
            // If marker is dragged, search coffee shops where drags end
            dragend() {
                const marker: MarkerType | null = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    const map = useMapEvents({
        // if clicked for the first time, ask for location
        // otherwise take clicked point as the location to search nearest coffee shops
        click(e) {
            if (isFirstClick) {
                setPosition(e.latlng)
                setFirstClick()
                map.locate()
            } else {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            }
        },
        // if user accepts location request, take the clicked point as the location to search nearest coffee shops
        locationfound(e: LocationEvent) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
        locationerror(e) {
            refetch()
        }
    })
    const marker = useId()

    useEffect(() => {
        if (!isFirstClick) { refetch() }
    }, [position])

    return (
        <>
            {/* if coffee shops render them otherwise set draggable marker */}
            {coffeeShops?.map(({ geometry: { coordinates }, properties, id }, index) => {
                const formatedCoordinates: LatLngLiteral = { lat: coordinates[1], lng: coordinates[0] }
                return (
                    <CustomMarker key={`${marker}-${index}`} coordinates={formatedCoordinates} {...properties} id={id} />
                )
            })}
            <Marker
                draggable={isDraggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleIsDraggable}>
                        {isDraggable
                            ? 'Marker is draggable'
                            : 'Click here to make marker draggable'}
                    </span>
                </Popup>
                {isLoading ? <Tooltip direction="bottom" offset={[0, 20]} opacity={0.8} permanent><ButtonLoader /></Tooltip> : null}
                {error ? <Tooltip direction="bottom" offset={[0, 20]} opacity={0.8} permanent><Error message='There was an error' /></Tooltip> : null}
            </Marker>
        </>
    )
}
