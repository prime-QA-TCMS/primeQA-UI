import React, { useState } from "react";
import { IconButton } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export interface UserGroupCardProps {
  _id: string;
  name: string;
  description: string;
  permissionsList: string[];
  allowDelete?: boolean;
  allowUpdate?: boolean;
}

const UserGroupCard: React.FC<UserGroupCardProps> = ({_id, name, description, permissionsList, allowUpdate, allowDelete }) => {
  console.log('id from UserGroupCard ',_id);
  const Delete: React.ReactNode = (
    <IconButton color="error" onClick={() => {}}>
        <DeleteIcon />
    </IconButton>
  );

  const Update: React.ReactNode = (
    <IconButton color="primary" onClick={() => {}}>
        <EditIcon />
    </IconButton>
  );


  return (
    <Accordion key={_id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >{name.replace("_", " ")} {allowDelete && Delete} {allowUpdate && Update}
      </AccordionSummary>
      <AccordionDetails>
        {description}<br/><br/>
        List of Permissions: <br/>
        {permissionsList.length > 0 ? (
            permissionsList.map((permission) => (permission + ', '))
        ) : (<p>No Permissions Assigned.</p>)}
      </AccordionDetails>
    </Accordion>
  );
};

export default UserGroupCard;
