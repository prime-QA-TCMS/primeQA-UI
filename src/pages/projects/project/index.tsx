import React from 'react';
import { Container, useTheme } from '@mui/material';
import { CheckCircle, XCircle, RefreshCcw, Ban, ListChecks } from "lucide-react";
import { MilestoneListView } from '../project/components/MilestoneListView';
import { RunsListView } from '../project/components/RunsListView';
import MetricCardGrid from '../../../components/cards/metricCard/MetricCardGrid';
import { MetricCardData } from '../../../components/cards/metricCard/MetricCardType';
import { TrendAnalyticsData } from '../../../components/charts/TrendAnalyticsChart/types';
import TrendAnalyticsChart from '../../../components/charts/TrendAnalyticsChart/TrendAnalyticsChart';
import { contentContainer, halfScreenContainer } from '../../../style/muiComponentStyles/containerStyles';

const ProjectDashboard: React.FC = () => {
    const theme = useTheme();
    const halfScreenContainerStyle = halfScreenContainer(theme);
    const styles = contentContainer(theme);
    
    const testMetrics: MetricCardData[] = [
        {
            icon: <ListChecks size={20} />,
            isPercentage: false,
            value: 473,
            color: "blue",
            title: "Total Tests"
        },
        {
            icon: <CheckCircle size={20} />,
            isPercentage: true,
            value: 61,
            color: "green",
            title: "Pass Rate",
            trend: { original: 57.8, current: 61, desiredOutcome: "incline" }
        },
        {
            icon: <XCircle size={20} />,
            isPercentage: true,
            value: 30,
            color: "red",
            title: "Fail Rate",
            trend: { original: 31.5, current: 30, desiredOutcome: "decline" }
        },
        {
            icon: <RefreshCcw size={20} />,
            isPercentage: true,
            value: 6,
            color: "yellow",
            title: "Retest",
            trend: { original: 5.2, current: 6, desiredOutcome: "incline" }
        },
        {
            icon: <Ban size={20} />,
            isPercentage: true,
            value: 3,
            color: "grey",
            title: "Blocked",
            trend: { original: 0.9, current: 3, desiredOutcome: "decline" }
        }
    ];
    const trendExample: TrendAnalyticsData = {
        title: "7-Day Execution Trend",
        xAxisKey: "day",
        data: [
            { day: "Mon", Passed: 150, Failed: 70, Blocked: 60, Retest: 30 },
            { day: "Tue", Passed: 155, Failed: 72, Blocked: 62, Retest: 35 },
            { day: "Wed", Passed: 157, Failed: 74, Blocked: 63, Retest: 33 },
            { day: "Thu", Passed: 158, Failed: 79, Blocked: 65, Retest: 29 },
            { day: "Fri", Passed: 156, Failed: 73, Blocked: 68, Retest: 31 },
            { day: "Sat", Passed: 154, Failed: 74, Blocked: 69, Retest: 32 },
            { day: "Sun", Passed: 155, Failed: 75, Blocked: 70, Retest: 33 }
        ],
        series: [
            { name: "Blocked", color: "#757575", dataKey: "Blocked" },
            { name: "Failed", color: "#E91E63", dataKey: "Failed" },
            { name: "Passed", color: "#4CAF50", dataKey: "Passed" },
            { name: "Retest", color: "#FFC107", dataKey: "Retest" }
        ],
        metrics: [
            { label: "Average Execution Time", value: "2.3 hours" },
            { label: "Tests per Day", value: "67 tests/day" }
        ]
    };

    return (
        <Container sx={styles.root}>
            <MetricCardGrid data={testMetrics} />
            <TrendAnalyticsChart chartData={trendExample} />
            <Container sx={halfScreenContainerStyle.root}><MilestoneListView /></Container>
            <Container sx={halfScreenContainerStyle.root}><RunsListView /></Container>
        </Container>
    );
};

export default ProjectDashboard;
