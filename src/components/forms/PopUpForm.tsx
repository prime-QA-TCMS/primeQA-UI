import React, { useState } from "react";
import { Button } from "@mui/material";
import GenericForm from "./Form";
import Popup from "../popup/popup";

interface PopUpFormProps {
  suitesFormFields: any; // ideally use a type like Field[]
  onSubmit: (formData: any) => Promise<any> | void;
  submitText?: string;
  buttonText?: string;
  title?: string;
}

export const PopUpForm: React.FC<PopUpFormProps> = ({suitesFormFields, onSubmit, submitText = "Submit", buttonText = "Create Suite", title = "Create New Suite"}) => {
  const [isCreateProjectPopupOpen, setIsCreatePopupOpen] = useState(false);
  const handleCreateOpen = () => setIsCreatePopupOpen(true);
  const handleCreateClose = () => setIsCreatePopupOpen(false);

    const handleCreateSave = async (formData: any) => {
      try {
        const response = onSubmit(formData);

        if (response) {
          handleCreateClose();
        } else {
          console.warn("response");
        }
      } catch (err) {
        console.error("❌ Error creating suite:", err);
      }
    };

  return (
    <>
      
      <Button onClick={handleCreateOpen}>{buttonText}</Button>
      <Popup title={title} open={isCreateProjectPopupOpen} onClose={handleCreateClose} component={
          <GenericForm fields={suitesFormFields} onSubmit={handleCreateSave} submitButtonText={submitText}/>
      } />
    </>
  );
};

export default PopUpForm;