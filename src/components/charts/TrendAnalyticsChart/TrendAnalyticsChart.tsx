import React from "react";
import { LineChart,Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { TrendAnalyticsChartProps } from "./types";

const TrendAnalyticsChart: React.FC<TrendAnalyticsChartProps> = ({ chartData }) => {
  const { title, xAxisKey, data, series, metrics } = chartData;

  return (
    <Box sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.12)", p: 3, width: "100%" }} >
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>{title}</Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s, idx) => (
            <Line key={idx} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {metrics && metrics.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {metrics.map((m, i) => (
              <Grid key={i}>
                <Typography variant="subtitle2" color="text.secondary">{m.label}</Typography>
                <Typography variant="body1" fontWeight={600}>{m.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default TrendAnalyticsChart;
