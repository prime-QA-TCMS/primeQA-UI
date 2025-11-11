import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import FilterFormCard from '../../../components/cards/FilterFormCard';
import { suiteFilterFormFields } from '../../../Forms/TestCaseManagement';
import SuiteSelector from './components/SuiteSelector';
import Popup from '../../../components/popup/popup';
import { TestRun } from '../../../types';
import { useParams } from 'react-router-dom';
import RunsListView from '../project/components/RunsListView';
import { ResultsAPI } from '../../../api/results.api';

const RunsDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleOpen = () => setIsPopupOpen(true);
    const handleClose = () => setIsPopupOpen(false);
    const [runsData, setrunsData] = useState<TestRun[] | null>(null);
    const { projectId } = useParams<{ projectId: string }>();
    const [loading, setLoading] = useState(false);

    
      const fetchTestMetrics = useCallback(async () => {
        if (!projectId) return;
    
        setLoading(true);
        try {
          const [runsRes] = await Promise.all([
            ResultsAPI.runGetByProjectId(projectId),
          ]);
    
          const runs = runsRes?.data?.data ? Array.isArray(runsRes?.data?.data) ? runsRes?.data?.data : [] : [];
    
          setrunsData(runsRes?.data?.data || []);
          // 🧩 Totals
          const totalRuns = runs.length;
    
          console.log("totalRuns", totalRuns);
    
        } catch (err) {
          console.error("Dashboard fetch error:", err);
        } finally {
          setLoading(false);
        }
      }, [projectId]);
    
      useEffect(() => {
        fetchTestMetrics();
      }, [fetchTestMetrics]);

    const handleFilter = (formData: Record<string, any>) => {
        try {
            console.log("i've been triggered: ", formData);
        } catch (error) {
            console.error("Error handling filter form:", error);
        }
    };


    return (
        <Container sx={styles.root}>
            <FilterFormCard name={"Search Test Suites"} filterFormFields={suiteFilterFormFields} onChange={handleFilter}/>

            
            <Button onClick={handleOpen}>{"Create Run"}</Button>
            <Popup title={"Select Cases for Run"} open={isPopupOpen} onClose={handleClose} component={
                <SuiteSelector />
            } />
            
            <RunsListView runs={runsData}/>
        </Container>
    );
};

export default RunsDashboard;
