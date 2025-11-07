import React from 'react';
import { Box, Typography, Grid, IconButton, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import { statusSummaryProps } from './type';

const GenericPieChart: React.FC<statusSummaryProps> = ({ title, data, onRefresh, onExportCsv, }) => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
      <Box sx={{height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="count" nameKey="status" outerRadius={80} labelLine={false} >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color, mr: 1, }} />
              <Typography variant="body2" fontWeight="bold">{item.count} {item.status}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">{item.percentage}% set to {item.status}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: { xs: 'flex-end', md: 'flex-start' }, ml: 'auto', gap: 0.5, }} >
        {onRefresh ? <IconButton size="small" onClick={onRefresh}><RefreshIcon fontSize="small" /></IconButton> : null}
        {onExportCsv ? <IconButton size="small" onClick={onExportCsv}><DownloadIcon fontSize="small" /></IconButton> : null}
      </Box>
    </>
  );
};

export default GenericPieChart;
