"use client"

// Imports
import React, { useState } from "react";
import { format } from "date-fns";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DatePicker } from "@/components/ui/date-picker";

// For obtaining data from the backend
import { useEffect } from "react";


export function GoalsTable({ goals = [] }) {
    console.log(goals);

    useEffect(() => {
        console.log(goals);
    }, [])

    if (goals == null)
        goals = [];

    // Columns for the data table
    const columns = [
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
            accessorKey: "Status",
            header: "Status",
            cell: ({ row, table }) => {
                const isEditing = table.getState().editGoalId === row.original.Id;
                return isEditing ? (
                    <Input
                        defaultValue={row.getValue("Status")}
                        onChange={(e) => row.updateData("Status", e.target.value)}
                    />
                ) : (
                    <div className="capitalize">{row.getValue("Status")}</div>
                );
            },
        },
        {
            accessorKey: "Activity",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Activity
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row, table }) => {
                const isEditing = table.getState().editGoalId === row.original.Id;
                return isEditing ? (
                    <Input
                        defaultValue={row.getValue("Activity")}
                        onChange={(e) => row.updateData("Activity", e.target.value)}
                    />
                ) : (
                    <div>{row.getValue("Activity")}</div>
                );
            },
        },
        {
            accessorKey: "MeditationObject",
            header: "Meditation Object",
            cell: ({ row, table }) => {
                const isEditing = table.getState().editGoalId === row.original.Id;
                return isEditing ? (
                    <Input
                        defaultValue={row.getValue("MeditationObject")}
                        onChange={(e) => row.updateData("MeditationObject", e.target.value)}
                    />
                ) : (
                    <div>{row.getValue("MeditationObject")}</div>
                );
            },
        },
        {
            accessorKey: "DueDate",
            header: () => <div className="text-right">Due Date & Time</div>,
            cell: ({ row, table }) => {
                const isEditing = table.getState().editGoalId === row.original.Id;
                const dueDate = new Date(row.getValue("DueDate"));
                return isEditing ? (
                    <DatePicker
                        initialDate={dueDate}
                        onDateChange={(date) => row.updateData("DueDate", date.toISOString())}
                    />
                ) : (
                    <div className="text-right font-medium">
                        {format(new Date(row.getValue("DueDate")), "PPP")}
                    </div>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row, table }) => {
                const goal = row.original;
                const isEditing = table.getState().editGoalId === row.original.Id;
                return isEditing ? (
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            table.setState({ ...table.getState(), editGoalId: null });
                            // Save changes (if needed)
                        }}
                    >
                        Save
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditGoalId(goal.Id)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteGoal(goal.Id)}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState(goals);
    const [editGoalId, setEditGoalId] = useState(null);

    const handleDeleteGoal = (id) => {
        setData(data.filter((goal) => goal.Id !== id));
    };

    const handleUpdateGoal = (id) => {
        setData(data.filter((goal) => goal.Id !== id));
    };

    const handleAddGoal = () => {
        const newGoal = {
            Id: data.length + 1,
            Status: "NotStarted",
            Activity: "New Activity",
            MeditationObject: "New Meditation Object",
            DueDate: new Date().toISOString(),
        };
        setData([...data, newGoal]);
    };


    const table = useReactTable({
        data: data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            editGoalId,
        }

    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter activities..."
                    value={(table.getColumn("Activity")?.getFilterValue() ?? "")}
                    onChange={(event) =>
                        table.getColumn("Activity")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            <>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}

                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}

                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleAddGoal}
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
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
    );
}
