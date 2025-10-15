import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


interface FeedbarState {
    open: boolean
    openFeedbar: () => void
    closeFeedbar: () => void
}

export const useFeedStore = create<FeedbarState>()(
    devtools(
        (set) => ({
            open: false,
            openFeedbar: () => set((state) => ({ open: true })),
            closeFeedbar: () => set((state) => ({ open: false }))
        }),
        {
            name: 'feedbar-storage',
        }
    )
)