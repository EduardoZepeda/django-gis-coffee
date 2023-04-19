import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LatLngLiteral } from 'leaflet'
import { GdlLocation } from '@components/GuadalajaraLocation'

interface MapState {
    isFirstClick: boolean
    position: LatLngLiteral
    isDraggable: boolean
    coffeeShops: FeaturesEntity[] | null | undefined
    setFirstClick: () => void
    setPosition: (position: LatLngLiteral) => void
    toggleIsDraggable: () => void
    setCoffeeShops: (results: FeaturesEntity[] | null | undefined) => void
}

export const useMapStore = create<MapState>()(
    devtools(
        (set) => ({
            isFirstClick: true,
            position: GdlLocation,
            isDraggable: true,
            coffeeShops: [],
            setFirstClick: () => set(() => ({ isFirstClick: false })),
            setPosition: (position) => set(() => ({ position: position })),
            toggleIsDraggable: () => set((state) => ({ isDraggable: !state.isDraggable })),
            setCoffeeShops: (results) => set(() => ({ coffeeShops: results }))
        }),
        {
            name: 'feedbar-storage',
        }
    )
)