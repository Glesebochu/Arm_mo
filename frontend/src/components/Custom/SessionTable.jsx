import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";
import { ResponsiveContainer } from "recharts";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import "@/Styles/CustomStyles.css";

function customFilterFn(rows, columnIds, filterValue) {
  return rows.filter((row) => {
    const rowData = row.values[columnIds[0]].toLowerCase();
    return rowData.includes(filterValue.toLowerCase());
  });
}

export function DataTable({ onSessionClick }) {
  const [sorting, setSorting] = useState([]);
  const user = useSelector((state) => state.Auth.user.user);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [swaggerData, setSwaggerData] = useState([]);
  const [deleteSessionId, setDeleteSessionId] = useState(null); // new state
  const [showDeletePrompt, setShowDeletePrompt] = useState(false); // new state
  const navigate = useNavigate();

  const handleFilterChange = (value) => {
    setColumnFilters([{ id: "meditationObject", value }]);
  };

  const handleDeleteSessionClick = (sessionId) => {
    setDeleteSessionId(sessionId);
    setShowDeletePrompt(true);
  };

  const handleDeleteSession = async (sessionIds) => {
    try {
      if (Array.isArray(sessionIds)) {
        await Promise.all(
          sessionIds.map(async (sessionId) => {
            await axios.delete(
              `http://localhost:5158/api/Analyzer/DeleteSession?sessionId=${sessionId}`
            );
          })
        );
      } else {
        await axios.delete(
          `http://localhost:5158/api/Analyzer/DeleteSession?sessionId=${sessionIds}`
        );
      }
      setSwaggerData((prevData) =>
        prevData.filter((session) => !sessionIds.includes(session.id))
      );
      setShowDeletePrompt(false);
      window.location.reload(); // Refresh the screen after deleting
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
    setDeleteSessionId(null);
  };

  useEffect(() => {
    console.log("For data table",user);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Analyzer/GetSessionsForMeditator?meditatorId=${user.id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const transformedData = response.data.map((session) => ({
            id: session.id,
            time: `${new Date(
              session.startDateTime
            ).toLocaleDateString()} , ${new Date(session.startDateTime)
              .toLocaleTimeString()
              .substring(0, 5)} - ${new Date(session.endDateTime)
              .toLocaleTimeString()
              .substring(0, 5)}`,
            ahaMoments: session.ahaMoments.length,
            masteredStages: session.newlyMasterdStages
              .map((stage) => `Stage ${stage.stageId}`)
              .join(", "),
            practicedStages: session.practicedStages
              .map((stage) => `Stage ${stage.stageId}`)
              .join(", "),
            observableObjects: session.observableObjects
              .map((obj) => obj.title)
              .join(", "),
            activity:
              session.preparationPhase?.goals[0]?.parentGoal &&
              session.preparationPhase?.goals[0]?.parentGoal.activity?.title
                ? `${session.preparationPhase.goals[0].parentGoal.activity.title} `
                : session.preparationPhase?.goals[0]?.activity?.title
                ? `${session.preparationPhase.goals[0].activity.title} `
                : "undefined",
            meditationObject:
              session.preparationPhase?.goals[0]?.parentGoal &&
              session.preparationPhase?.goals[0]?.parentGoal.meditationObject
                ?.title
                ? `${session.preparationPhase.goals[0].parentGoal.meditationObject.title} `
                : session.preparationPhase?.goals[0]?.meditationObject?.title
                ? `${session.preparationPhase.goals[0].meditationObject.title} `
                : "undefined",
          }));
          setSwaggerData(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

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
      accessorKey: "id",
      header: () => <div>Id</div>,
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "activity",
      header: () => <div>Activity</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("activity")}</div>
      ),
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("time")}</div>
      ),
    },
    {
      accessorKey: "ahaMoments",
      header: () => <div>Aha Moments</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("ahaMoments"));
        return <div>{amount}</div>;
      },
    },
    {
      accessorKey: "practicedStages",
      header: () => <div>Practiced Stages</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("practicedStages")}</div>
      ),
    },
    {
      accessorKey: "meditationObject",
      header: () => <div>Meditation Object</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("meditationObject")}</div>
      ),
    },
    // {
    //   accessorKey: "observableObjects",
    //   header: () => <div>Observable Objects</div>,
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("observableObjects")}</div>
    //   ),
    // },
    {
      accessorKey: "masteredStages",
      header: "Mastered Stage",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("masteredStages")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const selectedSession = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click event
                  handleDeleteSessionClick(selectedSession.id);
                }}
              >
                Remove Session
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Session</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: swaggerData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel({
      filterFns: {
        observableObjects: customFilterFn,
      },
    }),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const toggleColumnVisibility = (columnId, isVisible) => {
    setColumnVisibility((old) => ({
      ...old,
      [columnId]: isVisible,
    }));
  };

  const handleRowClick = (session) => {
    if (onSessionClick) {
      onSessionClick(session.id);
    }
  };

  return (
    <ResponsiveContainer>
      <div className="container">
        <div className="flex items-center py-4">
          <div className="px-4">
            <Input
              placeholder="Filter Sessions..."
              value={
                columnFilters.find((f) => f.id === "meditationObject")?.value ||
                ""
              }
              onChange={(event) => handleFilterChange(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                        toggleColumnVisibility(column.id, value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="table-container rounded-md border">
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={
                      row.original.masteredStages &&
                      row.original.masteredStages.length > 0
                        ? "mastered-stage-row"
                        : ""
                    }
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === "select" ? (
                          <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                              row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                            onClick={(e) => e.stopPropagation()} // Prevent row click event
                          />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
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
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const selectedRows = table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original.id);
                  handleDeleteSessionClick(selectedRows);
                }}
              >
                Remove
              </Button>
            )}
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
      {showDeletePrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 transform ${
              showDeletePrompt ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Remove</h2>
            <p className="mb-6">
              {Array.isArray(deleteSessionId) && deleteSessionId.length > 1
                ? "Are you sure you want to remove these sessions?"
                : "Are you sure you want to remove this session?"}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-grey-900"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteSession(deleteSessionId)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </ResponsiveContainer>
  );
}
