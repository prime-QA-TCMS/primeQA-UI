import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface DummyProjectProps {
  SuiteName: string;
  suiteId: any;
}

const DummySuiteComponent: React.FC<DummyProjectProps> = ({ SuiteName, suiteId }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        try {
            localStorage.setItem('pageTitle', SuiteName);
            
            const suiteIndex = suiteId - 1;
            localStorage.setItem('suiteId', suiteIndex.toString());

            // ✅ Manually trigger a storage event for same-tab updates
            window.dispatchEvent(new StorageEvent('storage', { key: 'pageTitle', newValue: SuiteName }));

            navigate('/project/1/suite/' + suiteIndex);
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    return (
    <Box>
        <p >test cases: x</p>
        <p >Description </p>
        <button onClick={handleLogin}>Todos : Milestones : Runs : suites : reports</button>
    </ Box>
)
} ;

export const suiteAccordionData = [
    { id: 1, title: "I'm a random project name", percentage: 100, component: <DummySuiteComponent SuiteName={"I'm a random project name"} suiteId={1}/> },
    { id: 2, title: 'Project 2', percentage: 75, component: <DummySuiteComponent SuiteName={"Suite Two"} suiteId={2}/> },
    { id: 3, title: 'Project 3', percentage: 45.6, component: <DummySuiteComponent SuiteName={"Suite Three"} suiteId={3}/> },
];

export const dummyCasesData = [
    {
        "id": 1,
        "name": "test case Name 1",
        "preconditions": "preconditions list details",
        "steps": "Steps list details",
        "expectedResults": "expectedResults list details"
    },
    {
        "id": 2,
        "name": "test case Name 2",
        "preconditions": "preconditions list details",
        "steps": "Steps list details",
        "expectedResults": "expectedResults list details"
    },
    {
        "id": 3,
        "name": "test case Name 3",
        "preconditions": "preconditions list details",
        "steps": "Steps list details",
        "expectedResults": "expectedResults list details"
    },
    {
        "id": 4,
        "name": "test case Name 4",
        "preconditions": "preconditions list details",
        "steps": "Steps list details",
        "expectedResults": "expectedResults list details"
    }
];

export const dummyCaseSectionsData1 = [
    {
        "id": 1,
        "sectionName": "Section Name 1",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
];
export const dummyCaseSectionsData2 = [
    {
        "id": 1,
        "sectionName": "Section Name 1",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
];
export const dummyCaseSectionsData3 = [
    {
        "id": 1,
        "sectionName": "Section Name 1",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
    {
        "id": 2,
        "sectionName": "Section Name 2",
        "testCases": dummyCasesData
    },
];

export const dummySuiteData = [
    {
        "id": 1,
        "name": "Suite Name 1",
        "description": "Suite Description",
        "sections": dummyCaseSectionsData1
    },
    {
        "id": 2,
        "name": "Suite Name 2",
        "description": "Suite Description",
        "sections": dummyCaseSectionsData2
    },
    {
        "id": 3,
        "name": "Suite Name 3",
        "description": "Suite Description",
        "sections": dummyCaseSectionsData3
    },
];