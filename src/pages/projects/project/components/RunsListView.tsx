import React from 'react';
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TestRunListItemProps } from "./types";
import GenericPieChart from '../../../../components/charts/pieChart/GenericPieChart';
import { TestRun } from '../../../../types/database/Runs';
import { User } from '../../../../types/database/Users';
import { useJsonData } from '../../../../utils/useJsonData';
import { chartData } from '../../../../components/charts/pieChart/type';
import { RocketLaunchOutlined } from '@mui/icons-material';
import GenericList, { ListItemData } from '../../../../components/lists/List';

const RecordListItem: React.FC<TestRunListItemProps> = ({ recordObject, projectID }) => {
    const navigate = useNavigate();

    const { data: userData, loading, error } = useJsonData<User[]>("/mock-data/users.json");
    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!userData || userData.length === 0) return <p>No users found.</p>;


    const metrics = recordObject.metrics || {};
    const rawData = [
        { status: "Passed", count: metrics.passed ?? 0, color: "#4CAF50" },
        { status: "Failed", count: metrics.failed ?? 0, color: "#E91E63" },
        { status: "Blocked", count: metrics.blocked ?? 0, color: "#757575" },
        { status: "Untested", count: metrics.untested ?? 0, color: "#FFC107" },
    ];
    const total = rawData.reduce((sum, item) => sum + item.count, 0);
    
    const testData: chartData[] = rawData.map((item) => ({
        ...item,
        percentage: total > 0 ? Math.round((item.count / total) * 100) : 0,
    }));

    const handleNavigation = () => {
        try {
            localStorage.setItem('pageTitle', recordObject.name);

            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'pageTitle', newValue: recordObject.name }));

            navigate("/project/" + projectID + "/milestone/" + recordObject._id);
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    const creator: User | undefined = userData.find((p) => p._id === recordObject.createdBy);
    return (
        <Box>
            <GenericPieChart data={testData} title={"Overview"}/>
            <p><b>Created By: </b>
            {creator?.firstName ? creator?.firstName : "User Not Found"} {creator?.lastName ? creator?.lastName : "User Not Found"} 
            <br/><b>On: </b>{recordObject.createdAt ? recordObject.createdAt : "No Project status"}</p>
            <button onClick={handleNavigation}>View Project</button>
        </ Box>
    )
} ;

export const RunsListView: React.FC = () => {
    const projectID = localStorage.getItem("projectId");
    const { data, loading, error } = useJsonData<TestRun[]>("/mock-data/testruns.json");

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!data || data.length === 0) return <p>No users found.</p>;

    const projectRuns = data.filter((p) => p.projectId === projectID);

    // Separate projects by state
    const activeData = projectRuns.filter((p) => p.status !== "Completed");

    const activeAccordion: ListItemData[] = activeData.map((record) => {
        const total =
            (record.metrics?.passed ?? 0) +
            (record.metrics?.failed ?? 0) +
            (record.metrics?.blocked ?? 0) +
            (record.metrics?.untested ?? 0);

        const percentage = total > 0 ? Math.round(((record.metrics?.passed ?? 0) / total) * 100) : 0;

        return {
            id: record._id,
            title: record.name + " (" + percentage + "%)",
            icon: <RocketLaunchOutlined />,
            link: "/project/" + projectID + "/milestone/" + record._id,
        };
    });

    return (
        <>
            {activeAccordion.length > 0 ? 
            <>
                <Typography variant="h6" color="text.secondary">Active Runs:</Typography>
                <GenericList items={activeAccordion} />
            </>
            : <Typography variant="h6" color="text.secondary">No Active Runs</Typography>
            }
        </>
    );
} ;