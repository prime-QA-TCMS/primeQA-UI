import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RocketLaunchOutlined } from "@mui/icons-material";

import GenericPieChart from "../../../../components/charts/pieChart/GenericPieChart";
import GenericList, { ListItemData } from "../../../../components/lists/List";
import { TestRunListItemProps } from "./types";
import { chartData } from "../../../../components/charts/pieChart/type";

import { TestRun, User } from "../../../../types";
import { useRuns } from "../../../../hooks/useResults";
import { useUsers } from "../../../../hooks/useUser";

const RecordListItem: React.FC<TestRunListItemProps> = ({ recordObject, projectId }) => {
  const navigate = useNavigate();

  // ✅ Fetch all users (used to resolve the creator)
  const { data: users, loading: userLoading, error: userError } = useUsers();

  if (userLoading) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress size={24} />
        <Typography variant="body2">Loading user data...</Typography>
      </Box>
    );
  }

  if (userError) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load user data. {userError}
      </Typography>
    );
  }

  // ✅ Build chart data from metrics
  const metrics = recordObject.metrics || {};
  const rawData = [
    { status: "Passed", count: metrics.passed ?? 0, color: "#4CAF50" },
    { status: "Failed", count: metrics.failed ?? 0, color: "#E91E63" },
    { status: "Blocked", count: metrics.blocked ?? 0, color: "#757575" },
    { status: "Untested", count: metrics.untested ?? 0, color: "#FFC107" },
  ];

  const total = rawData.reduce((sum, item) => sum + item.count, 0);

  const testData: chartData[] = rawData.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
  }));

  // ✅ Navigation handler
  const handleNavigation = () => {
    try {
      localStorage.setItem("pageTitle", recordObject.name);
      globalThis.dispatchEvent(
        new StorageEvent("storage", { key: "pageTitle", newValue: recordObject.name })
      );
      navigate(`/project/${projectId}/milestone/${recordObject._id}`);
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  const creator: User | undefined = users?.find((u) => u.id === recordObject.createdBy);

  return (
    <Box sx={{ p: 2 }}>
      <GenericPieChart data={testData} title="Overview" />
      <Typography variant="body2" sx={{ mt: 1 }}>
        <b>Created By: </b>
        {creator
          ? `${creator.firstName ?? "Unknown"} ${creator.lastName ?? ""}`
          : "Unknown User"}
        <br />
        <b>On: </b>
        {recordObject.createdAt
          ? new Date(recordObject.createdAt).toLocaleDateString()
          : "No Date Available"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigation}
        sx={{ mt: 1 }}
      >
        View Run
      </Button>
    </Box>
  );
};

export const RunsListView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  // ✅ Replace mock data with live run data from backend
  const { data: runs, loading, error } = useRuns(projectId || "notfound");

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading test runs...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load test runs. {error}
      </Typography>
    );
  }

  if (!runs?.data?.length) {
    return <Typography>No test runs found for this project.</Typography>;
  }

  // ✅ Filter runs for the current project
  const projectRuns = runs.data.filter((r: TestRun) => r.projectId === projectId);
  console.log("unFiltered", runs);

  // ✅ Separate active runs
  const activeRuns = projectRuns.filter((r: TestRun) => r.status !== "completed");

  console.log("project Filtered", projectRuns);
  const activeListItems: ListItemData[] = activeRuns.map((run: TestRun) => {
    const total =
      (run.metrics?.passed ?? 0) +
      (run.metrics?.failed ?? 0) +
      (run.metrics?.blocked ?? 0) +
      (run.metrics?.untested ?? 0);

    const percentage =
      total > 0 ? Math.round(((run.metrics?.passed ?? 0) / total) * 100) : 0;

    return {
      id: run._id,
      title: `${run.name} (${percentage}%)`,
      icon: <RocketLaunchOutlined />,
      link: `/project/${projectId}/runs/${run._id}`,
    };
  });

  return (
    <>
      {activeListItems.length > 0 ? (
        <>
          <Typography variant="h6" color="text.secondary">
            Active Runs:
          </Typography>
          <GenericList items={activeListItems} />
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No Active Runs
        </Typography>
      )}
    </>
  );
};

export default RunsListView;
