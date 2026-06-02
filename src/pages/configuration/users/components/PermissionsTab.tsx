import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm } from 'fog-ui';
import type { Column, FormField } from 'fog-ui';

interface Permission {
  _id?: string;
  name: string;
  description?: string;
}

const PermissionsTab: React.FC = () => {
  const [permissions] = useState<Permission[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const permissionColumns: Column<Permission>[] = [
    { key: '_id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
  ];

  const handleCreate = () => {
    setSelectedPermission(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsPopupOpen(true);
  };

  const handleDelete = async (permission: Permission) => {
    if (window.confirm(`Are you sure you want to delete permission ${permission.name}?`)) {
      // Implement delete logic here
      console.log('Delete permission:', permission);
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedPermission) {
        // Implement update logic here
        console.log('Update permission:', formData);
      } else {
        // Implement create logic here
        console.log('Create permission:', formData);
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error saving permission:', error);
    }
  };

  const permissionFormFields: FormField[] = [
    {
      name: 'name',
      label: 'Permission Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
    },
  ];

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add Permission
      </Button>
      <DataTable
        data={permissions}
        columns={permissionColumns}
        rowComponent={(permission: Permission) => (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" onClick={() => handleEdit(permission)}>
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDelete(permission)}
            >
              Delete
            </Button>
          </Stack>
        )}
      />
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={selectedPermission ? 'Edit Permission' : 'Create Permission'}
        component={
          <GenericForm
            fields={permissionFormFields}
            initialValues={selectedPermission || {}}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default PermissionsTab;
