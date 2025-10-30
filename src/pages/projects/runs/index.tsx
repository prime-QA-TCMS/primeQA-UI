import React from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import { ListChecks, CheckCircle, XCircle } from 'lucide-react';
import FilterFormCard from '../../../components/cards/FilterFormCard';
import MetricCardGrid from '../../../components/cards/metricCard/MetricCardGrid';
import { MetricCardData } from '../../../components/cards/metricCard/MetricCardType';
import { suiteFilterFormFields } from '../../../Forms/TestCaseManagement';

const RunsDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    const testMetrics: MetricCardData[] = [
        {
            icon: <ListChecks size={20} />,
            isPercentage: false,
            value: 312,
            color: "blue",
            title: "Total Test Cases"
        },
        {
            icon: <CheckCircle size={20} />,
            isPercentage: true,
            value: 5,
            color: "blue",
            title: "Total Test Runs",
        },
        {
            icon: <CheckCircle size={20} />,
            isPercentage: false,
            value: 125,
            color: "green",
            title: "Executed Test cases",
            trend: { original: 10, current: 125, desiredOutcome: "incline" }
        },
        {
            icon: <XCircle size={20} />,
            isPercentage: false,
            value: 5,
            color: "red",
            title: "Failed Cases",
            trend: { original: 0, current: 5, desiredOutcome: "decline" }
        },
    ];

    const handleFilter = (formData: Record<string, any>) => {
        try {
            console.log("i've been triggered: ", formData);
        } catch (error) {
            console.error("Error handling filter form:", error);
        }
    };

    return (
        <Container sx={styles.root}>
            <MetricCardGrid data={testMetrics} />
            <FilterFormCard name={"Search Test Suites"} filterFormFields={suiteFilterFormFields} onChange={handleFilter}/>

            acutal run records here
        </Container>
    );
};

export default RunsDashboard;
