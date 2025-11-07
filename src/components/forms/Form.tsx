import React, { useState, useEffect, useMemo } from 'react';
import {
  TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Switch, FormControlLabel, Rating,
  Box, Grid
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
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] =
        memoizedInitialValues[field.name] ??
        field.defaultValue ??
        (field.type === "switch" ? false : field.type === "multiselect" ? [] : "");
      return acc;
    }, {} as Record<string, any>);
  });

  useEffect(() => {
    const newFormData = fields.reduce((acc, field) => {
      acc[field.name] =
        memoizedInitialValues[field.name] ??
        field.defaultValue ??
        (field.type === "switch" ? false : field.type === "multiselect" ? [] : "");
      return acc;
    }, {} as Record<string, any>);

    if (JSON.stringify(formData) !== JSON.stringify(newFormData)) {
      setFormData(newFormData);
    }
  }, [memoizedInitialValues, fields]);

  // ✅ Fetch dynamic select/multiselect options and apply default values
  useEffect(() => {
    const fetchSelectOptions = async () => {
      for (const field of fields) {
        if (field.apiEndpoint) {
          try {
            const response = await fetch(field.apiEndpoint);
            const data = await response.json();

            const options = data.map((item: any) => ({
              value: item[field.optionValueKey || "_id"],
              label:
                item[field.optionLabelKey || ""] ||
                item.name ||
                item.title ||
                "Unnamed",
            }));

            field.options = options;

            // ✅ Apply default value only if current value is empty
            if (
              field.defaultValue !== undefined &&
              (formData[field.name] === "" ||
                (Array.isArray(formData[field.name]) && formData[field.name].length === 0))
            ) {
              setFormData((prev) => ({
                ...prev,
                [field.name]: field.defaultValue,
              }));
            }
          } catch (error) {
            console.error(`Failed to fetch options for ${field.name}:`, error);
          }
        } else if (
          field.defaultValue !== undefined &&
          (formData[field.name] === "" ||
            (Array.isArray(formData[field.name]) && formData[field.name].length === 0))
        ) {
          // ✅ Static options default assignment
          setFormData((prev) => ({
            ...prev,
            [field.name]: field.defaultValue,
          }));
        }
      }
    };

    fetchSelectOptions();
  }, [fields]);

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

    if (field.required && (value === "" || value === null || value === undefined)) {
      return "This field is required.";
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
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={onSubmit ? handleSubmit : undefined} sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {fields.map((field) => {
          const gridSize = field.width === "half" ? 6 : 12;

          switch (field.type) {
            case "text":
            case "email":
            case "password":
            case "number":
            case "date":
            case "datetime":
            case "textarea":
              return (
                <Grid size={gridSize} key={field.name}> 
                  <TextField
                    fullWidth
                    label={field.label}
                    required={field.required}
                    type={field.type === "textarea" ? "text" : field.type}
                    multiline={field.type === "textarea"}
                    rows={field.type === "textarea" ? 4 : undefined}
                    value={formData[field.name] ?? ""}
                    disabled={field.disabled}
                    placeholder={field.placeholder}
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                    size="small"
                  />
                </Grid>
              );

            case "select":
              return (
                <Grid size={gridSize} key={field.name}> 
                  <FormControl fullWidth size="small">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                      disabled={field.disabled}
                      error={Boolean(errors[field.name])}
                    >
                      {field.options?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );

            case "multiselect":
              return (
                <Grid size={gridSize} key={field.name}> 
                  <FormControl fullWidth size="small">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      multiple
                      required={field.required}
                      value={formData[field.name] || []}
                      onChange={(e) => handleChange(field.name, e.target.value, field.onChange)}
                      disabled={field.disabled}
                      error={Boolean(errors[field.name])}
                      renderValue={(selected: string[]) =>
                        selected
                          .map((val) => {
                            const opt = field.options?.find((o) => o.value === val);
                            return opt ? opt.label : val;
                          })
                          .join(", ")
                      }
                    >
                      {field.options?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              );

            case "switch":
              return (
                <Grid size={gridSize} key={field.name}> 
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData[field.name] || false}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked, field.onChange)
                        }
                      />
                    }
                    label={field.label}
                  />
                </Grid>
              );

            case "rating":
              return (
                <Grid size={gridSize} key={field.name}> 
                  <Rating
                    value={formData[field.name] ?? 0}
                    onChange={(_, v) => handleChange(field.name, v, field.onChange)}
                  />
                </Grid>
              );

            default:
              return <Grid size={gridSize} key={field.name}> </Grid>;
          }
        })}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
        {onCancel && (
          <Button type="button" variant="outlined" onClick={onCancel}>
            {cancelButtonText}
          </Button>
        )}
        {onSubmit && (
          <Button type="submit" variant="contained">
            {submitButtonText}
          </Button>
        )}
        {customButtons.map((btn, i) => (
          <Button key={i} {...btn}>
            {btn.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default GenericForm;
