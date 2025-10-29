// src/components/CardView.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

interface CardViewProps {
    imageUrl: string;
    title: string;
    description: string;
    onViewClick: () => void;
}

const CardView: React.FC<CardViewProps> = ({ imageUrl, title, description, onViewClick }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: '12px', boxShadow: 3 }}>
            {/* Image Section */}
            <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={title}
            />

            {/* Title Section */}
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold">
                    {title}
                </Typography>
            </CardContent>

            {/* Description Section */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

            {/* Button Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                <Button 
                    variant="contained" 
                    onClick={onViewClick} 
                    sx={{ width: '100%' }}
                >
                    View Button
                </Button>
            </Box>
        </Card>
    );
};

export default CardView;



{/* <CardView
imageUrl="https://via.placeholder.com/300"
title="Card Title"
description="This is a sample description for the card component."
onViewClick={handleViewClick}
/> */}