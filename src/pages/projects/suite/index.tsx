import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, IconButton, Stack } from '@mui/material';
import { Edit as EditIcon, Archive as ArchiveIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast, contentContainer } from 'fog-ui';
import { TestcaseAPI } from '../../../api';
import { Suite } from '../../../types';
import { suiteColumns } from '../../../tables';
import { createSuiteFormFields, updateSuiteFormFields } from '../../../Forms/TestCaseManagement';

const ProjectSuite: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const testcaseService = useService('testcase');
  const toast = useToast();

  const [suites, setSuites] = useState<Suite[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [suiteToArchive, setSuiteToArchive] = useState<Suite | null>(null);

  useEffect(() => {
    const fetchSuites = async () => {
      setLoading(true);
      try {
        const testcaseAPI = TestcaseAPI(testcaseService);
        const data = await testcaseAPI.suiteGetAll();
        console.log('Suites fetched:', data);
        // Filter by projectId and active status
        const projectSuites = (data || []).filter((s: Suite) => s.projectId === projectId && s.isActive);
        setSuites(projectSuites);
      } catch (error) {
        console.error('Error fetching suites:', error);
        toast.error('Failed to load suites');
        setSuites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuites();
  }, []);

  const refetchSuites = async () => {
    setLoading(true);
    try {
      const testcaseAPI = TestcaseAPI(testcaseService);
      const data = await testcaseAPI.suiteGetAll();
      const projectSuites = (data || []).filter((s: Suite) => s.projectId === projectId && s.isActive);
      setSuites(projectSuites);
    } catch (error) {
      console.error('Error fetching suites:', error);
      toast.error('Failed to load suites');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuite = async (formData: any) => {
    try {
      const testcaseAPI = TestcaseAPI(testcaseService);
      const newSuite = {
        projectId: projectId || formData.projectId,
        name: formData.name,
        description: formData.description || '',
      };

      await testcaseAPI.suiteCreate(newSuite);
      toast.success('Suite created successfully');
      setIsCreatePopupOpen(false);
      refetchSuites();
    } catch (error) {
      console.error('Error creating suite:', error);
      toast.error('Failed to create suite');
    }
  };

  const handleViewSuite = (suite: Suite) => {
    if (suite._id) {
      navigate(`/project/${projectId}/suite/${suite._id}`);
    }
  };

  const handleEditSuite = (suite: Suite) => {
    setSelectedSuite(suite);
    setIsEditPopupOpen(true);
  };

  const handleUpdateSuite = async (formData: any) => {
    if (!selectedSuite?._id) return;

    try {
      const testcaseAPI = TestcaseAPI(testcaseService);
      const updateData = {
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
      };

      await testcaseAPI.suiteUpdate(selectedSuite._id, updateData);
      toast.success('Suite updated successfully');
      setIsEditPopupOpen(false);
      setSelectedSuite(null);
      refetchSuites();
    } catch (error) {
      console.error('Error updating suite:', error);
      toast.error('Failed to update suite');
    }
  };

  const handleArchiveClick = (suite: Suite) => {
    setSuiteToArchive(suite);
    setIsArchiveDialogOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!suiteToArchive?._id) return;

    try {
      const testcaseAPI = TestcaseAPI(testcaseService);
      await testcaseAPI.suiteDelete(suiteToArchive._id);
      toast.success('Suite archived successfully');
      setIsArchiveDialogOpen(false);
      setSuiteToArchive(null);
      refetchSuites();
    } catch (error) {
      console.error('Error archiving suite:', error);
      toast.error('Failed to archive suite');
    }
  };

  return (
    <Container sx={styles.root}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Test Suites</Typography>
        <Button variant="contained" onClick={() => setIsCreatePopupOpen(true)}>
          Create Suite
        </Button>
      </Box>

      {loading ? (
        <DataLoading columns={suiteColumns} />
      ) : suites.length > 0 ? (
        <DataTable
          data={suites}
          columns={suiteColumns}
          rowComponent={(suite: Suite) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="outlined" onClick={() => handleViewSuite(suite)}>
                View
              </Button>
              <IconButton size="small" color="primary" onClick={() => handleEditSuite(suite)} title="Edit Suite">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="warning" onClick={() => handleArchiveClick(suite)} title="Archive Suite">
                <ArchiveIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        />
      ) : (
        <Box sx={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <Typography variant="h6">No suites found</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Create your first suite to get started
          </Typography>
        </Box>
      )}

      {/* Create Suite Popup */}
      <Popup
        open={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
        title="Create New Suite"
        component={
          <GenericForm
            fields={createSuiteFormFields(projectId)}
            submitButtonText="Create"
            onSubmit={handleCreateSuite}
            onCancel={() => setIsCreatePopupOpen(false)}
          />
        }
      />

      {/* Edit Suite Popup */}
      <Popup
        open={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setSelectedSuite(null);
        }}
        title="Edit Suite"
        component={
          selectedSuite ? (
            <GenericForm
              fields={updateSuiteFormFields(projectId)}
              submitButtonText="Update"
              onSubmit={handleUpdateSuite}
              onCancel={() => {
                setIsEditPopupOpen(false);
                setSelectedSuite(null);
              }}
              initialValues={selectedSuite}
            />
          ) : null
        }
      />

      {/* Archive Confirmation Popup */}
      <Popup
        open={isArchiveDialogOpen}
        onClose={() => {
          setIsArchiveDialogOpen(false);
          setSuiteToArchive(null);
        }}
        title="Archive Suite"
        component={
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" gutterBottom>
              Are you sure you want to archive "{suiteToArchive?.name}"? This will mark the suite as inactive.
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
                  setSuiteToArchive(null);
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

export default ProjectSuite;
