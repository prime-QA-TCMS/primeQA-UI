import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { ResultsAPI } from "../../../../api";
import { DataTable, PopUpForm } from 'fog-ui';
import type { NestedConfig } from 'fog-ui';
import { Test, TestResult, TestRun } from "../../../../types";
import { resultFormFields } from "../../../../Forms/TestCaseManagement";

const ProjectRunView: React.FC = () => {
  const { runId, projectId } = useParams<{ runId: string; projectId: string }>();

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

  // ─── Fetch Run Details ──────────────────────────────────────────────────
  useEffect(() => {
    if (!runId) return;
    const controller = new AbortController();

    const fetchRun = async () => {
      setLoadingRun(true);
      setErrorRun(null);
      try {
        const res = await ResultsAPI.runGetById(runId);
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;
        setRun(data || null);
      } catch (err: any) {
        if (err.name !== "CanceledError") setErrorRun("Failed to load run details.");
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
      setLoadingTests(true);
      setErrorTests(null);
      try {
        const res = await ResultsAPI.runGetById(runId);
        const data = Array.isArray(res?.data) ? res.data[0] : res.data;
        const testsData = (data as any)?.tests ?? [];
        setTests(Array.isArray(testsData) ? testsData : []);
      } catch (err: any) {
        if (err.name !== "CanceledError") setErrorTests("Failed to load tests.");
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

    setLoadingResults(prev => ({ ...prev, [testId]: true }));
    setErrorResults(prev => ({ ...prev, [testId]: null }));

    try {
      const res = await ResultsAPI.resultGetById(testId);
      if (Array.isArray(res?.data)) {
        setResultsMap(prev => ({ ...prev, [testId]: res.data }));
      } else {
        setResultsMap(prev => ({ ...prev, [testId]: [] }));
      }
    } catch (err: any) {
      if (err.name !== "CanceledError") {
        setErrorResults(prev => ({ ...prev, [testId]: "Failed to load results." }));
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingResults(prev => ({ ...prev, [testId]: false }));
      }
    }
  }, []);

  // ─── Handle New Result Creation ─────────────────────────────────────────
  const handleCreateResult = useCallback(
    async (testId: string, newResult: TestResult) => {
      try {
        await ResultsAPI.resultCreate({ ...newResult, testId });
        await fetchResults(testId); // refresh results for this test only
      } catch (err) {
        console.error("Failed to create result:", err);
      }
    },
    [fetchResults]
  );

  // ─── Columns ────────────────────────────────────────────────────────────
  const testColumns = [
    { key: "name", label: "Test Name" },
    { key: "status", label: "Status" },
    { key: "duration", label: "Duration (s)" },
    { key: "lastRunAt", label: "Last Run At" },
  ];

  const nestedColumns = [
    { key: "status", label: "Status" },
    { key: "executedAt", label: "Executed At" },
    { key: "logs", label: "Logs" },
    { key: "screenshotUrl", label: "Screenshot" },
  ];

  // ─── Nested Config (per-row loading and cached data) ─────────────────────
  const getNestedConfigFor = (testId: string): NestedConfig<TestResult> => ({
    getNestedData: () => resultsMap[testId] || [],
    nestedColumns,
    loading: !!loadingResults[testId],
  });

  // ─── Render ─────────────────────────────────────────────────────────────
  const createdAt = run?.createdAt ? new Date(run.createdAt) : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Project Run Details
      </Typography>

      {/* ── Run Info ───────────────────────────── */}
      {loadingRun && <CircularProgress />}
      {errorRun && <Alert severity="error">{errorRun}</Alert>}
      {run && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Run ID:</strong> {run._id}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Status: {run.status} | Created: {createdAt ? createdAt.toLocaleString() : "—"}
          </Typography>
        </>
      )}

      {/* ── Tests Table ────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        Associated Tests
      </Typography>

      {errorTests && <Alert severity="error">{errorTests}</Alert>}

      <DataTable<Test>
        title="Tests for this Run"
        data={tests}
        columns={testColumns}
        loading={loadingTests}
        // ✅ make TypeScript happy: cast nested config to expected type
        nestedConfig={getNestedConfigFor("any") as unknown as NestedConfig<Test>}
        onRowExpand={(test: Test) => fetchResults(test._id)}
        nestedHeaderComponent={(test: Test) => (
          <Box>
            {errorResults[test._id] && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {errorResults[test._id]}
              </Alert>
            )}
            <CreateResultComponent
              projectId={projectId!}
              runId={runId!}
              testId={test._id}
              onCreated={() => fetchResults(test._id)}
              onCreateResult={(r: TestResult) => handleCreateResult(test._id, r)}
            />
          </Box>
        )}
      />
    </Box>
  );
};

// ✅ Create Result Popup Component
interface CreateResultProps {
  projectId: string;
  runId: string;
  testId: string;
  onCreated: () => void;
  onCreateResult: (formData: any, testId: string) => Promise<void>;
}

const CreateResultComponent: React.FC<CreateResultProps> = ({
  projectId,
  runId,
  testId,
  onCreated,
  onCreateResult,
}) => {
  const handleSubmit = async (formData: any) => {
    await onCreateResult(formData, testId);
    onCreated();
  };

  return (
    <PopUpForm
      suitesFormFields={resultFormFields(projectId, runId)} // ✅ fixed: only 2 args
      onSubmit={handleSubmit}
      submitText="Save Result"
      buttonText="Add Result"
      title="Create Test Result"
    />
  );
};

export default ProjectRunView;
