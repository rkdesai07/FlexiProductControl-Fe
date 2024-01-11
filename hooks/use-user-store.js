//** Third party imports */
import { create } from "zustand";

//** Custom imports */
import { UserData } from "@/public/data/user-data";

const useUserStore = create((set) => ({
    //** This state responsible for open or close Add-User Modal (pop) */
    isOpenUserDrawer: false,
    onOpenUserDrawer: () => set({ isOpenUserDrawer: true }),
    onCloseUserDrawer: () => set({ isOpenUserDrawer: false }),

    //** This state responsible for add, update, delete, user management */
    userData: UserData,

    userInitialValue: {
        id: '',
        firstname: '',
        lastname: '',
        dob: new Date(),
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    },

    addUser: (user) => set((state) => ({ userData: [...state.userData, user] })),

    updateUser: (userId, updateUser) => set((state) => ({
        userData: state.userData.map((user) =>
            user.id === userId ? { ...user, ...updateUser } : user
        ),
    })),

    deleteUser: (userId) => set((state) => ({ userData: state.userData.filter((user) => user.id !== userId), })),
}))

export default useUserStore;
