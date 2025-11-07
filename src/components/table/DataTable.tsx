import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
  Box,
  TableRow,
  TableCell,
  Collapse,
} from "@mui/material";
import { DataTableProps } from "./types";
import { TableHeader } from "./TableHeader";
import { DataLoading } from "./DataLoading";
import { NoDataTableRow } from "./NoDataTableRow";
import { DataRow } from "./DataRow";
import { NestedTable } from "./NestedTable";

export function DataTable<T extends { _id?: string | number }>({
  title,
  data,
  columns,
  nestedConfig,
  loading = false,
  emptyMessage = "No records found.",
  rowComponent,
  rowExtraComponent,
  nestedHeaderComponent,
}: Readonly<DataTableProps<T>>) {
  const [openRowId, setOpenRowId] = useState<string | number | null>(null);

  const handleToggle = (id: string | number) => {
    setOpenRowId(openRowId === id ? null : id);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      {title && (
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
          {title}
        </Typography>
      )}

      <Table>
        <TableHeader
          columns={columns}
          hasNested={!!nestedConfig}
          hasActions={!!rowComponent}
        />
        <TableBody>
          {loading ? (
            <DataLoading columns={columns} />
          ) : data.length === 0 ? (
            <NoDataTableRow columns={columns} message={emptyMessage} />
          ) : (
            data.map((item) => {
              const id = item._id ?? Math.random().toString();
              const isOpen = openRowId === id;

              return (
                <React.Fragment key={id}>
                  {/* ✅ Main Data Row */}
                  <DataRow
                    item={item}
                    id={id}
                    isOpen={isOpen}
                    onToggle={handleToggle}
                    columns={columns}
                    rowComponent={rowComponent}
                    nestedConfig={nestedConfig}
                  />

                  {/* ✅ Optional inline row content (below main row) */}
                  {rowExtraComponent && (
                    <TableRow>
                      <TableCell colSpan={columns.length + (nestedConfig ? 1 : 0)}>
                        <Box sx={{ p: 1 }}>{rowExtraComponent(item)}</Box>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* ✅ Nested expandable section */}
                  {nestedConfig && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} sx={{ p: 0 }}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2 }}>
                            {/* Optional nested header component */}
                            {nestedHeaderComponent && (
                              <Box
                                sx={{
                                  mb: 2,
                                  backgroundColor: "rgba(0,0,0,0.03)",
                                  borderRadius: 1,
                                  p: 2,
                                }}
                              >
                                {nestedHeaderComponent(item)}
                              </Box>
                            )}
                            {/* Nested table content */}
                            <NestedTable
                              columns={columns}
                              nestedConfig={nestedConfig}
                              isOpen={isOpen}
                              item={item}
                            />
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
