import React from 'react';
import { Container, useTheme } from '@mui/material';
import { SuiteListView } from './components/SuiteListView';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import { ListChecks, CheckCircle } from 'lucide-react';
import MetricCardGrid from '../../../components/cards/metricCard/MetricCardGrid';
import { MetricCardData } from '../../../components/cards/metricCard/MetricCardType';
import { suiteFilterFormFields, suitesFormFields } from '../../../Forms/TestCaseManagement';
import FilterFormCard from '../../../components/cards/FilterFormCard';
import PopUpForm from '../../../components/forms/PopUpForm';
import { useParams } from 'react-router-dom';
import { useSuites, useCreateSuite } from '../../../hooks/useTestCases';

const ProjectSuite: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    const { projectId } = useParams<{ projectId: string }>();
    const { refetch } = useSuites();
    const { createSuite } = useCreateSuite();
    
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

    const handleCreateSave = async (formData: any) => {
      try {
        const response = await createSuite(formData); // ✅ just call it here

        if (response) {
          console.log("✅ Suite created successfully:", response);
          await refetch();
        } else {
          console.warn("⚠️ Suite creation returned null or empty response.");
        }
        return response;
      } catch (err) {
        console.error("❌ Error creating suite:", err);
        return null;
      }
    };

    return (
        <Container sx={styles.root}>
            <MetricCardGrid data={testMetrics} />
            <PopUpForm
                suitesFormFields={suitesFormFields(projectId)}
                onSubmit={handleCreateSave}
                submitText="Save Suite"
                buttonText="Add Suite"
                title="Create New Suite"
            />
            <FilterFormCard name={"Search Test Suites"} filterFormFields={suiteFilterFormFields} onChange={handleFilter}/>
            <SuiteListView />
        </Container>
    );
};

export default ProjectSuite;
