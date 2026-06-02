import React, { useState, useEffect, useMemo } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast } from 'fog-ui';
import { ConfigurationAPI } from '../../../../api';
import { Environment } from '../../../../types';
import { environmentColumns } from '../../../../tables';
import { createEnvironmentFormFields, updateEnvironmentFormFields } from '../../../../Forms/TestConfiguration';

const EnvironmentsTab: React.FC = () => {
  const configurationService = useService('configuration');
  const configurationAPI = useMemo(() => ConfigurationAPI(configurationService), [configurationService]);
  const toast = useToast();
  const tenantId = localStorage.getItem('tenantId') || undefined;

  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);

  const fetchEnvironments = React.useCallback(async () => {
    setLoading(true);
    try {
      // Use the updated hook logic: get items from wrapped response
      const result = await configurationAPI.environmentGetAll(tenantId);
      const items = result.data?.items || [];
      setEnvironments(items);
    } catch (error) {
      console.error('Error fetching environments:', error);
      toast.error('Failed to load environments');
      setEnvironments([]);
    } finally {
      setLoading(false);
    }
  }, [configurationAPI, tenantId, toast]);

  useEffect(() => {
    fetchEnvironments();
  }, [fetchEnvironments]);

  const handleCreate = () => {
    setSelectedEnvironment(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (environment: Environment) => {
    setSelectedEnvironment(environment);
    setIsPopupOpen(true);
  };

  const handleDelete = async (environment: Environment) => {
    if (window.confirm(`Are you sure you want to delete environment "${environment.name}"?`)) {
      try {
        const environmentId = environment._id;
        if (!environmentId) {
          toast.error('Environment ID is missing');
          return;
        }
        await configurationAPI.environmentDelete(environmentId);
        toast.success(`Environment "${environment.name}" deleted successfully`);
        fetchEnvironments();
      } catch (error) {
        console.error('Error deleting environment:', error);
        toast.error('Failed to delete environment');
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedEnvironment) {
        const environmentId = selectedEnvironment._id;
        if (!environmentId) {
          toast.error('Environment ID is missing');
          return;
        }
        await configurationAPI.environmentUpdate(environmentId, formData);
        toast.success('Environment updated successfully');
      } else {
        const payload = {
          ...formData,
          tenantId: formData.tenantId || tenantId,
        };
        await configurationAPI.environmentCreate(payload);
        toast.success('Environment created successfully');
      }
      setIsPopupOpen(false);
      fetchEnvironments();
    } catch (error) {
      console.error('Error saving environment:', error);
      toast.error(`Failed to ${selectedEnvironment ? 'update' : 'create'} environment`);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add Environment
      </Button>
      {loading ? (
        <DataLoading columns={environmentColumns} />
      ) : environments.length > 0 ? (
        <DataTable
          data={environments}
          columns={environmentColumns}
          rowComponent={(environment: Environment) => (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(environment)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(environment)}
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
        title={selectedEnvironment ? 'Edit Environment' : 'Create Environment'}
        component={
          <GenericForm
            fields={selectedEnvironment ? updateEnvironmentFormFields : createEnvironmentFormFields}
            submitButtonText={selectedEnvironment ? 'Update' : 'Create'}
            initialValues={selectedEnvironment || { isActive: true }}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default EnvironmentsTab;