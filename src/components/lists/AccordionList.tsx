import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define the structure for each accordion item
export interface AccordionItem {
    id: any;
    title: string;
    percentage: number | null;
    component: React.ReactNode;
}

// Props for the AccordionList component
interface AccordionListProps {
    items: AccordionItem[];
}

const AccordionList: React.FC<AccordionListProps> = ({ items }) => {
    return (
        items.map((item) => (
            <Accordion key={item.id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        {item.title}
                    </Typography>
                    {item.percentage ? <Typography>{`${item.percentage}%`}</Typography> : null}
                    
                </AccordionSummary>

                <AccordionDetails>
                    {item.component}
                </AccordionDetails>
            </Accordion>
        ))
    );
};

export default AccordionList;
