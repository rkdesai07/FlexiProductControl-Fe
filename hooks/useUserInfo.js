//** Third-party imports */
import { create } from "zustand";

export const useUserInfo = create((set) => ({
    //** This state responsible for open or close Login modal (pop) */
    isOpenLogin: false,
    onOpenLogin: () => set({ isOpenLogin: true }),
    onCloseLogin: () => set({ isOpenLogin: false }),

    //** This state responsible for open or close Signup modal (pop) */
    isOpenSignup: false,
    onOpenSignup: () => set({ isOpenSignup: true }),
    onCloseSignup: () => set({ isOpenSignup: false })
}))