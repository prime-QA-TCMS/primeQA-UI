import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import RunsList from './components/RunsList';

const RunsDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <Box sx={{ p: 3 }}>Project ID is required</Box>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <RunsList projectId={projectId} />
    </Container>
  );
};

export default RunsDashboard;

