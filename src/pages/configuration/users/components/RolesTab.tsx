import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast } from 'fog-ui';
import { UserAPI } from '../../../../api';
import { Role } from '../../../../types';
import { roleFormFields } from '../../../../Forms/UserManagement';
import { roleColumns } from '../../../../tables';

const RolesTab: React.FC = () => {
  const userService = useService('user');
  const authService = useService('auth');
  const userAPI = UserAPI(authService, userService);
  const toast = useToast();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await userAPI.roleGetAll();
      const roles = response?.data?.items || [];
      setRoles(roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = () => {
    setSelectedRole(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsPopupOpen(true);
  };

  const handleDelete = async (role: Role) => {
    if (window.confirm(`Are you sure you want to delete role ${role.name}?`)) {
      try {
        await userAPI.roleDelete(role._id);
        toast.success(`Role ${role.name} deleted successfully`);
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
        toast.error('Failed to delete role');
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedRole) {
        await userAPI.roleUpdate(selectedRole._id, formData);
        toast.success('Role updated successfully');
      } else {
        await userAPI.roleCreate(formData);
        toast.success('Role created successfully');
      }
      setIsPopupOpen(false);
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error(`Failed to ${selectedRole ? 'update' : 'create'} role`);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add Role
      </Button>
      {loading ? (
        <DataLoading columns={roleColumns} />
      ) : (
        <DataTable
          data={roles}
          columns={roleColumns}
          rowComponent={(role: Role) => (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(role)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(role)}
              >
                Delete
              </Button>
            </Stack>
          )}
        />
      )}
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={selectedRole ? 'Edit Role' : 'Create Role'}
        component={
          <GenericForm
            fields={roleFormFields}
            initialValues={
              selectedRole
                ? { ...selectedRole, permissions: selectedRole.permissions || [] }
                : { permissions: [] }
            }
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default RolesTab;
