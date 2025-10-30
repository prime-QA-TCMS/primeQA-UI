// src/types/components/TrendAnalyticsChart.ts
export interface TrendMetric {
  label: string;
  value: string;
}

export interface TrendSeries {
  name: string;           // e.g. "Passed"
  color: string;          // line color (#hex)
  dataKey: string;        // key used in dataset
}

export interface TrendAnalyticsData {
  title: string;          // e.g. "7-Day Execution Trend"
  xAxisKey: string;       // e.g. "day"
  data: Record<string, any>[]; // array of day→values
  series: TrendSeries[];  // e.g. Passed, Failed, Blocked
  metrics?: TrendMetric[]; // bottom summary metrics
}

export interface TrendAnalyticsChartProps {
  chartData: TrendAnalyticsData;
}
