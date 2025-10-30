import React from 'react';
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useJsonData } from '../../../../utils/useJsonData';
import AccordionList, { AccordionItem } from '../../../../components/lists/AccordionList';
import { SuiteListItemProps } from './types';
import { Section, Suite } from '../../../../types/database/Suites';
import { TestCase } from '../../../../types/database/TestCase';

const RecordListItem: React.FC<SuiteListItemProps> = ({ recordObject, projectID }) => {
    const navigate = useNavigate();

    const { data: testCasesData, loading: testCasesLoading, error: testCasesError } = useJsonData<TestCase[]>("/mock-data/testcases.json");
    const { data: suiteSectionsData, loading: suiteSectionsLoading, error: suiteSectionsError } = useJsonData<Section[]>("/mock-data/sections.json");
    
    if (testCasesLoading) return <p>Loading users...</p>;
    if (testCasesError) return <p style={{ color: "red" }}>Error: {testCasesError}</p>;
    if (!testCasesData || testCasesData.length === 0) return <p>No Test Cases found.</p>;

    if (suiteSectionsLoading) return <p>Loading users...</p>;
    if (suiteSectionsError) return <p style={{ color: "red" }}>Error: {suiteSectionsError}</p>;
    if (!suiteSectionsData || suiteSectionsData.length === 0) return <p>No Sections found.</p>;

    const handleNavigation = () => {
        try {
            localStorage.setItem('pageTitle', recordObject.name);
            localStorage.setItem('suiteId', recordObject._id);

            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'pageTitle', newValue: recordObject.name }));
            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'suiteId', newValue: recordObject._id }));

            navigate("/project/" + projectID + "/suite/" + recordObject._id);
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };


    
    const testCasesDataFiltered = testCasesData.filter((p) => p.suiteId === recordObject._id);
    const suiteSectionsDataFiltered = suiteSectionsData.filter((p) => p.projectId === projectID && p.suiteId === recordObject._id);
    return (
        <Box>
            <p><b>Total Cases: </b>{testCasesDataFiltered ? testCasesDataFiltered.length : "No Project status"}
            <br/><b>Total Sections: </b>{suiteSectionsDataFiltered ? suiteSectionsDataFiltered.length : "No Project status"}</p>
            <button onClick={handleNavigation}>View Project</button>
        </ Box>
    )
} ;

export const SuiteListView: React.FC = () => {
    const projectID = localStorage.getItem("projectId");
    const { data, loading, error } = useJsonData<Suite[]>("/mock-data/suites.json");

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!data || data.length === 0) return <p>No users found.</p>;

    const projectData = data.filter((p) => p.projectId === projectID && !p.isArchived);

    const activeAccordion: AccordionItem[] = projectData.map((record) => {
        return {
            id: record._id,
            title: record.name,
            percentage: null,
            component: <RecordListItem recordObject={record} projectID={projectID} />,
        };
    });

    return <AccordionList items={activeAccordion} />;
} ;