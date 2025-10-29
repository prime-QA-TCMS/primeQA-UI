import React from 'react';
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ListItemProps } from "./types";
import { Milestone } from '../../../types/database/Projects';
import { useJsonData } from '../../../utils/useJsonData';
import AccordionList, { AccordionItem } from '../../../components/lists/AccordionList';
import { RocketLaunchOutlined } from '@mui/icons-material';
import GenericList, { ListItemData } from '../../../components/lists/List';
import GenericPieChart, { chartData } from '../../../components/charts/GenericPieChart';

const RecordListItem: React.FC<ListItemProps> = ({ recordObject, projectID }) => {
    const navigate = useNavigate();

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

            // ✅ Manually trigger a storage event for same-tab updates
            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'pageTitle', newValue: recordObject.name }));

            navigate("/project/" + projectID + "/milestone/" + recordObject._id);
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    return (
        <Box>
            <GenericPieChart data={testData} title={"Overview"}/>
            <p><b>Description: </b>{recordObject.description ? recordObject.description : "No Project Description"}</p>
            <p><b>Status: </b>{recordObject.status ? recordObject.status : "No Project status"}</p>
            <button onClick={handleNavigation}>View Project</button>
        </ Box>
    )
} ;

export const MilestoneListView: React.FC = () => {
    const projectID = localStorage.getItem("projectId");
    const { data, loading, error } = useJsonData<Milestone[]>("/mock-data/milestones.json");

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!data || data.length === 0) return <p>No users found.</p>;

    const projectMilestones = data.filter((p) => p.projectId === projectID);

    // Separate projects by state
    const activeProjects = projectMilestones.filter((p) => p.status === "Active");
    const activeAccordion: AccordionItem[] = activeProjects.map((record) => ({
        id: record._id,
        title: record.name,
        percentage: null,
        component: <RecordListItem recordObject={record} projectID={projectID}/>,
    }));

    const completedProjects = projectMilestones.filter((p) => p.status === "Completed");
    const completedAccordion: ListItemData[] = completedProjects.map((record) => ({
        id: record._id,
        title: record.name,
        icon: <RocketLaunchOutlined />,
        link: "/project/" + projectID + "/milestone/" + record._id
    }));

    return (
        <Paper>
            Active Milestones:
            <AccordionList items={activeAccordion} />
            Completed Milestones:
            <GenericList items={completedAccordion} />
        </Paper>
    );
} ;