import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PopupProps {
    title: string;
    open: boolean;
    onClose: () => void;
    component: React.ReactNode;
    buttons?: { text: string; onClick: () => void; }[];
}

const Popup: React.FC<PopupProps> = ({ title, open, onClose, component, buttons }) => {
    return (
        <Dialog open={open} onClose={onClose}  fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { borderRadius: '12px' } }} >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {title}
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, }} ><CloseIcon /></IconButton>
            </DialogTitle>

            <DialogContent><Box>{component}</Box></DialogContent>

            <DialogActions>
                {buttons?.map((button, index) => (
                    <Button key={index} onClick={button.onClick} variant="contained">{button.text}</Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
