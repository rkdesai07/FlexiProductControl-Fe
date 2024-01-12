"use client"

//** React imports */
import React, { useMemo, useState } from 'react'

//** Third party imports */
import { format } from 'date-fns'
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBar from 'react-perfect-scrollbar';
import { Pencil, Plus, Search, Trash2, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"

//** shadcn-ui imports */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'

//** Custom imports */
import useUserStore from '@/hooks/use-user-store'
import { DataTableViewOptions } from './_components/table-view-options'
import { DataTablePagination } from './_components/user-table-pagination'

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
                enableSorting: true,
                enableHiding: true,
            },

            {
                accessorKey: "id",
                header: "Emp No.",
                cell: ({ row, getValue }) => {
                    return (
                        <div className='flex items-center justify-center'><p>{getValue()}</p></div>
                    )
                }
            },

            {
                accessorKey: "firstname",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>FirstName</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
            },

            {
                accessorKey: "lastname",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>LastName</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
            },

            {
                accessorKey: "dob",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>Dob</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
                cell: ({ row, getValue }) => (
                    <div className='min-w-24'>
                        <p>{format(new Date(row.original.dob), "dd-MMM-yyyy")}</p>
                    </div>
                )

            },

            {
                accessorKey: "email",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>Email</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
            },

            {
                accessorKey: "username",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>UserName</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
            },

            {
                accessorKey: "password",
                header: "Password",
                header: ({ table, column }) => {
                    return (
                        <div
                            role={'button'}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            className='flex items-center group/sort hover:opacity-100 transition-all duration-300'
                        >
                            <p>Password</p>
                            <ArrowUpDown className={`ml-2 h-4 w-4 group-hover/sort:opacity-100 opacity-0 transition-all duration-300`} />
                        </div>
                    )
                },
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
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        // getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <>
            <div className='h-full w-[100%] cursor-default'>
                <div className="flex items-center justify-between py-2 sticky top-0 bg-white">
                    <h2 className='text-xl font-medium'>User Management</h2>
                    <div className='flex items-center gap-x-4 relative'>
                        <Input
                            name="Search"
                            placeholder="Search"
                            className={cn('pl-8 max-w-sm')}
                            value={(table.getColumn("firstname" || "lastname")?.getFilterValue())}
                            onChange={(event) =>
                                table.getColumn("firstname")?.setFilterValue(event.target.value)
                            }
                        />
                        <Search className='absolute left-2 top-[10px] w-[18px] h-[18px] text-muted-foreground dark:text-white' />
                        <Button
                            onClick={onOpenUserDrawer}
                            className={cn('gap-x-2')}><Plus className='w-[18px] h-[18px]' />Add User
                        </Button>
                        <DataTableViewOptions table={table} />
                    </div>
                </div>
                <div className="rounded-md border h-[88%]">
                    <ScrollBar>
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className='sticky top-0 bg-white'>
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
                    </ScrollBar>
                </div>
            </div>
        </>
    )
}

export default UserTable