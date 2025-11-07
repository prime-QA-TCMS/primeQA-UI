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

export function NestedTable<T>({
  columns,
  nestedConfig,
  isOpen,
  item,
}: Readonly<NestedTableProps<T>>) {
  if (!nestedConfig) return null;
  const nestedData = nestedConfig.getNestedData(item);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 2 }}>
            {nestedConfig.loading ? (
              <DataLoading columns={nestedConfig.nestedColumns} />
            ) : nestedData.length > 0 ? (
              <Table size="small">
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
            ) : (
              <NoDataTableRow columns={nestedConfig.nestedColumns} />
            )}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
