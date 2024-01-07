"use client"

import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table"

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
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useUserManagement } from "@/hooks/useUserManage"
import { DataTableViewOptions } from './table-view-options'
import { DataTablePagination } from './user-table-pagination'

const UserTable = ({ columns, data }) => {
    //** State */
    const [sorting, setSorting] = useState([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState([])

    //** Hooks */
    const { onOpenUserDrawer } = useUserManagement()

    const table = useReactTable({
        data,
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
        <div>
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
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}

export default UserTable