import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  Box,
} from "@mui/material";
import { DataLoading } from "./DataLoading";
import { NoDataTableRow } from "./NoDataTableRow";
import { NestedTableProps } from "./types";
import { TableHeader } from "./TableHeader";

export function NestedTable<T>({
  columns,
  nestedConfig,
  isOpen,
  item,
  emptyMessage = "No records found.",
}: Readonly<NestedTableProps<T>>) {
  if (!nestedConfig) return null;
  const nestedData = nestedConfig.getNestedData(item);
  
  if (nestedConfig.loading) {
    return <DataLoading columns={columns} />;
  } else if (nestedData.length === 0) {
    return <NoDataTableRow columns={columns} message={emptyMessage} />;
  }

  return (
    <Table size="small">
      <TableHeader
        columns={nestedConfig.nestedColumns}
        hasNested={false}
        hasActions={false}
      />
      <TableBody>
        {nestedData.map((nItem, idx) => (
          <TableRow key={nItem._id || idx}>
            {nestedConfig.nestedColumns.map((nCol) => (
              <TableCell key={String(nCol.key)}>
                {nCol.render ? nCol.render(nItem) : nItem[nCol.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
