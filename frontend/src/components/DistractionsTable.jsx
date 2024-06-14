import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialRows = [{ title: "", type: "" }];

export default function DistractionsTable({
  rows = initialRows,
  onRowChange,
  onAddRow,
}) {
  const [selectedTypes, setSelectedTypes] = useState(
    rows.map(() => "Select Type")
  );

  const handleTitleChange = (index, event) => {
    const newTitle = event.target.value;
    onRowChange(index, newTitle, rows[index].type);
  };

  const handleTypeChange = (index, selectedLabel) => {
    const newRows = [...rows];
    newRows[index].type = selectedLabel;
    onRowChange(index, rows[index].title, selectedLabel);

    const newSelectedTypes = [...selectedTypes];
    newSelectedTypes[index] = selectedLabel;
    setSelectedTypes(newSelectedTypes);
  };

  const handleAddRow = () => {
    const newRows = [...rows, { title: "", type: "" }];
    onAddRow(newRows);

    setSelectedTypes([...selectedTypes, "Select Type"]);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <input
                  type="text"
                  value={row.title}
                  onChange={(event) => handleTitleChange(index, event)}
                />
              </TableCell>
              <TableCell>
                <DropdownMenu
                  value={row.type}
                  onChange={(selectedLabel) =>
                    handleTypeChange(index, selectedLabel)
                  }
                >
                  <DropdownMenuTrigger>
                    {selectedTypes[index]}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem value="Worldly Desire">
                      Worldly Desire
                    </DropdownMenuItem>
                    <DropdownMenuItem value="Aversion">
                      Aversion
                    </DropdownMenuItem>
                    <DropdownMenuItem value="Lethargy / Laziness">
                      Lethargy / Laziness
                    </DropdownMenuItem>
                    <DropdownMenuItem value="Worry / Remorse">
                      Worry / Remorse
                    </DropdownMenuItem>
                    <DropdownMenuItem value="Doubt">Doubt</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow}>Add Row</Button>
    </div>
  );
}
