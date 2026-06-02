import React from 'react';
import { Box, CircularProgress, Container, Typography, useTheme } from '@mui/material';
import { contentContainer } from 'fog-ui';
import { CardListContainer, GenericPieChart } from 'fog-ui';
import type { chartData, CardItem } from 'fog-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useMilestones } from '../../../hooks/useProjects';
import { Milestone, Metrics } from '../../../types';

const MilestoneGraph: React.FC<{ metrics?: Metrics }> = ({ metrics }) => {
  const { passed = 0, failed = 0, blocked = 0, untested = 0 } = metrics || {};

  const chartContents: chartData[] = [
    { status: 'Passed', count: passed, percentage: 0, color: '#4CAF50' },
    { status: 'Failed', count: failed, percentage: 0, color: '#E91E63' },
    { status: 'Blocked', count: blocked, percentage: 0, color: '#FFC107' },
    { status: 'Untested', count: untested, percentage: 0, color: '#757575' },
  ];

  return <GenericPieChart title="Overview" data={chartContents} />;
};

const MilestonesDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = contentContainer(theme);
  const { projectId } = useParams<{ projectId: string }>();
  const { data: milestones, loading, error } = useMilestones(projectId || '');

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading milestones...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load milestones. {String(error)}
      </Typography>
    );
  }

  if (!milestones || milestones.length === 0) {
    return <Typography sx={{ mt: 2 }}>No milestones found for this project.</Typography>;
  }

  const cardData: CardItem[] = milestones.map((m: Milestone) => ({
    id: m._id,
    title: m.title,
    description: m.description || 'No description provided.',
    // TODO: Fetch metrics from test results associated with this milestone
    component: <MilestoneGraph metrics={undefined} />,
    onViewClick: () => {
      navigate(`/project/${projectId}/milestone/${m._id}`);
    },
  }));

  return (
    <Container sx={styles.root}>
      <CardListContainer cards={cardData} />
    </Container>
  );
};

export default MilestonesDashboard;
