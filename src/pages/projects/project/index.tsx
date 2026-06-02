import React, { useEffect, useState, useMemo } from 'react';
import { Container, useTheme, Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Ban, ListChecks } from 'lucide-react';
import { MilestoneListView } from '../project/components/MilestoneListView';
import { RunsListView } from '../project/components/RunsListView';
import {
  MetricCardGrid,
  TrendAnalyticsChart,
  TrendAnalyticsData,
  contentContainer,
  halfScreenContainer,
  useService,
} from 'fog-ui';
import type { MetricCardData } from 'fog-ui';
import { ResultsAPI, ProjectAPI } from '../../../api';
import { TestRun, Project } from '../../../types';

const ProjectDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const halfScreenContainerStyle = halfScreenContainer(theme);
  const styles = contentContainer(theme);
  const { projectId } = useParams<{ projectId: string }>();

  const resultsService = useService('results');
  const projectService = useService('project');
  const resultsAPI = useMemo(() => ResultsAPI(resultsService), [resultsService]);
  const projectAPI = useMemo(() => ProjectAPI(projectService), [projectService]);

  const [project, setProject] = useState<Project | null>(null);
  const [metrics, setMetrics] = useState<MetricCardData[]>([]);
  const [trendData, setTrendData] = useState<TrendAnalyticsData | null>(null);
  const [runsData, setrunsData] = useState<TestRun[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) return;

      try {
        const projectData = await projectAPI.projectGetById(projectId);
        setProject(projectData);
        localStorage.setItem('pageTitle', projectData?.name || 'Project');
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    };

    fetchProjectData();
  }, [projectId, projectAPI]);

  useEffect(() => {
    const fetchTestMetrics = async () => {
      if (!projectId) return;

      setLoading(true);
      try {
        const [runsRes, testsRes, resultsRes] = await Promise.all([
          resultsAPI.runGetByProjectId(projectId),
          resultsAPI.testGetByProjectId(projectId),
          resultsAPI.resultGetByProjectId(projectId),
        ]);

        const runs = runsRes?.data?.data
          ? Array.isArray(runsRes?.data?.data)
            ? runsRes?.data?.data
            : []
          : [];

        setrunsData(runsRes?.data?.data || []);
        const tests = testsRes?.data
          ? Array.isArray(testsRes?.data?.tests)
            ? testsRes.data?.tests
            : []
          : [];
        const results = Array.isArray(resultsRes?.data?.data) ? resultsRes.data?.data : [];

        // 🧩 Totals
        const totalRuns = runs.length;
        const totalTests = tests.length;
        const totalResults = results.length;

        console.log('totalRuns', totalRuns);
        console.log('totalTests', totalTests);
        console.log('totalResults', totalResults);

        // 🧠 Count results by status
        const statusCounts = results.reduce((acc: Record<string, number>, r) => {
          const key = r.status.charAt(0).toUpperCase() + r.status.slice(1); // capitalize
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        const getRate = (status: string) =>
          totalResults > 0 ? ((statusCounts[status] || 0) / totalResults) * 100 : 0;

        // 🧮 Build metrics
        const metricsData: MetricCardData[] = [
          {
            icon: <ListChecks size={20} />,
            isPercentage: false,
            value: totalTests,
            color: 'blue',
            title: 'Total Tests',
          },
          {
            icon: <ListChecks size={20} />,
            isPercentage: false,
            value: totalRuns,
            color: 'blue',
            title: 'Total Runs',
          },
          {
            icon: <CheckCircle size={20} />,
            isPercentage: true,
            value: parseFloat(getRate('Passed').toFixed(1)),
            color: 'green',
            title: 'Pass Rate',
          },
          {
            icon: <XCircle size={20} />,
            isPercentage: true,
            value: parseFloat(getRate('Failed').toFixed(1)),
            color: 'red',
            title: 'Fail Rate',
          },
          {
            icon: <Ban size={20} />,
            isPercentage: true,
            value: parseFloat(getRate('Blocked').toFixed(1)),
            color: 'grey',
            title: 'Blocked Rate',
          },
        ];

        // 🧾 Build 7-day trend chart (using actual dates)
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - (6 - i)); // 6 days ago to today
          return date.toISOString().split('T')[0]; // YYYY-MM-DD
        });

        // Initialize all 7 days with zero counts
        const groupedByDate = last7Days.reduce((acc: any, dateStr) => {
          acc[dateStr] = {
            date: dateStr,
            day: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
            Passed: 0,
            Failed: 0,
            Blocked: 0,
            Retest: 0,
          };
          return acc;
        }, {});

        // Count results by date
        results.forEach((r) => {
          const createdDate = r.createdAt ? new Date(r.createdAt) : new Date();
          const dateStr = createdDate.toISOString().split('T')[0]; // YYYY-MM-DD

          if (groupedByDate[dateStr]) {
            const key = r.status.charAt(0).toUpperCase() + r.status.slice(1);
            if (groupedByDate[dateStr][key] !== undefined) {
              groupedByDate[dateStr][key] += 1;
            }
          }
        });

        const trendArray = last7Days.map((dateStr) => groupedByDate[dateStr]);

        const trendAnalytics: TrendAnalyticsData = {
          title: 'Last 7 Days Execution Trend',
          xAxisKey: 'day',
          data: trendArray,
          series: [
            { name: 'Blocked', color: theme.palette.grey[600], dataKey: 'Blocked' },
            { name: 'Failed', color: theme.palette.error.main, dataKey: 'Failed' },
            { name: 'Passed', color: theme.palette.success.main, dataKey: 'Passed' },
            { name: 'Retest', color: theme.palette.warning.main, dataKey: 'Retest' },
          ],
          metrics: [
            { label: 'Total Executions', value: `${totalResults}` },
            { label: 'Tests/Day (avg)', value: `${(totalResults / 7).toFixed(1)}` },
          ],
          /* Project Metadata Card */
        }
        {
          project && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.key} • {project.visibility} • {project.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                    {project.description && (
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {project.description}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/project/${projectId}/settings`)}
                  >
                    Settings
                  </Button>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/project/${projectId}/suites`)}
                    >
                      Test Suites
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/project/${projectId}/runs`)}
                    >
                      Test Runs
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/project/${projectId}/milestones`)}
                    >
                      Milestones
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/project/${projectId}/settings`)}
                    >
                      Configuration
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )
        }

        { };

        setMetrics(metricsData);
        setTrendData(trendAnalytics);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestMetrics();
  }, [projectId, resultsAPI, theme]);

  return (
    <Container sx={styles.root}>
      {loading ? (
        <p>Loading project metrics...</p>
      ) : (
        <>
          <MetricCardGrid data={metrics} />
          {trendData && <TrendAnalyticsChart chartData={trendData} />}
          <Container sx={halfScreenContainerStyle.root}>
            <MilestoneListView />
          </Container>
          {runsData ? (
            <Container sx={halfScreenContainerStyle.root}>
              <RunsListView runs={runsData} />
            </Container>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default ProjectDashboard;
