import React from 'react';
import { Container } from '@mui/material';
import GenericPieChart, { chartData } from '../../components/charts/GenericPieChart';
import { MilestoneListView } from './components/MilestoneListView';
import { RunsListView } from './components/RunsListView';

const ProjectDashboard: React.FC = () => {

    const testData: chartData[] = [
    { status: 'Passed', count: 151, percentage: 13, color: '#4CAF50' },
    { status: 'Failed', count: 74, percentage: 1, color: '#E91E63' },
    { status: 'Retest', count: 27, percentage: 0, color: '#FFC107' },
    { status: 'Blocked', count: 65, percentage: 0, color: '#757575' },
    { status: 'N/A', count: 156, percentage: 0, color: '#000000' },
    ];

    return (
        <Container>
            <GenericPieChart data={testData} title={"Test Results Overview"}/>
            <MilestoneListView />
            <RunsListView />
        </Container>
    );
};

export default ProjectDashboard;
