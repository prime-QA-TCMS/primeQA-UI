// src/components/CardListContainer.tsx
import React from 'react';
import { Grid } from '@mui/material';
import CardView from './CardView';

// Define the structure for the card data, including a unique click handler for each card
interface CardItem {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    onViewClick: () => void; // Individual click handler for each card
}

// Props for the CardListContainer component
interface CardListContainerProps {
    cards: CardItem[];
}

const CardListContainer: React.FC<CardListContainerProps> = ({ cards }) => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {cards.map((card) => (
                <Grid key={card.id}>
                    {/* Passing props to the CardView component, including a unique handler */}
                    <CardView
                        imageUrl={card.imageUrl}
                        title={card.title}
                        description={card.description}
                        onViewClick={card.onViewClick}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardListContainer;
