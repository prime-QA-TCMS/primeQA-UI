import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading } from "fog-ui";
import type { Column } from "fog-ui";
import { UserAPI } from '../../../../api';
import { Role } from '../../../../types';
import { roleFormFields } from '../../../../Forms/UserManagement';

const RolesTab: React.FC = () => {
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);

	const fetchRoles = async () => {
		setLoading(true);
		try {
			const data = await UserAPI.roleGetAll();
			setRoles(data || []);
		} catch (error) {
			console.error('Error fetching roles:', error);
			setRoles([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	const roleColumns: Column<Role>[] = [
		{ field: '_id', headerName: 'ID', width: 100 },
		{ field: 'name', headerName: 'Name', width: 200 },
		{ field: 'description', headerName: 'Description', width: 300 },
		{
			field: 'permissions',
			headerName: 'Permissions',
			width: 250,
			valueGetter: (row: Role) => row.permissions?.length || 0
		},
	];

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
				await UserAPI.roleDelete(role._id);
				fetchRoles();
			} catch (error) {
				console.error('Error deleting role:', error);
			}
		}
	};

	const handleSubmit = async (formData: any) => {
		try {
			if (selectedRole) {
				await UserAPI.roleUpdate(selectedRole._id, formData);
			} else {
				await UserAPI.roleCreate(formData);
			}
			setIsPopupOpen(false);
			fetchRoles();
		} catch (error) {
			console.error('Error saving role:', error);
		}
	};

	return (
		<>
			<Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
				Add Role
			</Button>
			{loading ? (
				<DataLoading />
			) : (
				<DataTable
					rows={roles}
					columns={roleColumns}
					onEdit={handleEdit}
					onDelete={handleDelete}
					getRowId={(row: Role) => row._id}
				/>
			)}
			<Popup
				open={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title={selectedRole ? 'Edit Role' : 'Create Role'}
				component={
					<GenericForm
						fields={roleFormFields}
						initialValues={selectedRole ? { ...selectedRole, permissions: selectedRole.permissions || [] } : { permissions: [] }}
						onSubmit={handleSubmit}
						onCancel={() => setIsPopupOpen(false)}
					/>
				}
			>
			</Popup>
		</>
	);
};

export default RolesTab;
