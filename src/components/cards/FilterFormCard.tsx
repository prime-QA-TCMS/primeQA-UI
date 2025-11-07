import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormField } from "../forms/types";
import GenericForm from '../forms/Form';

export interface FilterFormCardProps {
  name: string;
  filterFormFields: FormField[];
  onChange: (values: Record<string, any>) => void;
}

const FilterFormCard: React.FC<FilterFormCardProps> = ({name, filterFormFields, onChange }) => {
  
  const handleSubmit = (formData: Record<string, any>) => {
    try {
      onChange(formData);
    } catch (error) {
      console.error("Error handling filter form:", error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{name.replace("_", " ")} </AccordionSummary>
      <AccordionDetails><GenericForm fields={filterFormFields} onSubmit={handleSubmit} submitButtonText={'Search'}/></AccordionDetails>
    </Accordion>
  );
};

export default FilterFormCard;
