// src/types/components/MetricCard.ts

import { ReactNode } from "react";

export type MetricColor = "blue" | "green" | "red" | "yellow" | "orange" | "grey" | string;

export interface MetricTrend {
  original: number;
  current: number;
  desiredOutcome: "incline" | "decline";
}

export interface MetricCardData {
  icon: ReactNode;
  isPercentage: boolean;
  value: number;
  color: MetricColor;
  title: string;
  trend?: MetricTrend;
}

export interface MetricCardGridProps {
  data: MetricCardData[];
}

export const colorMap: Record<string, string> = {
  blue: "#2196F3",
  green: "#4CAF50",
  red: "#F44336",
  yellow: "#FFEB3B",
  orange: "#FF9800",
  grey: "#9E9E9E"
};