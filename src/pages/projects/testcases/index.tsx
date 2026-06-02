import React, { useState, useMemo } from 'react';
import { Container, Typography, TextField, Box, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { contentContainer, useToast } from 'fog-ui';
import { DataTable, Popup, Form as GenericForm, DataLoading } from 'fog-ui';
import { testCaseColumns } from '../../../tables';
import { createTestCaseFormFields, updateTestCaseFormFields } from '../../../Forms/TestCaseManagement';
import {
  useTestcases,
  useCreateTestcase,
  useUpdateTestcase,
  useDeleteTestcase,
} from '../../../hooks/useTestCases';
import { TestCase } from '../../../types';

const TestCasesManagement: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);
  const { projectId, sectionId } = useParams<{ projectId: string; sectionId: string }>();
  const toast = useToast();

  const { data: testCases, loading, error, refetch } = useTestcases(sectionId || '');
  const { createTestcase } = useCreateTestcase();
  const { updateTestcase } = useUpdateTestcase();
  const { deleteTestcase } = useDeleteTestcase();

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // ─── Filtering ──────────────────────────────────────────────────────────
  const filteredTestCases = useMemo(() => {
    if (!testCases) return [];

    return testCases.filter((tc) => {
      const matchesSearch =
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'all' || tc.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || tc.type === typeFilter;
      return matchesSearch && matchesPriority && matchesType;
    });
  }, [testCases, searchQuery, priorityFilter, typeFilter]);

  // ─── Handlers ───────────────────────────────────────────────────────────
  const handleCreate = async (formData: any) => {
    try {
      const data = {
        ...formData,
        sectionId,
        projectId,
        suiteId: '', // Can be derived from section if needed
        steps: [],
      };
      await createTestcase(data);
      toast.success('Test case created successfully');
      setIsCreatePopupOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to create test case');
    }
  };

  const handleUpdate = async (formData: any) => {
    if (!selectedTestCase) return;
    try {
      await updateTestcase(selectedTestCase._id, formData);
      toast.success('Test case updated successfully');
      setIsEditPopupOpen(false);
      setSelectedTestCase(null);
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update test case');
    }
  };

  const handleDelete = async (testCase: TestCase) => {
    if (!window.confirm(`Delete test case "${testCase.title}"?`)) return;
    try {
      await deleteTestcase(testCase._id);
      toast.success(`Test case "${testCase.title}" deleted`);
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete test case');
    }
  };

  const handleEdit = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsEditPopupOpen(true);
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  if (loading) return <DataLoading columns={testCaseColumns} />;
  if (error) return <Typography color="error">Error: {String(error)}</Typography>;

  return (
    <Container sx={styles.root}>
      <Typography variant="h5" gutterBottom>
        Test Cases Management
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Section ID: {sectionId}
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or description..."
          sx={{ minWidth: 300 }}
        />
        <TextField
          select
          label="Priority"
          size="small"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 150 }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </TextField>
        <TextField
          select
          label="Type"
          size="small"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 150 }}
        >
          <option value="all">All Types</option>
          <option value="functional">Functional</option>
          <option value="regression">Regression</option>
          <option value="smoke">Smoke</option>
          <option value="performance">Performance</option>
        </TextField>
      </Box>

      <Button variant="contained" onClick={() => setIsCreatePopupOpen(true)} sx={{ mb: 2 }}>
        Add Test Case
      </Button>

      {filteredTestCases.length > 0 ? (
        <DataTable
          title={`Test Cases (${filteredTestCases.length})`}
          data={filteredTestCases}
          columns={testCaseColumns}
          rowComponent={(testCase: TestCase) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(testCase)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(testCase)}
              >
                Delete
              </Button>
            </Box>
          )}
        />
      ) : (
        <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
          No test cases found
        </Typography>
      )}

      {/* Create Test Case Popup */}
      <Popup
        title="Create New Test Case"
        open={isCreatePopupOpen}
        onClose={() => setIsCreatePopupOpen(false)}
        component={
          <GenericForm
            fields={createTestCaseFormFields}
            onSubmit={handleCreate}
            submitButtonText="Create Test Case"
          />
        }
      />

      {/* Edit Test Case Popup */}
      <Popup
        title="Edit Test Case"
        open={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setSelectedTestCase(null);
        }}
        component={
          selectedTestCase ? (
            <GenericForm
              fields={updateTestCaseFormFields}
              onSubmit={handleUpdate}
              submitButtonText="Update Test Case"
              initialValues={selectedTestCase}
            />
          ) : null
        }
      />
    </Container>
  );
};

export default TestCasesManagement;
