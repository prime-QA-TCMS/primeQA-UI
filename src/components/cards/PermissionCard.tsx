import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GenericForm from "../forms/Form";
import { FormField } from "../forms/types";

export interface PermissionCardProps {
  data: {
    _id: string;
    name: string;
    actions: string[];
    __v: number;
  };
}

const PermissionCard: React.FC<PermissionCardProps> = ({ data }) => {
  const handleFormSubmit = async (submittedData: any) => {submittedData.preventDefault();};

  const actionFields: FormField[] = data.actions.map((action) => ({
    name: action,
    label: action.charAt(0).toUpperCase() + action.slice(1),
    type: "switch",
    required: false,
  }));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >{data.name.replace("_", " ")}</AccordionSummary>
      <AccordionDetails><GenericForm fields={actionFields} onSubmit={handleFormSubmit} /></AccordionDetails>
    </Accordion>
  );
};

export default PermissionCard;
