//** Third party imports */
import { create } from "zustand";

//** Custom imports */
import { toast } from "@/components/ui/use-toast";
import { ProductCategoryData } from "@/public/data/product-category-data";

const useProductCategory = create((set) => ({
    isOpenProductCategoryDrawer: false,

    productCategoryData: ProductCategoryData,

    productCategoryInitialValue: {
        id: '',
        categoryName: '',
        description: '',
        brandName: '',
        image: '',
    },

    onOpenProductCategoryDrawer: () => set({ isOpenProductCategoryDrawer: true }),

    onCloseProductCategoryDrawer: () => {
        set((state) => {
            const InitialValue = {
                id: '',
                categoryName: '',
                description: '',
                brandName: '',
                image: '',
            }
            return (
                state.isOpenProductCategoryDrawer = false,
                state.productCategoryInitialValue = InitialValue
            )
        })
    },

    addProductCategory: (category) => set((state) => ({ productCategoryData: [...state.productCategoryData, category] })),

    editProductCategory: (categoryId) => {
        set((state) => {
            const categoryArray = [...state.productCategoryData] || []
            const categroyInitialValue = categoryArray.find((category) => category.id === categoryId);
            state.isOpenProductCategoryDrawer = true
            return {
                productCategoryInitialValue: categroyInitialValue,
            };
        });
    },

    updateProductCategory: (categoryId, updatedData) => {
        set((state) => {
            const categoryArray = [...state.productCategoryData] || [];
            const index = categoryArray.findIndex((category) => category.id === categoryId);
            if (index !== -1) {
                // User found, update the array without changing the index
                categoryArray[index] = updatedData;
            } else {
                // User not found, add to the array
                categoryArray.push(updatedData);
            }
            return {
                productCategoryData: [...categoryArray],
            };
        });
        toast({
            title: "Category updated successfully.",
        });
    },

    deleteProductCategory: (categoryId) => {
        set((state) => ({
            productCategoryData: state.productCategoryData.filter((category) => category.id !== categoryId),
        }))
        toast({
            title: "Category delete successfully. ",
        })
    },
}))

export default useProductCategory;
