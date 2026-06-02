import React, { useState, useEffect, useMemo } from 'react';
import { Button, Stack } from '@mui/material';
import { DataTable, Popup, Form as GenericForm, DataLoading, useService, useToast } from 'fog-ui';
import { ConfigurationAPI } from '../../../../api';
import { Parameter } from '../../../../types';
import { parameterColumns } from '../../../../tables';
import { createParameterFormFields, updateParameterFormFields } from '../../../../Forms/TestConfiguration';

const ParametersTab: React.FC = () => {
  const configurationService = useService('configuration');
  const configurationAPI = useMemo(() => ConfigurationAPI(configurationService), [configurationService]);
  const toast = useToast();
  const tenantId = localStorage.getItem('tenantId') || undefined;

  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);

  const fetchParameters = React.useCallback(async () => {
    setLoading(true);
    try {
      // Use the updated hook logic: get items from wrapped response
      const result = await configurationAPI.parameterGetAll(
        tenantId ? 'tenant' : undefined,
        tenantId
      );
      const items = result.data?.items || [];
      setParameters(items);
    } catch (error) {
      console.error('Error fetching parameters:', error);
      toast.error('Failed to load parameters');
      setParameters([]);
    } finally {
      setLoading(false);
    }
  }, [configurationAPI, tenantId, toast]);

  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  const handleCreate = () => {
    setSelectedParameter(null);
    setIsPopupOpen(true);
  };

  const handleEdit = (parameter: Parameter) => {
    setSelectedParameter(parameter);
    setIsPopupOpen(true);
  };

  const handleDelete = async (parameter: Parameter) => {
    if (window.confirm(`Are you sure you want to delete parameter "${parameter.name}"?`)) {
      try {
        const parameterId = parameter._id || parameter.id;
        if (!parameterId) {
          toast.error('Parameter ID is missing');
          return;
        }
        await configurationAPI.parameterDelete(parameterId);
        toast.success(`Parameter "${parameter.name}" deleted successfully`);
        fetchParameters();
      } catch (error) {
        console.error('Error deleting parameter:', error);
        toast.error('Failed to delete parameter');
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      const scope = formData.scope || (tenantId ? 'tenant' : undefined);
      const scopeRefId =
        formData.scopeRefId ||
        (scope === 'project' ? formData.projectId : undefined) ||
        (scope === 'environment' ? formData.environmentId : undefined) ||
        (scope === 'tenant' ? tenantId : undefined);

      const payload = {
        ...formData,
        scope,
        scopeRefId,
      };

      if (selectedParameter) {
        const parameterId = selectedParameter._id || selectedParameter.id;
        if (!parameterId) {
          toast.error('Parameter ID is missing');
          return;
        }
        await configurationAPI.parameterUpdate(parameterId, payload);
        toast.success('Parameter updated successfully');
      } else {
        await configurationAPI.parameterCreate(payload);
        toast.success('Parameter created successfully');
      }
      setIsPopupOpen(false);
      fetchParameters();
    } catch (error) {
      console.error('Error saving parameter:', error);
      toast.error(`Failed to ${selectedParameter ? 'update' : 'create'} parameter`);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleCreate} style={{ marginBottom: '16px' }}>
        Add Parameter
      </Button>
      {loading ? (
        <DataLoading columns={parameterColumns} />
      ) : parameters.length > 0 ? (
        <DataTable
          data={parameters}
          columns={parameterColumns}
          rowComponent={(parameter: Parameter) => (
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handleEdit(parameter)}>
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(parameter)}
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
        title={selectedParameter ? 'Edit Parameter' : 'Create Parameter'}
        component={
          <GenericForm
            fields={selectedParameter ? updateParameterFormFields : createParameterFormFields}
            submitButtonText={selectedParameter ? 'Update' : 'Create'}
            initialValues={selectedParameter || { isActive: true }}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
        }
      ></Popup>
    </>
  );
};

export default ParametersTab;
