import React, { useState, useEffect, useMemo } from 'react';
import {
    TextField, Button, Container, Select, MenuItem,
    FormControl, InputLabel, Switch, FormControlLabel, Rating,
    Box,
    Typography
} from '@mui/material';
import { FormProps } from "./types";
import { validationRules } from './validation';

const GenericForm: React.FC<FormProps> = ({
    fields,
    onSubmit,
    submitButtonText = "Submit",
    cancelButtonText = "Cancel",
    onCancel,
    customButtons = [],
    initialValues = {}
}) => {
    const memoizedInitialValues = useMemo(() => initialValues, [JSON.stringify(initialValues)]);

    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [formData, setFormData] = useState<{ [key: string]: any }>(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = memoizedInitialValues[field.name] ?? (field.type === 'switch' ? false : '');
            return acc;
        }, {} as { [key: string]: any });
    });
    
    useEffect(() => {
        const newFormData = fields.reduce((acc, field) => {
            acc[field.name] = memoizedInitialValues[field.name] ?? (field.type === 'switch' ? false : '');
            return acc;
        }, {} as { [key: string]: any });
    
        // Only update if new form data differs from the current state
        if (Object.keys(formData).length === 0 || JSON.stringify(formData) !== JSON.stringify(newFormData)) {
            setFormData(newFormData);
        }
    }, [memoizedInitialValues, fields]);
    
    const validateField = (name: string, value: any) => {
        const field = fields.find((f) => f.name === name);
        if (!field) return null;

        const rules = field.validations || [];

        for (const validation of rules) {
            const { rule, args = [] } = validation;
            const validator = validationRules[rule];
            if (validator) {
                const error = validator(value, ...args);
                if (error) return error;
            }
        }

        // implicit required check (if no explicit rule given)
        if (field.required && (value === '' || value === null || value === undefined)) {
            return 'This field is required.';
        }

        return null;
    };

    const handleChange = (name: string, value: any, customOnChange?: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));

        if (customOnChange) customOnChange(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        } else {
            console.info('Form submitted without onSubmit prop:', formData);
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={onSubmit ? handleSubmit : undefined}>
                {fields.map((field) => (
                    <div key={field.name} style={{ marginBottom: '16px' }}>
                        {['text', 'email', 'password', 'number'].includes(field.type) && (
                            <TextField
                                fullWidth
                                label={field.label}
                                required={field.required ? field.required : false}
                                type={field.type}
                                value={formData[field.name] || ''}
                                disabled={field.disabled || false}
                                onChange={(e) => handleChange(field.name, e.target.value, field.onChange ?? field.onChange)}
                                placeholder={field.placeholder ? field.placeholder : ''}
                                error={Boolean(errors[field.name])}
                                helperText={errors[field.name] || ''} 
                            />
                        )}

                        {field.type === 'select' && field.options && (
                            <FormControl fullWidth>
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    required={field.required ? field.required : false}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange ?? field.onChange)}
                                    disabled={field.disabled || false}
                                    error={Boolean(errors[field.name])}
                                >
                                    {field.options.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}


                        {field.type === 'multiselect' && field.options && (
                            <FormControl fullWidth>
                                <InputLabel>{field.label}</InputLabel>
                                <Select
                                    multiple
                                    required={field.required ? field.required : false}
                                    value={formData[field.name] || []}
                                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange ?? field.onChange)}
                                    disabled={field.disabled || false}
                                    error={Boolean(errors[field.name])}
                                    renderValue={(selected: string[]) =>
                                        selected
                                            .map((val: string) => {
                                                const selectedOption = field.options?.find(option => option.value === val);
                                                return selectedOption ? selectedOption.label : val;
                                            })
                                            .join(', ')
                                    }
                                >
                                    {field.options.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                            </FormControl>
                        )}

                        {field.type === 'switch' && (
                            <FormControlLabel
                                control={
                                    <Switch
                                        required={field.required ? field.required : false}
                                        checked={formData[field.name] || false}
                                        onChange={(e) => handleChange(field.name, e.target.value, field.onChange ?? field.onChange)}
                                        disabled={field.disabled || false}
                                    />
                                }
                                label={field.label}
                            />
                        )}

                        {field.type === 'rating' && (
                            <Rating
                                value={formData[field.name] || 0}
                                onChange={(_, newValue) => handleChange(field.name, newValue, field.onChange ?? field.onChange)}
                                disabled={field.disabled || false}
                            />
                        )}

                        {field.type === 'textarea' && (
                        <TextField
                            fullWidth
                            error={Boolean(errors[field.name])}
                            helperText={errors[field.name] || ''} 
                            required={field.required ? field.required : false}
                            label={field.label}
                            multiline
                            rows={5}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                            disabled={field.disabled || false}
                            placeholder={field.placeholder ? field.placeholder : ''}
                        />
                        )}

                        {field.type === 'date' && (
                        <TextField
                            error={Boolean(errors[field.name])}
                            helperText={errors[field.name] || ''} 
                            required={field.required ? field.required : false}
                            fullWidth
                            label={field.label}
                            type="date"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                            disabled={field.disabled || false}
                        />
                        )}

                        {field.type === 'datetime' && (
                        <TextField
                            error={Boolean(errors[field.name])}
                            helperText={errors[field.name] || ''} 
                            required={field.required ? field.required : false}
                            fullWidth
                            label={field.label}
                            type="datetime-local"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                            disabled={field.disabled || false}
                        />
                        )}

                        {field.type === 'daterange' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                error={Boolean(errors[field.name])}
                                helperText={errors[field.name] || ''} 
                                required={field.required ? field.required : false}
                                label={`${field.label} From`}
                                type="date"
                                value={formData[field.name]?.from || ''}
                                onChange={(e) => handleChange(field.name, { ...formData[field.name], from: e.target.value }, field.onChange)}
                            />
                            <TextField
                                error={Boolean(errors[field.name])}
                                helperText={errors[field.name] || ''} 
                                required={field.required ? field.required : false}
                                label={`${field.label} To`}
                                type="date"
                                value={formData[field.name]?.to || ''}
                                onChange={(e) => handleChange(field.name, { ...formData[field.name], to: e.target.value }, field.onChange)}
                            />
                        </Box>
                        )}

                        {field.type === 'radio' && field.options && (
                        <FormControl component="fieldset">
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>{field.label}</Typography>
                            {field.options.map((option, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={
                                <input
                                    required={field.required ? field.required : false}
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={formData[field.name] === option.value}
                                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                                />
                                }
                                label={option.label}
                            />
                            ))}
                        </FormControl>
                        )}

                        {/* File */}
                        {field.type === 'file' && (
                        <Button variant="outlined" component="label">
                            {field.label || 'Upload File'}
                            <input
                            type="file"
                            hidden
                            required={field.required ? field.required : false}
                            onChange={(e) => handleChange(field.name, e.target.files?.[0], field.onChange)}
                            />
                        </Button>
                        )}

                        {field.type === 'image' && (
                        <Box>
                            <Button variant="outlined" component="label">
                            {field.label || 'Upload Image'}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                required={field.required ? field.required : false}
                                onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) =>
                                    handleChange(field.name, ev.target?.result, field.onChange);
                                    reader.readAsDataURL(file);
                                }
                                }}
                            />
                            </Button>
                            {formData[field.name] && (
                            <Box mt={1}>
                                <img
                                src={formData[field.name]}
                                alt="Preview"
                                style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                                />
                            </Box>
                            )}
                        </Box>
                        )}

                        {field.type === 'video' && (
                        <Box>
                            <Button variant="outlined" component="label">
                            {field.label || 'Upload Video'}
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                required={field.required ? field.required : false}
                                onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) =>
                                    handleChange(field.name, ev.target?.result, field.onChange);
                                    reader.readAsDataURL(file);
                                }
                                }}
                            />
                            </Button>
                            {formData[field.name] && (
                            <Box mt={1}>
                                <video controls width="100%" src={formData[field.name]} />
                            </Box>
                            )}
                        </Box>
                        )}
                    </div>
                ))}


                {onSubmit && (
                    <Button type="submit" variant="contained" color="primary">
                        {submitButtonText}
                    </Button>
                )}

                {onCancel && (
                    <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                        {cancelButtonText}
                    </Button>
                )}

                {customButtons.map((button, index) => (
                    <Button
                        key={index}
                        type="button"
                        variant={button.variant || "text"}
                        color={button.color || "primary"}
                        onClick={button.onClick}
                    >
                        {button.text}
                    </Button>
                ))}
            </form>
        </Container>
    );
};

export default GenericForm;
