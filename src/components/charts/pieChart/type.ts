export interface chartData {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

export interface statusSummaryProps {
  title?: string;
  data: chartData[];
  onRefresh?: () => void;
  onExportCsv?: () => void;
}