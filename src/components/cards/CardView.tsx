// src/components/CardView.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface CardViewProps {
    title?: string | null;
    description: string;
    component?: React.ReactNode;
    onViewClick: () => void;
}

const CardView: React.FC<CardViewProps> = ({ title, description, onViewClick, component }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: '12px', boxShadow: 3 }}>
            {title ? 
                <CardContent><Typography variant="h5" component="div" fontWeight="bold">{title}</Typography></CardContent>
            : null }

            {description ? 
                <CardContent><Typography variant="body2" color="text.secondary">{description}</Typography></CardContent>
            : null }

            {component ? 
                <CardContent>{component}</CardContent>
            : null }

            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                <Button variant="contained" onClick={onViewClick} sx={{ width: '100%' }}>View</Button>
            </Box>
        </Card>
    );
};

export default CardView;