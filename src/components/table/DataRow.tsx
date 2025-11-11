import { TableCell, TableRow, IconButton } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { DataRowProps } from "./types";

export function DataRow<T>({item, columns, id, isOpen, onToggle, rowComponent, nestedConfig}: Readonly<DataRowProps<T>>) {

  return (
    <TableRow hover  onClick={() => onToggle(id)}>
      {nestedConfig && (
        <TableCell width="5%">
          <IconButton size="small">{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</IconButton>
        </TableCell>
      )}
      {columns.map((col) => (
        <TableCell key={String(col.key)} align={col.align || "left"}>{col.render ? col.render(item) : (item as any)[col.key]}</TableCell>
      ))}
      {rowComponent && <TableCell align="center">{rowComponent(item)}</TableCell>}
    </TableRow>
  );
}
