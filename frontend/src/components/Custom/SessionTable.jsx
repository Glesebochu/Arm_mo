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
import DeleteSessionPrompt from "./DeleteSessionPrompt"; // import the prompt component

function customFilterFn(rows, columnIds, filterValue) {
  return rows.filter((row) => {
    const rowData = row.values[columnIds[0]].toLowerCase();
    return rowData.includes(filterValue.toLowerCase());
  });
}

export function DataTableDemo({ onSessionClick }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [swaggerData, setSwaggerData] = useState([]);
  const [deleteSessionId, setDeleteSessionId] = useState(null); // new state
  const [showDeletePrompt, setShowDeletePrompt] = useState(false); // new state
  const navigate = useNavigate();

  const handleFilterChange = (value) => {
    setColumnFilters([{ id: "observableObjects", value }]);
  };

  const handleDeleteSessionClick = (sessionId) => {
    setDeleteSessionId(sessionId);
    setShowDeletePrompt(true);
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await axios.delete(
        `http://localhost:5158/api/Analyzer/DeleteSession?sessionId=${sessionId}`
      );
      setSwaggerData((prevData) =>
        prevData.filter((session) => session.id !== sessionId)
      );
      setShowDeletePrompt(false);
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePrompt(false);
    setDeleteSessionId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/Analyzer/GetSessionsForMeditator?meditatorId=1"
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
      accessorKey: "observableObjects",
      header: () => <div>Observable Objects</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("observableObjects")}</div>
      ),
    },
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
        const payment = row.original;
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
                  handleDeleteSessionClick(payment.id);
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
                columnFilters.find((f) => f.id === "observableObjects")
                  ?.value || ""
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
        <DeleteSessionPrompt
          sessionId={deleteSessionId}
          onDelete={handleDeleteSession}
          onCancel={handleCancelDelete}
        />
      )}
    </ResponsiveContainer>
  );
}
