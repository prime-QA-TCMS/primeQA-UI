import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenericForm from "./Form";
import { FormField } from "./types";

type SearchFormProps = {
  title: string;
  data: FormField[];
  handleFormSubmit: (formData: Record<string, any>) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ title, data, handleFormSubmit }) => {
  return (
    <Container>
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
                    <GenericForm 
                        fields={data} 
                        onSubmit={handleFormSubmit} 
                    />
        </AccordionDetails>
        </Accordion>
    </Container>
  );
};

export default SearchForm;
