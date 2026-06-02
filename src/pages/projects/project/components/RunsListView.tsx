import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { RocketLaunchOutlined } from '@mui/icons-material';
import { GenericList, ListItemData } from 'fog-ui';
import { TestRun } from '../../../../types';

interface RunsListViewProps {
  runs: TestRun[] | any; // to handle API object temporarily
}

export const RunsListView: React.FC<RunsListViewProps> = ({ runs }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const runsArray: TestRun[] = Array.isArray(runs) ? runs : [];
  if (!runsArray.length) {
    return <Typography>No test runs found for this project.</Typography>;
  }
  const projectRuns = projectId ? runsArray.filter((r) => r.projectId === projectId) : runsArray;
  const activeRuns = projectRuns.filter((r) => r.status !== 'Completed');

  const activeListItems: ListItemData[] = activeRuns.map((run: TestRun) => {
    const total =
      (run.metrics?.passed ?? 0) +
      (run.metrics?.failed ?? 0) +
      (run.metrics?.blocked ?? 0) +
      (run.metrics?.untested ?? 0);

    const percentage = total > 0 ? Math.round(((run.metrics?.passed ?? 0) / total) * 100) : 0;

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
            Active Runs
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
