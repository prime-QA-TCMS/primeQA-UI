// src/components/CircularProgressList.tsx
import React from 'react';
import { CircularProgress, Box, Typography, Divider } from '@mui/material';

// Define the structure for the progress data
interface ProgressItem {
    id: number;
    value: number;
    title: string;
}

// Props for the Circular Progress List
interface CircularProgressListProps {
    items: ProgressItem[];
}

const CircularProgressList: React.FC<CircularProgressListProps> = ({ items }) => {
    return (
        <Box>
            {items.map((item, index) => (
                <Box key={item.id} sx={{ marginBottom: 2 }}>
                    {/* Circular Progress with Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            {/* Circular Progress */}
                            <CircularProgress 
                                variant="determinate" 
                                value={item.value} 
                                size={80} 
                                thickness={5} 
                            />
                            {/* Centered Percentage */}
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h6" component="div" color="text.secondary">
                                    {`${Math.round(item.value)}%`}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Title Section */}
                        <Typography sx={{ marginLeft: 2 }}>
                            {item.title}
                        </Typography>
                    </Box>

                    {/* Divider between items */}
                    {index < items.length - 1 && <Divider sx={{ marginY: 2 }} />}
                </Box>
            ))}
        </Box>
    );
};

export default CircularProgressList;
