import React from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { contentContainer } from 'fog-ui';
import { useSuiteById } from '../../../hooks/useTestCases';
import SectionsAccordion from './components/SectionsAccordion';

const ProjectSuiteView: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);
  const { projectId, suiteId } = useParams<{ projectId: string; suiteId: string }>();

  const { data, loading, error } = useSuiteById(suiteId || 'notfound');

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading test suite...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load test suite. {error?.toString()}
      </Typography>
    );
  }

  if (!data) {
    return <Typography>No test suite found for this project.</Typography>;
  }

  return (
    <Container sx={styles.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {data.name}
        </Typography>
        {data.description && (
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            {data.description}
          </Typography>
        )}

        <SectionsAccordion projectId={projectId!} suiteId={suiteId!} />
      </Box>
    </Container>
  );
};

export default ProjectSuiteView;
