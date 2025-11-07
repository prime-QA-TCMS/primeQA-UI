import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { colorMap, MetricCardGridProps } from "./MetricCardType";
import { metricCardComponentStyle } from "../../../style/muiComponentStyles/sharedComponentStyles";

const MetricCardGrid: React.FC<MetricCardGridProps> = ({ data }) => {
  const theme = useTheme();
  const styles = metricCardComponentStyle(theme);

  return (
    <Grid container spacing={2} justifyContent="center" sx={styles.root}>
      {data.map((item, index) => {
        const trendDiff = item.trend ? item.trend.current - item.trend.original : null;
        const trendPositive = trendDiff !== null ? trendDiff > 0 : null;

        const trendColor = trendPositive && item.trend?.desiredOutcome === "incline" ? "green" : !trendPositive && item.trend?.desiredOutcome === "decline" ? "green" : "red";

        return (
          <Grid container key={index} sx={styles.card} >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1.5, borderRadius: "12px", backgroundColor: `${colorMap[item.color]}22`, color: colorMap[item.color], }} >
                {item.icon}
              </Box>

              <Typography variant="h6" fontWeight="bold" color={colorMap[item.color]} mt={1} >
                {item.value}
                {item.isPercentage && "%"}
              </Typography>

              {item.trend && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {trendPositive ? (<ArrowUpRight size={16} color={trendColor} />) : (<ArrowDownRight size={16} color={trendColor} />)}
                  <Typography variant="body2" sx={{ color: trendColor, fontWeight: 500 }} >
                    {trendPositive ? `+${Math.abs(trendDiff ?? 0).toFixed(1)}%` : `-${Math.abs(trendDiff ?? 0).toFixed(1)}%`}
                  </Typography>
                </Box>
              )}

              <Typography variant="body2" color="text.secondary">{item.title}</Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MetricCardGrid;
