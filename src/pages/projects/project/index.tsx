import React, { useCallback, useEffect, useState } from "react";
import { Container, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, RefreshCcw, Ban, ListChecks } from "lucide-react";
import { MilestoneListView } from "../project/components/MilestoneListView";
import { RunsListView } from "../project/components/RunsListView";
import { MetricCardGrid, TrendAnalyticsChart, TrendAnalyticsData } from "fog-ui";
import type { MetricCardData } from "fog-ui";
import { contentContainer, halfScreenContainer } from "../../../style/muiComponentStyles/containerStyles";
import { ResultsAPI } from "../../../api";
import { TestResult, TestRun } from "../../../types";

const ProjectDashboard: React.FC = () => {
  const theme = useTheme();
  const halfScreenContainerStyle = halfScreenContainer(theme);
  const styles = contentContainer(theme);
  const { projectId } = useParams<{ projectId: string }>();

  const [metrics, setMetrics] = useState<MetricCardData[]>([]);
  const [trendData, setTrendData] = useState<TrendAnalyticsData | null>(null);
  const [runsData, setrunsData] = useState<TestRun[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTestMetrics = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    try {
      const [runsRes, testsRes, resultsRes] = await Promise.all([
        ResultsAPI.runGetByProjectId(projectId),
        ResultsAPI.testGetByProjectId(projectId),
        ResultsAPI.resultGetByProjectId(projectId),
      ]);

      const runs = runsRes?.data?.data ? Array.isArray(runsRes?.data?.data) ? runsRes?.data?.data : [] : [];

      setrunsData(runsRes?.data?.data || []);
      const tests = testsRes?.data ? Array.isArray(testsRes?.data?.tests) ? testsRes.data?.tests : [] : [];
      const results = Array.isArray(resultsRes?.data?.data)
        ? resultsRes.data?.data
        : [];

      // 🧩 Totals
      const totalRuns = runs.length;
      const totalTests = tests.length;
      const totalResults = results.length;

      console.log("totalRuns", totalRuns);
      console.log("totalTests", totalTests);
      console.log("totalResults", totalResults);

      // 🧠 Count results by status
      const statusCounts = results.reduce(
        (acc: Record<string, number>, r) => {
          const key = r.status.charAt(0).toUpperCase() + r.status.slice(1); // capitalize
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        {}
      );

      const getRate = (status: string) => totalResults > 0 ? ((statusCounts[status] || 0) / totalResults) * 100 : 0;

      // 🧮 Build metrics
      const metricsData: MetricCardData[] = [
        {
          icon: <ListChecks size={20} />,
          isPercentage: false,
          value: totalTests,
          color: "blue",
          title: "Total Tests",
        },
        {
          icon: <ListChecks size={20} />,
          isPercentage: false,
          value: totalRuns,
          color: "blue",
          title: "Total Runs",
        },
        {
          icon: <CheckCircle size={20} />,
          isPercentage: true,
          value: parseFloat(getRate("Passed").toFixed(1)),
          color: "green",
          title: "Pass Rate",
        },
        {
          icon: <XCircle size={20} />,
          isPercentage: true,
          value: parseFloat(getRate("Failed").toFixed(1)),
          color: "red",
          title: "Fail Rate",
        },
        {
          icon: <Ban size={20} />,
          isPercentage: true,
          value: parseFloat(getRate("Blocked").toFixed(1)),
          color: "grey",
          title: "Blocked Rate",
        },
      ];

      // 🧾 Build 7-day trend chart
      const groupedByDay = results.reduce((acc: any, r) => {
        const createdDate = r.createdAt ? new Date(r.createdAt) : new Date(); // fallback
        const day = createdDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
        acc[day] = acc[day] || { day, Passed: 0, Failed: 0, Blocked: 0, Retest: 0 };
        const key = r.status.charAt(0).toUpperCase() + r.status.slice(1);
        if (acc[day][key] !== undefined) acc[day][key] += 1;
        return acc;
      }, {});

      const sortedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const trendArray = sortedDays
        .filter((day) => groupedByDay[day])
        .map((day) => groupedByDay[day]);

      const trendAnalytics: TrendAnalyticsData = {
        title: "7-Day Execution Trend",
        xAxisKey: "day",
        data: trendArray,
        series: [
          { name: "Blocked", color: "#757575", dataKey: "Blocked" },
          { name: "Failed", color: "#E91E63", dataKey: "Failed" },
          { name: "Passed", color: "#4CAF50", dataKey: "Passed" },
          { name: "Retest", color: "#FFC107", dataKey: "Retest" },
        ],
        metrics: [
          { label: "Total Executions", value: `${totalResults}` },
          { label: "Tests/Day (avg)", value: `${(totalResults / 7).toFixed(1)} tests/day` },
        ],
      };

      setMetrics(metricsData);
      setTrendData(trendAnalytics);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTestMetrics();
  }, [fetchTestMetrics]);

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
          {runsData ?
            <Container sx={halfScreenContainerStyle.root}>
              <RunsListView runs={runsData} />
            </Container>
            : null}
        </>
      )}
    </Container>
  );
};

export default ProjectDashboard;
