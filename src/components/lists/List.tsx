import React from 'react';
import { useNavigate  } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Define the structure for the list item
export interface ListItemData {
    id: any;
    title: string;
    icon?: React.ReactNode; // For dynamic icons
    link?: string; // Optional link makes the item clickable
}

// Props for the generic list component
interface GenericListProps {
    items: ListItemData[];
}

const GenericList: React.FC<GenericListProps> = ({ items }) => {
  const navigate = useNavigate();

    const handleItemClick = (link?: string) => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <List>
            {items.map((item) => (
                <ListItem key={item.id} disablePadding onClick={() => handleItemClick(item.link)}>
                    <ListItemButton component={item.link ? 'a' : 'div'} href={item.link} disabled={!item.link}>
                        {item.icon ? <ListItemIcon>{item.icon}</ListItemIcon> : null}
                        <ListItemText primary={item.title} />
                        {item.link && <ArrowForwardIosIcon />}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default GenericList;
