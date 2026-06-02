import React, { useCallback, useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { RocketLaunchOutlined } from '@mui/icons-material';

import { GenericList, useApi, useService } from 'fog-ui';
import type { ListItemData } from 'fog-ui';

import { Milestone } from '../../../../types';
import { ProjectAPI } from '../../../../api';

// Removed unused RecordListItem to avoid unused var warnings

// ---------- Milestone List View ----------
export const MilestoneListView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const projectService = useService('project');
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const fetchMilestones = useCallback(
    () => projectAPI.milestoneGetAll(projectId ? projectId : 'notFound'),
    [projectId, projectAPI]
  );

  const { data: milestones, loading, error } = useApi<Milestone[]>(fetchMilestones, [projectId]);

  if (loading)
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
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
    id: record._id || '',
    title: record.title,
    icon: <RocketLaunchOutlined />,
    link: `/project/${projectId}/milestone/${record._id}`,
  }));

  const completedList: ListItemData[] = completedMilestones.map((record) => ({
    id: record._id || '',
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
