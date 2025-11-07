import React, { createContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextProps {
    toggleTheme: () => void;
    changePrimaryColor: (color: string) => void;
    mode: 'light' | 'dark';
    primaryColor: string;
}

export const ThemeContext = createContext<ThemeContextProps>({
    toggleTheme: () => {},
    changePrimaryColor: () => {},
    mode: 'light',
    primaryColor: '#1976D2'
});

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    const storedColor = localStorage.getItem('primaryColor') || '#1976D2';

    const [mode, setMode] = useState<'light' | 'dark'>(storedMode || 'light');
    const [primaryColor, setPrimaryColor] = useState<string>(storedColor);

    useEffect(() => {localStorage.setItem('themeMode', mode);}, [mode]);

    useEffect(() => {localStorage.setItem('primaryColor', primaryColor);}, [primaryColor]);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                    primary: {
                        main: primaryColor,
                    },
                },
            }),
        [mode, primaryColor]
    );

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const changePrimaryColor = (color: string) => {
        setPrimaryColor(color);
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, changePrimaryColor, mode, primaryColor }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
