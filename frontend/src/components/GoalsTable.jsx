import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    CaretSortIcon,
    ChevronDownIcon,
    ChevronRightIcon,
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
import { ObservableObjectPopover } from "./ObservableObjectPopover";
import { useDispatch } from "react-redux";
import { createGoal } from "../../slices/GoalsSlice";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { v4 as uuidv4 } from 'uuid';

export function GoalsTable({ goals = [], isSubGoals = false }) {

    const dispatch = useDispatch();

    const initialGoalState = {
        id: '',
        status: 'NotStarted',
        activity: {
            title: ''
        },
        meditationObject: {
            title: '',
            description: '',
            intensity: '',
            subType: '',
            proximityToMO: '',
        },
        dueDate: '',
        childGoals: [],
    };
    const [data, setData] = useState(goals);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    // const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});
    // const [newGoal, setNewGoal] = useState(initialGoalState);

    // useEffect(() => {
    //     console.log(data); // This will log the updated state
    // }, [data]);

    const handleDeleteGoal = (id) => {
        setData(data.filter((goal) => goal.id !== id));
    };

    const organizeGoals = (goals) => {
        const goalMap = new Map();

        // Create a map of goals by their id
        goals.forEach(goal => {
            goalMap.set(goal.id, { ...goal });
        });

        // Organize goals into parent-child relationships
        // goals.forEach(goal => {
        //     if (goal.parentGoal !== null) {
        //         const parentGoal = goalMap.get(goal.parentGoal);
        //         if (parentGoal) {
        //             parentGoal.childGoals.push(goalMap.get(goal.id));
        //         }
        //     }
        // });

        // Return only the top-level goals
        return Array.from(goalMap.values()).filter(goal => goal.parentGoal === null);
    };

    useEffect(() => {
        const organizedData = organizeGoals(goals);
        setData(organizedData);
        console.log(organizedData);
    }, [goals]);

    const handleCreateGoal = () => {
        const newId = `[new]-${uuidv4()}`;
        const newGoalData = { ...initialGoalState, id: newId }; // Ensure activity has title
        setData([...data, newGoalData]);
        setIsEditing(newId);
    };

    const handleSaveGoal = () => {
        setData((prevData) =>
            prevData.map((goal) => (goal.id === isEditing ? goal : goal))
        );
        setIsEditing(null);
    };

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setData((prevData) =>
            prevData.map((goal) =>
                goal.id === id ? { ...goal, [name]: value } : goal
            )
        );
    };

    const handleActivityChange = (e, id) => {
        const { value } = e.target;
        setData((prevData) =>
            prevData.map((goal) =>
                goal.id === id ? { ...goal, activity: { ...goal.activity, title: value } } : goal
            )
        );
    };

    const handleMeditationObjectChange = (value, id) => {
        setData((prevData) =>
            prevData.map((goal) =>
                goal.id === id ? { ...goal, meditationObject: value } : goal
            )
        );
    };

    const handleDateChange = (date, id) => {
        const formattedDate = date.toISOString().split('T')[0];
        setData((prevData) =>
            prevData.map((goal) =>
                goal.id === id ? { ...goal, dueDate: formattedDate } : goal
            )
        );
    };

    const handleToggleExpand = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const columns = React.useMemo(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
            id: 'toggle',
            cell: ({ row }) => (
                <Button variant="ghost" onClick={() => handleToggleExpand(row.original.id)} className="p-0">
                    {expandedRows[row.original.id] ? (
                        <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                    )}
                </Button>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isEditingRow = isEditing === row.original.id;
                const statusOptions = ['NotStarted', 'InProgress', 'Done'];
                return isEditingRow ? (
                    <Select onValueChange={(value) => handleInputChange({ target: { name: 'status', value } }, row.original.id)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={row.getValue('status')} />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map(option => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <div className="capitalize">{row.getValue('status')}</div>
                );
            },
        },
        {
            accessorKey: 'activity',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Activity
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isEditingRow = isEditing === row.original.id;
                const activityTitle = row.getValue('activity').title;
                return isEditingRow ? (
                    <Input
                        name="activity"
                        value={activityTitle}
                        onChange={(e) => handleActivityChange(e, row.original.id)}
                        className="w-full"
                    />
                ) : (
                    <div>{activityTitle}</div>
                );
            },
        },
        {
            accessorKey: 'meditationObject',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Meditation Object
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isEditingRow = isEditing === row.original.id;
                const meditationObject = row.getValue('meditationObject');
                return isEditingRow ? (
                    <ObservableObjectPopover className="w-full"
                        observableObject={meditationObject}
                        onSave={(updatedObject) => handleMeditationObjectChange(updatedObject, row.original.id)}
                        buttonClass="w-full"
                    />
                ) : (
                    <div>{meditationObject?.title}</div>
                );
            },
        },
        {
            accessorKey: 'dueDate',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Due Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const isEditingRow = isEditing === row.original.id;
                const dueDateValue = row.getValue('dueDate');
                const dueDate = dueDateValue ? new Date(dueDateValue) : null;

                return isEditingRow ? (
                    <DatePicker
                        initialDate={dueDate}
                        onDateChange={(date) => handleDateChange(date, row.original.id)}
                    />
                ) : (
                    <div>{dueDate ? format(dueDate, 'yyyy-MM-dd') : ''}</div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const isEditingRow = isEditing === row.original.id;
                return isEditingRow ? (
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleSaveGoal}>
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
                            <DropdownMenuItem onClick={() => setIsEditing(row.original.id)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteGoal(row.original.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },

    ], [isEditing, expandedRows]);

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
            editGoalId: isEditing,
        }
    });

    return (
        <div className="w-full">

            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter activities..."
                    value={(table.getColumn("activity")?.getFilterValue() ?? "")}
                    onChange={(event) =>
                        table.getColumn("activity")?.setFilterValue(event.target.value)
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
                                        <TableHead key={header.id} className="text-center">
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
                                    <React.Fragment key={row.id}>
                                        <TableRow key={`row-${row.id}`} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-center">
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {expandedRows[row.original.id] && (
                                            <TableRow key={`child-${row.original.id}`}>
                                                <TableCell colSpan={columns.length}>
                                                    <div className="ml-8 mr-8">
                                                        <GoalsTable goals={row.original.childGoals} isSubGoals={true} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            <TableRow key="no-results">
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}

                        {/* Add Button */}
                        <TableRow key="add-button">
                            <TableCell colSpan={columns.length} className="text-left">
                                <Button variant="outline" className="w-full" onClick={handleCreateGoal}>
                                    Add Goal
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
