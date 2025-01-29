import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Slide, SnackbarContent } from '@mui/material';
import { errorColor, infoColor, successColor, warningColor } from './Configs';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [backgroundColor, setBackgroundColor] = useState(infoColor);

    const openSnackbar = (msg, state, open = true) => {
        setMessage(msg);
        switch (state) {
            case 'success':
                setBackgroundColor(successColor);
                break;
            case 'info':
                setBackgroundColor(infoColor);
                break;
            case 'error':
                setBackgroundColor(errorColor);
                break;
            default:
                setBackgroundColor(warningColor)
        }
        setOpen(open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                TransitionComponent={Slide}
            >
                <SnackbarContent 
                    message={message}
                    sx={{
                        backgroundColor: backgroundColor,
                    }}
                />
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    );
};

// Custom hook to use Snackbar context
export const useSnackbar = () => {
    return useContext(SnackbarContext);
};
