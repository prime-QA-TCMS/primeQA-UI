import React from 'react';
import { CircularProgress, Box, Typography, Divider } from '@mui/material';

interface ProgressItem {
    id: number;
    value: number;
    title: string;
}

interface CircularProgressListProps {
    items: ProgressItem[];
}

const CircularProgressList: React.FC<CircularProgressListProps> = ({ items }) => {
    return (
        <Box>
            {items.map((item, index) => (
                <Box key={item.id} sx={{ marginBottom: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant="determinate" value={item.value} size={80} thickness={5} />
                            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
                                <Typography variant="h6" component="div" color="text.secondary">
                                    {`${Math.round(item.value)}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ marginLeft: 2 }}>{item.title}</Typography>
                    </Box>
                    {index < items.length - 1 && <Divider sx={{ marginY: 2 }} />}
                </Box>
            ))}
        </Box>
    );
};

export default CircularProgressList;
