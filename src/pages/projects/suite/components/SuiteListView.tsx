import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Suite } from '../../../../types';
import { useSuites } from '../../../../hooks/useTestCases';
import { RocketLaunchOutlined } from '@mui/icons-material';
import { GenericList, ListItemData } from 'fog-ui';

const SuiteListView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: suites, loading, error } = useSuites();

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading suites...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load suites. {error?.toString()}
      </Typography>
    );
  }

  if (!suites?.length) {
    return <Typography>No suites found for this project.</Typography>;
  }

  // ✅ Filter out archived and unrelated suites
  const projectSuites = suites.filter((s: Suite) => s.projectId === projectId && s.isActive);

  const accordionItems: ListItemData[] = projectSuites.map((suite: Suite) => ({
    id: suite._id,
    title: `${suite.name}`,
    icon: <RocketLaunchOutlined />,
    link: `/project/${projectId}/suite/${suite._id}`,
  }));

  return <GenericList items={accordionItems} />;
};

export { SuiteListView };
export default SuiteListView;
