import React, { useCallback } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RocketLaunchOutlined } from "@mui/icons-material";

import { GenericPieChart, GenericList } from "fog-ui";
import type { chartData, ListItemData } from "fog-ui";

import { Milestone } from "../../../../types";
import { useApi } from "../../../../hooks/useApi";
import { ProjectAPI } from "../../../../api";

// ---------- Single Milestone Item ----------
interface ListItemProps {
  recordObject: Milestone;
  projectId: string;
}

const RecordListItem: React.FC<ListItemProps> = ({ recordObject, projectId }) => {
  const navigate = useNavigate();

  // ✅ Generate test metrics (fallback-safe)
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

  // ✅ Navigate to milestone detail page
  const handleNavigation = () => {
    try {
      localStorage.setItem("pageTitle", recordObject.title);
      globalThis.dispatchEvent(
        new StorageEvent("storage", { key: "pageTitle", newValue: recordObject.title })
      );
      navigate(`/project/${projectId}/milestone/${recordObject._id}`);
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <GenericPieChart data={testData} title="Overview" />
      <Typography variant="body2" sx={{ mt: 1 }}>
        <b>Description:</b> {recordObject.description || "No milestone description"}
      </Typography>
      <Typography variant="body2">
        <b>Status:</b> {recordObject.isCompleted ? "Completed" : "Active"}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ mt: 1 }}
        onClick={handleNavigation}
      >
        View Milestone
      </Button>
    </Box>
  );
};

// ---------- Milestone List View ----------
export const MilestoneListView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  // ✅ useCallback ensures stable reference across re-renders
  const fetchMilestones = useCallback(
    () => ProjectAPI.milestoneGetAll(projectId ? projectId : "notFound"),
    [projectId]
  );

  // ✅ This now runs ONCE per mount (unless projectId changes)
  const { data: milestones, loading, error } = useApi<Milestone[]>(fetchMilestones, [projectId]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress size={28} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading milestones...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load milestones. {String(error)}
      </Typography>
    );

  if (!milestones?.length)
    return (
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        No milestones found for this project.
      </Typography>
    );

  // ✅ Separate Active vs Completed
  const activeMilestones = milestones.filter((m) => !m.isCompleted);
  const completedMilestones = milestones.filter((m) => m.isCompleted);

  // ✅ Create list items for each
  const activeList: ListItemData[] = activeMilestones.map((record) => ({
    id: record._id || "",
    title: record.title,
    icon: <RocketLaunchOutlined />,
    link: `/project/${projectId}/milestone/${record._id}`,
  }));

  const completedList: ListItemData[] = completedMilestones.map((record) => ({
    id: record._id || "",
    title: record.title,
    icon: <RocketLaunchOutlined />,
    link: `/project/${projectId}/milestone/${record._id}`,
  }));

  return (
    <>
      {activeList.length > 0 ? (
        <>
          <Typography variant="h6" color="text.secondary">
            Active Milestones
          </Typography>
          <GenericList items={activeList} />
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No Active Milestones
        </Typography>
      )}

      {completedList.length > 0 ? (
        <>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Completed Milestones
          </Typography>
          <GenericList items={completedList} />
        </>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          No Completed Milestones
        </Typography>
      )}
    </>
  );
};

export default MilestoneListView;
