import React from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMilestones } from "../../../../hooks/useProjects";
import { GenericPieChart } from "fog-ui";
import type { chartData } from "fog-ui";
import { Milestone } from "../../../../types";

const ProjectMilestoneView: React.FC = () => {
  const { projectId, milestoneId } = useParams<{ projectId: string; milestoneId: string }>();

  const { data: milestones, loading, error } = useMilestones(projectId || "");

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>Loading milestone details...</Typography>
      </Box>
    );
  }

  if (error) { return (<Typography color="error" sx={{ mt: 2 }}>Failed to load milestones. {String(error)}</Typography>); }

  const filteredMilestone: Milestone | undefined = milestones?.find(
    (m: Milestone) => m._id === milestoneId
  );

  if (!filteredMilestone) { return (<Typography sx={{ mt: 2 }}>Milestone not found for this project.</Typography>); }

  const { passed = 0, failed = 0, blocked = 0, untested = 0 } = filteredMilestone.metrics || {};

  const chartContents: chartData[] = [
    { status: "Passed", count: passed, percentage: 0, color: "#4CAF50" },
    { status: "Failed", count: failed, percentage: 0, color: "#E91E63" },
    { status: "Blocked", count: blocked, percentage: 0, color: "#FFC107" },
    { status: "Untested", count: untested, percentage: 0, color: "#757575" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {filteredMilestone.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {filteredMilestone.description || "No description provided."}
      </Typography>

      <GenericPieChart data={chartContents} />

      <Typography variant="body2" color="text.secondary">
        <strong> Start Date:</strong>{" "}
        {filteredMilestone.startDate
          ? new Date(filteredMilestone.startDate).toLocaleDateString()
          : "N/A"}
        <strong> End Date:</strong>{" "}
        {filteredMilestone.endDate
          ? new Date(filteredMilestone.endDate).toLocaleDateString()
          : "N/A"}
        <strong> Status:</strong> {filteredMilestone.status}
      </Typography>


    </Box>
  );
};

export default ProjectMilestoneView;
