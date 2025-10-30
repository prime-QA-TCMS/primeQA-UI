import React from 'react';
import { Container, useTheme } from '@mui/material';
import { SuiteListView } from './components/SuiteListView';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import { ListChecks, CheckCircle } from 'lucide-react';
import MetricCardGrid from '../../../components/cards/metricCard/MetricCardGrid';
import { MetricCardData } from '../../../components/cards/metricCard/MetricCardType';
import { suiteFilterFormFields } from '../../../Forms/TestCaseManagement';
import FilterFormCard from '../../../components/cards/FilterFormCard';

const ProjectSuite: React.FC = () => {
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
            value: 10,
            color: "green",
            title: "Total Test Suites",
        }
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
            <SuiteListView />
        </Container>
    );
};

export default ProjectSuite;
