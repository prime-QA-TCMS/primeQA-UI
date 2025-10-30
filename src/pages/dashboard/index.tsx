import React, { useState } from 'react';
import { Button, Container, useTheme } from '@mui/material';
import { testing } from '../../Forms/ProjectManagement';
import GenericForm from '../../components/forms/Form';
import Popup from '../../components/popup/popup';
import { ProjectListView } from '../projects/project/components/ProjectListView';
import { contentContainer } from '../../style/muiComponentStyles/containerStyles';

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);
    localStorage.setItem('pageTitle', 'Dashboard');
    const [isCreateProjectPopupOpen, setIsCreateProjectPopupOpen] = useState(false);
    const handleCreateProjectOpen = () => setIsCreateProjectPopupOpen(true);
    const handleCreateProjectClose = () => setIsCreateProjectPopupOpen(false);
    
    const handleCreateProject = async (formData: { [key: string]: any }) => {
        try {
            console.log("you created project:", formData);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <Container sx={styles.root}>
            <Button onClick={handleCreateProjectOpen}>Create Project</Button>
            <Popup title="Create New Project" open={isCreateProjectPopupOpen} onClose={handleCreateProjectClose} component={
                <GenericForm fields={testing} onSubmit={handleCreateProject} submitButtonText={'Create'}/>
            } />
            
            <ProjectListView />
        </Container>
    );
};

export default Dashboard;
