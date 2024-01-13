//** Third party imports */
import { create } from "zustand";

//** Custom imports */
import { UserData } from "@/public/data/user-data";
import { toast } from "@/components/ui/use-toast";

const useUserStore = create((set) => ({
    isOpenUserDrawer: false,

    userData: UserData,

    userInitialValue: {
        id: '',
        firstname: '',
        lastname: '',
        dob: new Date(),
        email: '',
        username: '',
        password: '',
        // confirm_password: ''
    },

    onOpenUserDrawer: () => set({ isOpenUserDrawer: true }),

    onCloseUserDrawer: () => {
        set((state) => {
            const InitialValue = {
                id: '',
                firstname: '',
                lastname: '',
                dob: new Date(),
                email: '',
                username: '',
                password: '',
                // confirm_password: ''
            }
            return (
                state.isOpenUserDrawer = false,
                state.userInitialValue = InitialValue
            )
        })
    },

    addUser: (user) => set((state) => ({ userData: [...state.userData, user] })),

    editUser: (userId, drawerOpen) => {
        set((state) => {
            const userArray = [...state.userData] || []
            const userInitialValue = userArray.find((user) => user.id === userId);
            state.isOpenUserDrawer = true
            return {
                userInitialValue: userInitialValue,
            };
        });
    },

    updateUser: (userId, updateUser) => {
        set((state) => {
            const userArray = [...state.userData] || [];
            const index = userArray.findIndex((user) => user.id === userId);
            if (index !== -1) {
                // User found, update the array without changing the index
                userArray[index] = updateUser;
            } else {
                // User not found, add to the array
                userArray.push(updateUser);
            }
            return {
                userData: [...userArray],
            };
        });
        toast({
            title: "User updated successfully.",
        });
    },

    deleteUser: (userId) => {
        set((state) => ({
            userData: state.userData.filter((user) => user.id !== userId),
        }))
        toast({
            title: "User delete successfully. ",
        })
    },
}))

export default useUserStore;
