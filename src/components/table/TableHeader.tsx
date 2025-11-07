import { TableCell, TableHead, TableRow } from "@mui/material";
import { TableHeaderProps } from "./types";

export function TableHeader<T>({
  columns,
  hasNested = false,
  hasActions = false,
}: Readonly<TableHeaderProps<T>>) {
  return (
    <TableHead>
      <TableRow>
        {hasNested && <TableCell width="5%" />}
        {columns.map((col) => (
          <TableCell key={String(col.key)} align={col.align || "left"}>
            {col.label}
          </TableCell>
        ))}
        {hasActions && <TableCell align="center">Actions</TableCell>}
      </TableRow>
    </TableHead>
  );
}
