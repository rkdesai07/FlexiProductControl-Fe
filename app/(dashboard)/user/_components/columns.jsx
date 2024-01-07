"user client"

import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2 } from "lucide-react"
import { DataTableColumnHeader } from "./columns-header"

export const UserTableColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "emp_no",
        header: "Employee No.",
    },

    {
        accessorKey: "firstname",
        header: "FirstName",
    },

    {
        accessorKey: "lastname",
        header: "LastName",
    },

    {
        accessorKey: "dob",
        header: "Date Of Birth",
    },

    {
        accessorKey: "email",
        header: "Email",
    },

    {
        accessorKey: "username",
        header: "UserName",
    },

    {
        accessorKey: "password",
        header: "Password",
    },

    {
        accessorKey: "action",
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-x-4 cursor-pointer">
                    <div className="p-1.5 hover:text-blue-500 transition-all hover:bg-primary/20 hover:rounded-sm">
                        <Pencil className="w-[15px] h-[15px]" />
                    </div>
                    <div className="p-1.5 hover:text-blue-500 transition-all hover:bg-primary/20 hover:rounded-sm">
                        <Trash2 className="w-[15px] h-[15px]" />
                    </div>
                </div>
            )
        },
    },
]