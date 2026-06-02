import React, { useState, useEffect, useMemo } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast } from 'fog-ui';
import { ConfigurationAPI } from '../../../../api';
import { Integration } from '../../../../types';
import { integrationColumns } from '../../../../tables';
import { createIntegrationFormFields, updateIntegrationFormFields } from '../../../../Forms/TestConfiguration';

const IntegrationsTab: React.FC = () => {
  const configurationService = useService('configuration');
  const configurationAPI = useMemo(() => ConfigurationAPI(configurationService), [configurationService]);
  const toast = useToast();
  const tenantId = localStorage.getItem('tenantId') || undefined;

  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const fetchIntegrations = React.useCallback(async () => {
    setLoading(true);
    try {
      // Use the updated hook logic: get items from wrapped response
      const result = await configurationAPI.integrationGetAll(tenantId);
      const items = result.data?.items || [];
      setIntegrations(items);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast.error('Failed to load integrations');
      setIntegrations([]);
    } finally {
      setLoading(false);
    }
  }, [configurationAPI, tenantId, toast]);

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  const handleCreate = () => {
    setSelectedIntegration(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsPopupOpen(true);
  };

  const handleDelete = async (integration: Integration) => {
    if (window.confirm(`Are you sure you want to delete integration "${integration.type}"?`)) {
      try {
        const integrationId = integration._id;
        if (!integrationId) {
          toast.error('Integration ID is missing');
          return;
        }
        await configurationAPI.integrationDelete(integrationId);
        toast.success(`Integration "${integration.type}" deleted successfully`);
        fetchIntegrations();
      } catch (error) {
        console.error('Error deleting integration:', error);
        toast.error('Failed to delete integration');
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedIntegration) {
        const integrationId = selectedIntegration._id;
        if (!integrationId) {
          toast.error('Integration ID is missing');
          return;
        }
        await configurationAPI.integrationUpdate(integrationId, formData);
        toast.success('Integration updated successfully');
      } else {
        const payload = {
          ...formData,
          tenantId: formData.tenantId || tenantId,
        };
        await configurationAPI.integrationCreate(payload);
        toast.success('Integration created successfully');
      }
      setIsPopupOpen(false);
      fetchIntegrations();
    } catch (error) {
      console.error('Error saving integration:', error);
      toast.error(`Failed to ${selectedIntegration ? 'update' : 'create'} integration`);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add Integration
      </Button>
      {loading ? (
        <DataLoading columns={integrationColumns} />
      ) : integrations.length > 0 ? (
        <DataTable
          data={integrations}
          columns={integrationColumns}
          rowComponent={(integration: Integration) => (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(integration)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(integration)}
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
        title={selectedIntegration ? 'Edit Integration' : 'Create Integration'}
        component={
          <GenericForm
            fields={selectedIntegration ? updateIntegrationFormFields : createIntegrationFormFields}
            submitButtonText={selectedIntegration ? 'Update' : 'Create'}
            initialValues={selectedIntegration || { isActive: true }}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default IntegrationsTab;
