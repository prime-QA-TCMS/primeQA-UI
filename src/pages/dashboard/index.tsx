import React, { useState } from 'react';
import { Button, Container, useTheme } from '@mui/material';
import { createProject } from '../../Forms/ProjectManagement';
import { Form as GenericForm, Popup } from "fog-ui";
import { ProjectListView } from '../projects/project/components/ProjectListView';
import { contentContainer } from '../../style/muiComponentStyles/containerStyles';
import { ProjectAPI } from '../../api/project.api';

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);
    localStorage.setItem('pageTitle', 'Dashboard');
    const [isCreateProjectPopupOpen, setIsCreateProjectPopupOpen] = useState(false);
    const handleCreateProjectOpen = () => setIsCreateProjectPopupOpen(true);
    const handleCreateProjectClose = () => setIsCreateProjectPopupOpen(false);

    const handleCreateProject = async (formData: { [key: string]: any }) => {
        try {
            const newProject = {
                name: formData.name,
                key: formData.key,
                description: formData.description || "",
                visibility: formData.visibility || "private",
                owner: localStorage.getItem("userId") || "", // assuming user is logged in
                isActive: true
            };

            const response = await ProjectAPI.projectCreate(newProject);

            if (response) {
                console.log("✅ Project created successfully:", response);
            } else {
                console.warn("⚠️ Project creation returned null or empty response.");
            }
        } catch (error) {
            console.error("❌ Error creating project:", error);
        }
    };

    return (
        <Container sx={styles.root}>
            <Button onClick={handleCreateProjectOpen}>Create Project</Button>
            <Popup title="Create New Project" open={isCreateProjectPopupOpen} onClose={handleCreateProjectClose} component={
                <GenericForm fields={createProject} onSubmit={handleCreateProject} submitButtonText={'Create'} />
            } />

            <ProjectListView />
        </Container>
    );
};

export default Dashboard;
