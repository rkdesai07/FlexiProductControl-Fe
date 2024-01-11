"use client"

//** React imports */
import React, { useMemo, useState } from 'react'

//** Third party imports */
import { format } from 'date-fns'
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBar from 'react-perfect-scrollbar';
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { flexRender, getCoreRowModel, useReactTable, SortingState } from "@tanstack/react-table"

//** shadcn-ui imports */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'

//** Custom imports */
import useUserStore from '@/hooks/use-user-store'
import { DataTableViewOptions } from './table-view-options'
import { DataTablePagination } from './user-table-pagination'

const UserTable = () => {
    //** State */
    const [sorting, setSorting] = useState([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState([])
    const {
        userData,
        editUser,
        deleteUser,
        onOpenUserDrawer,
    } = useUserStore()

    const columns = useMemo(
        () => ([
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
                accessorKey: "id",
                header: "Emp No.",


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
                cell: ({ row, getValue }) => (
                    <div className='min-w-24'>
                        <p>{format(new Date(row.original.dob), "dd-MMM-yyyy")}</p>
                    </div>
                )

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
                cell: ({ row, getValue }) => {
                    return (
                        <div className="flex items-center gap-x-4 cursor-pointer">
                            <Button
                                variant='icon'
                                onClick={() => deleteUser(row.original.id)}
                                className='hover:text-blue-500 transition-all hover:bg-primary/20 hover:rounded-sm'>
                                <Pencil className="w-[15px] h-[15px]" />
                            </Button>
                            <Button
                                variant='icon'
                                onClick={() => editUser(row.original.id)}
                                className='hover:text-blue-500 transition-all hover:bg-primary/20 hover:rounded-sm'>
                                <Trash2 className="w-[15px] h-[15px]" />
                            </Button>
                        </div>
                    )
                },
            },
        ]), [])

    const table = useReactTable({
        data: userData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel,
        onSortingChange: setSorting,
        getSortedRowModel,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <>
            <div className='w-full max-h-screen'>
                <div className="flex items-center justify-between py-4">
                    <h2 className='text-xl font-medium'>User Management</h2>
                    <div className='flex items-center gap-x-4 relative'>
                        <Input
                            name="Search"
                            placeholder="Search"
                            className={cn('pl-8 max-w-sm')}
                            value={(table.getColumn("email")?.getFilterValue())}
                            onChange={(event) =>
                                table.getColumn("email")?.setFilterValue(event.target.value)
                            }
                        />
                        <Search className='absolute left-2 top-[10px] w-[18px] h-[18px] text-muted-foreground dark:text-white' />
                        <Button
                            onClick={onOpenUserDrawer}
                            className={cn('gap-x-2')}><Plus className='w-[18px] h-[18px]' />Add User
                        </Button>
                        {/* <AddUser /> */}
                        <DataTableViewOptions table={table} />
                    </div>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserTable