export interface TrendMetric {
  label: string;
  value: string;
}

export interface TrendSeries {
  name: string;
  color: string;
  dataKey: string;
}

export interface TrendAnalyticsData {
  title: string;
  xAxisKey: string;
  data: Record<string, any>[];
  series: TrendSeries[];
  metrics?: TrendMetric[];
}

export interface TrendAnalyticsChartProps {
  chartData: TrendAnalyticsData;
}
