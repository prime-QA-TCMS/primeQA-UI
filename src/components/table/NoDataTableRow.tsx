import { TableCell, TableRow } from "@mui/material";
import { NoDataTableRowProps } from "./types";

export function NoDataTableRow<T>({columns, message = "No records found." }: Readonly<NoDataTableRowProps<T>>) {
  
  return (
    <TableRow>
      <TableCell colSpan={columns.length + 1} align="center">
        {message}
      </TableCell>
    </TableRow>
  );
}
