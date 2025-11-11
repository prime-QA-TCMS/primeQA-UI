// types.ts
export interface Column<T> {
  key: keyof T | string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (item: T) => React.ReactNode;
}

export interface NestedConfig<T> {
  getNestedData: (item: T) => any[];
  nestedColumns: Column<any>[];
  loading?: boolean;
}

export interface DataTableProps<T> {
  title?: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  nestedConfig?: NestedConfig<T>;
  rowComponent?: (item: T) => React.ReactNode;
  nestedHeaderComponent?: (item: T) => React.ReactNode;
  rowExtraComponent?: (item: T) => React.ReactNode;
}

export interface DataLoadingProps<T> {
  columns: Column<T>[];
}

export interface DataRowProps<T> {
  item: T;
  columns: Column<T>[];
  id: string | number;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  rowComponent?: (item: T) => React.ReactNode;
  nestedConfig?: NestedConfig<T>;
}

export interface NestedTableProps<T> {
  columns: Column<T>[];
  nestedConfig?: NestedConfig<T>;
  isOpen: boolean;
  item: T;
  emptyMessage?: string;
}

export interface NoDataTableRowProps<T> {
  columns: Column<T>[];
  message?: string;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  hasNested?: boolean;
  hasActions?: boolean;
}
