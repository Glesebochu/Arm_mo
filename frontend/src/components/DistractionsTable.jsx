import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DistractionsTable({
  rows,
  onRowChange,
  onAddRow,
  onDeleteRow,
}) {
  const handleTitleChange = (index, event) => {
    const newTitle = event.target.value;
    onRowChange(index, newTitle, rows[index].type);
  };

  const handleTypeChange = (index, value) => {
    onRowChange(index, rows[index].title, value);
  };
  // const handleDeleteRow = (index) => {};

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="text"
                  placeholder="e.g., Restlessness"
                  value={row.title}
                  onChange={(event) => handleTitleChange(index, event)}
                />
              </TableCell>
              <TableCell>
                <Select
                  value={row.type}
                  onValueChange={(event) => handleTypeChange(index, event)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="Doubt">Doubt</SelectItem>
                      <SelectItem value="Worry_Remorse">
                        Worry_Remorse
                      </SelectItem>
                      <SelectItem value="Lethargy_Laziness">
                        Lethargy_Laziness
                      </SelectItem>
                      <SelectItem value="Aversion">Aversion</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button onClick={(index) => onDeleteRow(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={onAddRow}
        variant="outline"
        size="sm"
        className="ml-[10px] mt-[10px] w-[80px] p-4 font-bold"
      >
        Add Row
      </Button>
    </div>
  );
}
