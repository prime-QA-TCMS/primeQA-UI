import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionItem {
    id: any;
    title: string;
    percentage: number | null;
    component: React.ReactNode;
}

interface AccordionListProps {
    items: AccordionItem[];
}

const AccordionList: React.FC<AccordionListProps> = ({ items }) => {
    return (
        items.map((item) => (
            <Accordion key={item.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ flexGrow: 1, fontWeight: 'bold' }}>{item.title}</Typography>
                    {item.percentage ? <Typography>{`${item.percentage}%`}</Typography> : null}
                </AccordionSummary>
                <AccordionDetails>{item.component}</AccordionDetails>
            </Accordion>
        ))
    );
};

export default AccordionList;
