import { TableCell, TableRow, CircularProgress } from "@mui/material";
import { DataLoadingProps } from "./types";

export function DataLoading<T>({ columns }: Readonly<DataLoadingProps<T>>) {
  return (
    <TableRow>
      <TableCell colSpan={columns.length + 1} align="center">
        <CircularProgress size={24} />
      </TableCell>
    </TableRow>
  );
}
