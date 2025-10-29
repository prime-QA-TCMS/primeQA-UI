import React from 'react';
import { Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProjectListViewProps } from "./types";
import { Project } from '../../../types/database/Projects';
import { useJsonData } from '../../../utils/useJsonData';
import AccordionList, { AccordionItem } from '../../../components/lists/AccordionList';
import { RocketLaunchOutlined } from '@mui/icons-material';
import GenericList, { ListItemData } from '../../../components/lists/List';

const ProjectListItem: React.FC<ProjectListViewProps> = ({ projectObject }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        try {
            localStorage.setItem('pageTitle', projectObject.name);
            localStorage.setItem('projectId', projectObject._id ? projectObject._id.toString() : "");

            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'pageTitle', newValue: projectObject.name }));
            globalThis.dispatchEvent(new StorageEvent('storage', { key: 'projectId', newValue: projectObject._id ? projectObject._id.toString() : "" }));

            navigate('/project/' + projectObject._id);
        } catch (error) {
            console.error('Error during navigation:', error);
        }
    };

    return (
        <Box>
            <p><b>Description: </b>{projectObject.description ? projectObject.description : "No Project Description"}</p>
            <p><b>Status: </b>{projectObject.status ? projectObject.status : "No Project status"}</p>
            <p><b>type: </b>{projectObject.type ? projectObject.type : "No Project type"}</p>
            <button onClick={handleNavigation}>View Project</button>
        </ Box>
    )
} ;

export const ProjectListView: React.FC = () => {
    const { data: projects, loading, error } = useJsonData<Project[]>("/mock-data/projects.json");

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!projects || projects.length === 0) return <p>No users found.</p>;

    // Separate projects by state
    const activeProjects = projects.filter((p) => p.status === "Active");
    const activeAccordion: AccordionItem[] = activeProjects.map((project) => ({
        id: project._id,
        title: project.name,
        percentage: null,
        component: <ProjectListItem projectObject={project}/>,
    }));

    const archivedProjects = projects.filter((p) => p.status === "Archived");
    const archivedAccordion: ListItemData[] = archivedProjects.map((project) => ({
        id: project._id,
        title: project.name,
        icon: <RocketLaunchOutlined />,
        link: "/project/" + project._id
    }));

    return (
        <Paper>
            Active Projects:
            <AccordionList items={activeAccordion} />
            Archived Projects:
            <GenericList items={archivedAccordion} />
        </Paper>
    );
} ;