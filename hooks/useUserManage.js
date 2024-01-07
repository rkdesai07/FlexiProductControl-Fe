import { create } from "zustand";

export const useUserManagement = create((set) => ({
    //** This state responsible for open or close Add-User Modal (pop) */
    isOpenUserDrawer: false,
    onOpenUserDrawer: () => set({ isOpenUserDrawer: true }),
    onCloseUserDrawer: () => set({ isOpenUserDrawer: false }),

}))