import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading } from "fog-ui";
import type { Column, FormField } from "fog-ui";
import { UserAPI } from '../../../../api';
import { User, Role } from '../../../../types';
import { userFormFields } from '../../../../Forms/UserManagement';

interface UsersTabProps {
	roles: Role[];
}

const UsersTab: React.FC<UsersTabProps> = ({ roles }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const fetchUsers = React.useCallback(async () => {
		setLoading(true);
		try {
			const data = await UserAPI.userGetAll();
			console.log('Users fetched:', data);
			console.log('Users count:', data?.length);
			setUsers(data || []);
		} catch (error) {
			console.error('Error fetching users:', error);
			setUsers([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const userColumns: Column<User>[] = [
		{ field: 'email', headerName: 'Email', width: 250 },
		{
			field: 'role',
			headerName: 'Role',
			width: 150,
			valueGetter: (row: User) => {
				if (typeof row.role === 'string') {
					const roleObj = roles.find(r => r._id === row.role);
					return roleObj ? roleObj.name : row.role;
				}
				return row.role.name;
			}
		},
		{
			field: 'isActive',
			headerName: 'Status',
			width: 100,
			valueGetter: (row: User) => row.isActive ? 'Active' : 'Inactive'
		},
		{
			field: 'lastLogin',
			headerName: 'Last Login',
			width: 180,
			valueGetter: (row: User) => row.lastLogin ? new Date(row.lastLogin).toLocaleString() : 'Never'
		},
	];

	const handleCreate = () => {
		setSelectedUser(null);
		setIsPopupOpen(true);
	};

	const handleEdit = (user: User) => {
		setSelectedUser(user);
		setIsPopupOpen(true);
	};

	const handleDelete = async (user: User) => {
		if (window.confirm(`Are you sure you want to delete ${user.email}?`)) {
			try {
				const userId = user._id || user.id;
				if (!userId) {
					console.error('User ID is missing');
					return;
				}
				await UserAPI.userDelete(userId);
				fetchUsers();
			} catch (error) {
				console.error('Error deleting user:', error);
			}
		}
	};

	const handleSubmit = async (formData: any) => {
		try {
			if (selectedUser) {
				const userId = selectedUser._id || selectedUser.id;
				if (!userId) {
					console.error('User ID is missing');
					return;
				}
				await UserAPI.userUpdate(userId, formData);
			} else {
				await UserAPI.userCreate(formData);
			}
			setIsPopupOpen(false);
			fetchUsers();
		} catch (error) {
			console.error('Error saving user:', error);
		}
	};


	const registerFields: FormField[] = [
		{
			name: 'firstName',
			label: 'First Name',
			type: 'text',
			required: true
		},
		{
			name: 'lastName',
			label: 'Last Name',
			type: 'text',
			required: true
		},
		{
			name: 'email',
			label: 'Email Address',
			type: 'email',
			required: true
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			required: true,
			minLength: 6
		},
		{
			name: 'confirmPassword',
			label: 'Confirm Password',
			type: 'password',
			required: true,
			minLength: 6,
			validate: (value: string, formData: { [key: string]: any }) => {
				if (value !== formData.password) {
					return 'Passwords do not match';
				}
				return true;
			}
		}
	];

	return (
		<>
			<Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
				Add User
			</Button>
			{loading ? (
				<DataLoading />
			) : users.length > 0 ? (
				<DataTable
					rows={users}
					columns={userColumns}
					onEdit={handleEdit}
					onDelete={handleDelete}
					getRowId={(row: User) => row._id || row.id}
				/>
			) : (
				<div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
					No data available
				</div>
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
			>
			</Popup>
		</>
	);
};

export default UsersTab;
