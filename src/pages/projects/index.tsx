import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, IconButton, Stack } from '@mui/material';
import { Edit as EditIcon, Archive as ArchiveIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast, contentContainer } from 'fog-ui';
import { ProjectAPI } from '../../api';
import { Project } from '../../types';
import { projectColumns } from '../../tables';
import { createProjectFormFields, updateProjectFormFields } from '../../Forms/ProjectManagement';

const ProjectsPage: React.FC = () => {
	const theme = useTheme();
	const styles = contentContainer(theme);
	const navigate = useNavigate();
	const projectService = useService('project');
	const toast = useToast();

	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
	const [projectToArchive, setProjectToArchive] = useState<Project | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const projectAPI = ProjectAPI(projectService);
				const data = await projectAPI.projectGetAll();
				console.log('Projects fetched:', data);
				setProjects(data || []);
			} catch (error) {
				console.error('Error fetching projects:', error);
				toast.error('Failed to load projects');
				setProjects([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const refetchProjects = async () => {
		setLoading(true);
		try {
			const projectAPI = ProjectAPI(projectService);
			const data = await projectAPI.projectGetAll();
			setProjects(data || []);
		} catch (error) {
			console.error('Error fetching projects:', error);
			toast.error('Failed to load projects');
		} finally {
			setLoading(false);
		}
	};

	const handleCreateProject = async (formData: any) => {
		try {
			const projectAPI = ProjectAPI(projectService);
			const newProject = {
				name: formData.name,
				key: formData.key,
				description: formData.description || '',
				visibility: formData.visibility || 'private',
				owner: localStorage.getItem('userId') || '',
			};

			await projectAPI.projectCreate(newProject);
			toast.success('Project created successfully');
			setIsCreatePopupOpen(false);
			refetchProjects();
		} catch (error) {
			console.error('Error creating project:', error);
			toast.error('Failed to create project');
		}
	};

	const handleViewProject = (project: Project) => {
		const projectId = project._id || project._id;
		if (projectId) {
			localStorage.setItem('pageTitle', project.name);
			localStorage.setItem('projectId', projectId);
			navigate(`/project/${projectId}`);
		}
	};

	const handleEditProject = (project: Project) => {
		setSelectedProject(project);
		setIsEditPopupOpen(true);
	};

	const handleUpdateProject = async (formData: any) => {
		if (!selectedProject?._id) return;

		try {
			const projectAPI = ProjectAPI(projectService);
			const updateData = {
				name: formData.name,
				key: formData.key,
				description: formData.description,
				visibility: formData.visibility,
				isActive: formData.isActive,
			};

			await projectAPI.projectUpdate(selectedProject._id, updateData);
			toast.success('Project updated successfully');
			setIsEditPopupOpen(false);
			setSelectedProject(null);
			refetchProjects();
		} catch (error) {
			console.error('Error updating project:', error);
			toast.error('Failed to update project');
		}
	};

	const handleArchiveClick = (project: Project) => {
		setProjectToArchive(project);
		setIsArchiveDialogOpen(true);
	};

	const handleArchiveConfirm = async () => {
		if (!projectToArchive?._id) return;

		const projectAPI = ProjectAPI(projectService);
		try {
			await projectAPI.projectDelete(projectToArchive._id);
			toast.success('Project archived successfully');
			setIsArchiveDialogOpen(false);
			setProjectToArchive(null);
			refetchProjects();
		} catch (error) {
			console.error('Error archiving project:', error);
			toast.error('Failed to archive project');
		}
	};

	return (
		<Container sx={styles.root}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
				<Typography variant="h4">Projects</Typography>
				<Button variant="contained" onClick={() => setIsCreatePopupOpen(true)}>
					Create Project
				</Button>
			</Box>

			{loading ? (
				<DataLoading columns={projectColumns} />
			) : projects.length > 0 ? (
				<DataTable
					data={projects}
					columns={projectColumns}
					rowComponent={(project: Project) => (
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Button size="small" variant="outlined" onClick={() => handleViewProject(project)}>
								View
							</Button>
							<IconButton size="small" color="primary" onClick={() => handleEditProject(project)} title="Edit Project">
								<EditIcon fontSize="small" />
							</IconButton>
							<IconButton size="small" color="warning" onClick={() => handleArchiveClick(project)} title="Archive Project">
								<ArchiveIcon fontSize="small" />
							</IconButton>
						</Box>
					)}
				/>
			) : (
				<Box sx={{ padding: '40px', textAlign: 'center', color: '#666' }}>
					<Typography variant="h6">No projects found</Typography>
					<Typography variant="body2" sx={{ mt: 1 }}>
						Create your first project to get started
					</Typography>
				</Box>
			)}

			<Popup
				open={isCreatePopupOpen}
				onClose={() => setIsCreatePopupOpen(false)}
				title="Create New Project"
				component={
					<GenericForm
						fields={createProjectFormFields}
						submitButtonText="Create"
						onSubmit={handleCreateProject}
						onCancel={() => setIsCreatePopupOpen(false)}
					/>
				}
			/>

			<Popup
				open={isEditPopupOpen}
				onClose={() => {
					setIsEditPopupOpen(false);
					setSelectedProject(null);
				}}
				title="Edit Project"
				component={
					selectedProject ? (
						<GenericForm
							fields={updateProjectFormFields}
							submitButtonText="Update"
							onSubmit={handleUpdateProject}
							onCancel={() => {
								setIsEditPopupOpen(false);
								setSelectedProject(null);
							}}
							initialValues={selectedProject}
						/>
					) : null
				}
			/>

			{/* Archive Confirmation Popup */}
			<Popup
				open={isArchiveDialogOpen}
				onClose={() => {
					setIsArchiveDialogOpen(false);
					setProjectToArchive(null);
				}}
				title="Archive Project"
				component={
					<Box sx={{ p: 2 }}>
						<Typography variant="body1" gutterBottom>
							Are you sure you want to archive "{projectToArchive?.name}"? This will mark the project as inactive.
						</Typography>
						<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
							<Button
								variant="contained"
								color="warning"
								onClick={handleArchiveConfirm}
								fullWidth
							>
								Yes, Archive
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									setIsArchiveDialogOpen(false);
									setProjectToArchive(null);
								}}
								fullWidth
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				}
			/>
		</Container>
	);
};

export default ProjectsPage;
