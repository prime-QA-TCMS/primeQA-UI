import React, { useState } from 'react';
import { Box, IconButton, Typography, Stack, Button } from '@mui/material';
import { Edit as EditIcon, Archive as ArchiveIcon } from '@mui/icons-material';
import { AccordionList, Popup, Form as GenericForm, PopUpForm, useToast } from 'fog-ui';
import {
	useSections,
	useCreateSection,
	useUpdateSection,
	useDeleteSection,
} from '../../../../hooks/useTestCases';
import { Section } from '../../../../types';
import { createSectionFormFields, updateSectionFormFields } from '../../../../Forms/TestCaseManagement';
import TestCasesTable from './TestCasesTable';

interface SectionsAccordionProps {
	projectId: string;
	suiteId: string;
}

const SectionsAccordion: React.FC<SectionsAccordionProps> = ({ projectId, suiteId }) => {
	const toast = useToast();
	const { data: sections, loading, error, refetch } = useSections(suiteId);
	const { createSection } = useCreateSection();
	const { updateSection } = useUpdateSection();
	const { deleteSection } = useDeleteSection();

	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
	const [selectedSection, setSelectedSection] = useState<Section | null>(null);
	const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
	const [sectionToArchive, setSectionToArchive] = useState<Section | null>(null);

	// ─── Handlers ───────────────────────────────────────────────────────────
	const handleCreateSection = async (formData: any) => {
		try {
			const response = await createSection({
				...formData,
				projectId,
				suiteId,
			});
			if (response) {
				toast.success('Section created successfully');
				await refetch();
			}
			return response;
		} catch (err: any) {
			toast.error(err.message || 'Failed to create section');
			throw err;
		}
	};

	const handleEdit = (section: Section) => {
		setSelectedSection(section);
		setIsEditPopupOpen(true);
	};

	const handleUpdate = async (formData: any) => {
		if (!selectedSection) return;
		try {
			const enrichedData = {
				...formData,
				projectId,
				suiteId,
			};
			await updateSection(selectedSection._id, enrichedData);
			toast.success('Section updated successfully');
			setIsEditPopupOpen(false);
			setSelectedSection(null);
			await refetch();
		} catch (err: any) {
			toast.error(err.message || 'Failed to update section');
		}
	};

	const handleArchiveClick = (section: Section) => {
		setSectionToArchive(section);
		setIsArchiveDialogOpen(true);
	};

	const handleArchiveConfirm = async () => {
		if (!sectionToArchive) return;
		try {
			await deleteSection(sectionToArchive._id);
			toast.success(`Section "${sectionToArchive.name}" archived successfully`);
			setIsArchiveDialogOpen(false);
			setSectionToArchive(null);
			await refetch();
		} catch (err: any) {
			toast.error(err.message || 'Failed to archive section');
		}
	};

	// ─── Render ─────────────────────────────────────────────────────────────
	if (loading) return <Typography>Loading sections...</Typography>;
	if (error) return <Typography color="error">Error loading sections: {String(error)}</Typography>;

	const activeSections = (sections || []).filter((section: Section) => section.isActive !== false);

	// Transform sections into accordion items based on API response
	const accordionItems = activeSections.map((section: Section) => ({
		id: section._id,
		title: section.name,
		percentage: 0, // Can be calculated based on test case completion later
		component: (
			<Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Box>
						{section.description && (
							<Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
								{section.description}
							</Typography>
						)}
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<IconButton
							size="small"
							color="primary"
							onClick={() => handleEdit(section)}
							title="Edit Section"
						>
							<EditIcon fontSize="small" />
						</IconButton>
						<IconButton
							size="small"
							color="warning"
							onClick={() => handleArchiveClick(section)}
							title="Archive Section"
						>
							<ArchiveIcon fontSize="small" />
						</IconButton>
					</Box>
				</Box>
				<TestCasesTable
					projectId={projectId}
					suiteId={suiteId}
					sectionId={section._id}
					sectionName={section.name}
				/>
			</Box>
		),
	}));

	return (
		<Box>
			<Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography variant="h6">Sections</Typography>
				<PopUpForm
					suitesFormFields={createSectionFormFields(projectId, suiteId)}
					onSubmit={handleCreateSection}
					submitText="Create Section"
					buttonText="Add Section"
					title="Create New Section"
				/>
			</Box>

			{accordionItems.length > 0 ? (
				<AccordionList items={accordionItems} />
			) : (
				<Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
					No sections found. Create your first section to get started.
				</Typography>
			)}

			{/* Edit Section Popup */}
			<Popup
				title="Edit Section"
				open={isEditPopupOpen}
				onClose={() => {
					setIsEditPopupOpen(false);
					setSelectedSection(null);
				}}
				component={
					selectedSection ? (
						<GenericForm
							fields={updateSectionFormFields(projectId, suiteId)}
							onSubmit={handleUpdate}
							submitButtonText="Update Section"
							onCancel={() => {
								setIsEditPopupOpen(false);
								setSelectedSection(null);
							}}
							initialValues={selectedSection}
						/>
					) : null
				}
			/>

			{/* Archive Confirmation Popup */}
			<Popup
				open={isArchiveDialogOpen}
				onClose={() => {
					setIsArchiveDialogOpen(false);
					setSectionToArchive(null);
				}}
				title="Archive Section"
				component={
					<Box sx={{ p: 2 }}>
						<Typography variant="body1" gutterBottom>
							Are you sure you want to archive "{sectionToArchive?.name}"? This will mark the section as inactive.
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
									setSectionToArchive(null);
								}}
								fullWidth
							>
								Cancel
							</Button>
						</Stack>
					</Box>
				}
			/>
		</Box>
	);
};

export default SectionsAccordion;
