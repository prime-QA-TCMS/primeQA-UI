import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import { PlayArrow as PlayIcon, OpenInNew as OpenInNewIcon, Add as AddIcon } from '@mui/icons-material';
import { ResultsAPI } from '../../../../api';
import { DataTable, PopUpForm, useService, Popup } from 'fog-ui';
import type { NestedConfig } from 'fog-ui';
import { Test, TestResult, TestRun } from '../../../../types';
import { createResultFormFields } from '../../../../Forms/ResultsManagement';
import TestResultsHistory from './TestResultsHistory';
import RunReport from './RunReport';
import SuiteSelector from './SuiteSelector';

const ProjectRunView: React.FC = () => {
  const { runId, projectId } = useParams<{ runId: string; projectId: string }>();
  const navigate = useNavigate();

  const resultsService = useService('results');
  const resultsAPI = ResultsAPI(resultsService);

  // ─── State ──────────────────────────────────────────────────────────────
  const [run, setRun] = useState<TestRun | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [resultsMap, setResultsMap] = useState<Record<string, TestResult[]>>({});
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingTests, setLoadingTests] = useState(false);
  const [loadingResults, setLoadingResults] = useState<Record<string, boolean>>({});
  const [errorRun, setErrorRun] = useState<string | null>(null);
  const [errorTests, setErrorTests] = useState<string | null>(null);
  const [errorResults, setErrorResults] = useState<Record<string, string | null>>({});
  const [tabValue, setTabValue] = useState(0);
  const [isSuiteSelectorOpen, setIsSuiteSelectorOpen] = useState(false);

  // ─── Fetch Run Details ──────────────────────────────────────────────────
  useEffect(() => {
    if (!runId) {
      console.log('No runId provided');
      return;
    }
    const controller = new AbortController();

    const fetchRun = async () => {
      console.log('Fetching run details for runId:', runId);
      setLoadingRun(true);
      setErrorRun(null);
      try {
        const res = await resultsAPI.runGetById(runId);
        console.log('Run API response:', res);
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;
        console.log('Processed run data:', data);
        setRun(data || null);
      } catch (err: any) {
        console.error('Error fetching run:', err);
        if (err.name !== 'CanceledError') setErrorRun('Failed to load run details: ' + (err.message || 'Unknown error'));
      } finally {
        if (!controller.signal.aborted) setLoadingRun(false);
      }
    };

    fetchRun();
    return () => controller.abort();
  }, [runId]);

  // ─── Fetch Tests for Run ────────────────────────────────────────────────
  useEffect(() => {
    if (!runId) return;
    const controller = new AbortController();

    const fetchTests = async () => {
      console.log('Fetching tests for runId:', runId);
      setLoadingTests(true);
      setErrorTests(null);
      try {
        const res = await resultsAPI.runGetById(runId);
        console.log('Tests API response:', res);
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;
        const testsData = (data as any)?.tests ?? [];
        console.log('Tests data:', testsData);
        setTests(Array.isArray(testsData) ? testsData : []);
      } catch (err: any) {
        console.error('Error fetching tests:', err);
        if (err.name !== 'CanceledError') setErrorTests('Failed to load tests: ' + (err.message || 'Unknown error'));
      } finally {
        if (!controller.signal.aborted) setLoadingTests(false);
      }
    };

    fetchTests();
    return () => controller.abort();
  }, [runId]);

  // ─── Fetch Results per Test (lazy per-row) ──────────────────────────────
  const fetchResults = useCallback(async (testId: string) => {
    if (!testId) return;
    const controller = new AbortController();

    setLoadingResults((prev) => ({ ...prev, [testId]: true }));
    setErrorResults((prev) => ({ ...prev, [testId]: null }));

    try {
      const res = await resultsAPI.resultGetById(testId);
      if (Array.isArray(res?.data)) {
        setResultsMap((prev) => ({ ...prev, [testId]: res.data }));
      } else {
        setResultsMap((prev) => ({ ...prev, [testId]: [] }));
      }
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setErrorResults((prev) => ({ ...prev, [testId]: 'Failed to load results.' }));
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingResults((prev) => ({ ...prev, [testId]: false }));
      }
    }
  }, []);

  // ─── Handle New Result Creation ─────────────────────────────────────────
  const handleCreateResult = useCallback(
    async (testId: string, newResult: TestResult) => {
      try {
        await resultsAPI.resultCreate({ ...newResult, testId });
        await fetchResults(testId); // refresh results for this test only
      } catch (err) {
        console.error('Failed to create result:', err);
      }
    },
    [fetchResults]
  );

  // ─── Refetch Tests ──────────────────────────────────────────────────────
  const refetchTests = useCallback(async () => {
    if (!runId) return;
    setLoadingTests(true);
    try {
      const res = await resultsAPI.runGetById(runId);
      const data = Array.isArray(res?.data) ? res.data[0] : res.data;
      const testsData = (data as any)?.tests ?? [];
      setTests(Array.isArray(testsData) ? testsData : []);
    } catch (err) {
      console.error('Error refetching tests:', err);
    } finally {
      setLoadingTests(false);
    }
  }, [runId]);

  // ─── Columns ────────────────────────────────────────────────────────────
  const testColumns = [
    { key: 'name', label: 'Test Name' },
    { key: 'status', label: 'Status' },
    { key: 'duration', label: 'Duration (s)' },
    { key: 'lastRunAt', label: 'Last Run At' },
  ];

  const nestedColumns = [
    { key: 'status', label: 'Status' },
    { key: 'executedAt', label: 'Executed At' },
    { key: 'logs', label: 'Logs' },
    { key: 'screenshotUrl', label: 'Screenshot' },
  ];

  // ─── Nested Config (per-row loading and cached data) ─────────────────────
  const dynamicNestedConfig: NestedConfig<Test> = React.useMemo(
    () => ({
      getNestedData: (test: Test) => resultsMap[test._id] || [],
      nestedColumns,
      loading: false,
    }),
    [resultsMap]
  );

  // ─── Render ─────────────────────────────────────────────────────────────
  console.log('Rendering ProjectRunView - runId:', runId, 'projectId:', projectId);
  console.log('Current run state:', run);
  console.log('Loading states:', { loadingRun, loadingTests });
  console.log('Error states:', { errorRun, errorTests });

  const createdAt = run?.createdAt ? new Date(run.createdAt) : null;

  if (!runId || !projectId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Missing required parameters (runId or projectId)</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Test Run Details</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(`/project/${projectId}/runs`)}
        >
          Back to Runs
        </Button>
      </Box>

      {/* ── Run Info ───────────────────────────────────── */}
      {loadingRun && <CircularProgress />}
      {errorRun && <Alert severity="error">{errorRun}</Alert>}
      {!loadingRun && !run && !errorRun && (
        <Alert severity="info">No run data found</Alert>
      )}
      {run && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Run Name:</strong> {run.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Run ID:</strong> {run._id}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {run.status} | <strong>Type:</strong> {run.type} |{' '}
                  <strong>Environment:</strong> {run.environment || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Created:</strong> {createdAt ? createdAt.toLocaleString() : '—'}
                </Typography>
              </Box>
              {run.status === 'Running' && (
                <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                  ⏱️ In Progress
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* ── Tabs ────────────────────────────────────────── */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Test List" />
          <Tab label="Run Report" />
        </Tabs>
      </Box>

      {/* ── Tab 0: Tests Table ──────────────────────────── */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Associated Tests</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsSuiteSelectorOpen(true)}
              size="small"
            >
              Add Tests
            </Button>
          </Box>

          {errorTests && <Alert severity="error" sx={{ mb: 2 }}>{errorTests}</Alert>}

          <DataTable
            title="Tests for this Run"
            data={tests}
            columns={testColumns}
            loading={loadingTests}
            nestedConfig={dynamicNestedConfig}
            onRowExpand={(test: Test) => fetchResults(test._id)}
            nestedHeaderComponent={(test: Test) => (
              <Box>
                {errorResults[test._id] && (
                  <Alert severity="error" sx={{ mb: 1 }}>
                    {errorResults[test._id]}
                  </Alert>
                )}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() =>
                      navigate(`/project/${projectId}/runs/${runId}/execute/${test._id}`)
                    }
                  >
                    Execute Test
                  </Button>
                  <CreateResultComponent
                    projectId={projectId!}
                    runId={runId!}
                    onCreated={() => fetchResults(test._id)}
                    onCreateResult={(r: TestResult) => handleCreateResult(test._id, r)}
                  />
                </Box>
                <TestResultsHistory testId={test._id} projectId={projectId!} />
              </Box>
            )}
          />
        </Box>
      )}

      {/* ── Tab 1: Run Report ────────────────────────────── */}
      {tabValue === 1 && (
        <Box>
          {run && <RunReport runId={runId!} projectId={projectId!} run={run} />}
        </Box>
      )}

      {/* ── Suite Selector Popup ────────────────────────── */}
      <Popup
        open={isSuiteSelectorOpen}
        onClose={() => setIsSuiteSelectorOpen(false)}
        title="Add Tests to Run"
        component={
          <SuiteSelector
            onComplete={() => {
              setIsSuiteSelectorOpen(false);
              refetchTests();
            }}
          />
        }
      />
    </Box>
  );
};

// ✅ Create Result Popup Component
interface CreateResultProps {
  projectId: string;
  runId: string;
  onCreated: () => void;
  onCreateResult: (_result: TestResult) => Promise<void>;
}

const CreateResultComponent: React.FC<CreateResultProps> = ({
  projectId,
  runId,
  onCreated,
  onCreateResult,
}) => {
  const handleSubmit = async (formData: any) => {
    await onCreateResult(formData);
    onCreated();
  };

  return (
    <PopUpForm
      suitesFormFields={createResultFormFields}
      onSubmit={handleSubmit}
      submitText="Save Result"
      buttonText="Add Result"
      title="Create Test Result"
    />
  );
};

export default ProjectRunView;
