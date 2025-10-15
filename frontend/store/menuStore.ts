import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


interface MenuState {
    open: boolean
    openMenu: () => void
    closeMenu: () => void
    toggleMenu: () => void
}

export const useMenuStore = create<MenuState>()(
    devtools(
        (set) => ({
            open: false,
            openMenu: () => set((state) => ({ open: true })),
            closeMenu: () => set((state) => ({ open: false })),
            toggleMenu: () => set((state) => ({ open: !open }))
        }),
        {
            name: 'menu-storage',
        }
    )
)