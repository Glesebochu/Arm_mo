import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default DistractionsTable = (props) => {
  const [rows, setRows] = useState([{ title: "", type: "" }]);

  const handleTitleChange = (index, event) => {
    const newTitle = event.target.value;
    const newRows = [...rows];
    newRows[index].title = newTitle;
    setRows(newRows);
    props.onRowChange(index, newTitle, rows[index].type);
  };

  const handleTypeChange = (index, event) => {
    const newType = event.target.value;
    const newRows = [...rows];
    newRows[index].type = newType;
    setRows(newRows);
    props.onRowChange(index, rows[index].title, newType);
  };

  const handleAddRow = () => {
    const newRows = [...rows, { title: "", type: "" }];
    setRows(newRows);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Title</TableHead >
            <TableHead >Type</TableHead >
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell >
                <input
                  type="text"
                  value={row.title}
                  onChange={(event) => handleTitleChange(index, event)}
                />
              </TableCell >
              <TableCell >
                <input
                  type="text"
                  value={row.type}
                  onChange={(event) => handleTypeChange(index, event)}
                />
              </TableCell >
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow}>Add Row</Button>
    </div>
  );
};

