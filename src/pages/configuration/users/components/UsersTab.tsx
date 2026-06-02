import React, { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast } from 'fog-ui';
import type { FormField } from 'fog-ui';
import { UserAPI } from '../../../../api';
import { User, Role } from '../../../../types';
import { userColumns } from '../../../../tables';
// userFormFields imported but not used; using local registerFields instead

interface UsersTabProps {
  roles: Role[];
}

const UsersTab: React.FC<UsersTabProps> = ({ roles }) => {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  const toast = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await userAPI.userGetAll();
      console.log('Users fetched:', response);
      const users = response?.data?.items || [];
      console.log('Users count:', users.length);
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (window.confirm(`Are you sure you want to deactivate ${user.email}?`)) {
      try {
        const userId = user._id;
        if (!userId) {
          toast.error('User ID is missing');
          return;
        }
        await userAPI.userDelete(userId);
        toast.success(`User ${user.email} deactivated successfully`);
        fetchUsers();
      } catch (error) {
        console.error('Error deactivating user:', error);
        toast.error('Failed to deactivate user');
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedUser) {
        const userId = selectedUser._id;
        if (!userId) {
          toast.error('User ID is missing');
          return;
        }
        await userAPI.userUpdate(userId, formData);
        toast.success('User updated successfully');
      } else {
        await userAPI.userCreate(formData);
        toast.success('User created successfully');
      }
      setIsPopupOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(`Failed to ${selectedUser ? 'update' : 'create'} user`);
    }
  };

  const registerFields: FormField[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'roleId',
      label: 'Role ID',
      type: 'text',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      minLength: 6,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
      minLength: 6,
    },
  ];

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add User
      </Button>
      {loading ? (
        <DataLoading columns={userColumns} />
      ) : users.length > 0 ? (
        <DataTable
          data={users}
          columns={userColumns}
          rowComponent={(user: User) => (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(user)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(user)}
              >
                Delete
              </Button>
            </Stack>
          )}
        />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No data available</div>
      )}
      <Popup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={selectedUser ? 'Edit User' : 'Create User'}
        component={
          <GenericForm
            fields={registerFields}
            submitButtonText={'Register'}
            initialValues={selectedUser || { isActive: true }}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default UsersTab;
