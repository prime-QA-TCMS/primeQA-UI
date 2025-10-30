import { ThemeContext } from "../../../../context/ThemeContext";
import { Box, CssBaseline } from "@mui/material";
import { useContext, useState } from "react";
import GenericForm from "../../../../components/forms/Form";
import { FormField } from "../../../../components/forms/types";

const BrandingForm: React.FC = () => {
    const { toggleTheme, changePrimaryColor, mode, primaryColor } = useContext(ThemeContext);
    const [selectedColor, setSelectedColor] = useState<string>(primaryColor);

    // ✅ Event handler for changing primary color and syncing with state
    const handleColorChange = (value: string) => {
        setSelectedColor(value);
        changePrimaryColor(value);
    };

    const initialValues = {
        themeColorChange: selectedColor,
        ToggleDark: mode === 'dark'
    };

    const formFields: FormField[] = [
        {
            name: 'ToggleDark',
            label: 'Toggle Dark Mode',
            type: 'switch',
            onChange: () => toggleTheme()
        },
        {
            name: 'themeColorChange',
            label: 'Select Primary Color',
            type: 'select',
            onChange: (value: string) => handleColorChange(value),
            options: [
                { label: 'Blue', value: '#1976D2' },
                { label: 'Purple', value: '#8E24AA' },
                { label: 'Orange', value: '#FF5722' },
                { label: 'Green', value: '#4CAF50' }
            ]
        }
    ];

    return (
        <Box>
            <CssBaseline />
            {/* ✅ Passing corrected form fields and values */}
            <GenericForm fields={formFields} initialValues={initialValues} />

        </Box>
    );
};

export default BrandingForm;