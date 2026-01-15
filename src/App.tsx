import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { dashboardMenu, projectMenu, settingsMenu } from './config/Menus';
import ProjectSuite from './pages/projects/suite';
import ProjectSuiteView from './pages/projects/suite/ProjectSuiteView';
import ProjectDashboard from './pages/projects/project';
import MilestonesDashboard from './pages/projects/milestones';
import RunsDashboard from './pages/projects/runs';
import CustomizationDashboard from './pages/configuration/customization';
import UserManagementDashboard from './pages/configuration/users';
import ConfigurationDashboard from './pages/configuration';
import ProjectMilestoneView from './pages/projects/milestones/components/ProjectMilestoneView';
import ProjectRunView from './pages/projects/runs/components/ProjectRunView';

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} menuItems={dashboardMenu} />} />

                <Route path="/project/:projectId" element={<ProtectedRoute children={<ProjectDashboard />} menuItems={projectMenu} />} />
                <Route path="/project/:projectId/suites" element={<ProtectedRoute children={<ProjectSuite />} menuItems={projectMenu} />} />
                <Route path="/project/:projectId/suite/:suiteId" element={<ProtectedRoute children={<ProjectSuiteView />} menuItems={projectMenu} />} />
                <Route path="/project/:projectId/milestones" element={<ProtectedRoute children={<MilestonesDashboard />} menuItems={projectMenu} />} />
                <Route path="/project/:projectId/milestone/:milestoneId" element={<ProtectedRoute children={<ProjectMilestoneView />} menuItems={projectMenu} />} />



                <Route path="/project/:projectId/runs" element={<ProtectedRoute children={<RunsDashboard />} menuItems={projectMenu} />} />
                <Route path="/project/:projectId/runs/:runId" element={<ProtectedRoute children={<ProjectRunView />} menuItems={projectMenu} />} />

                <Route path="/configuration" element={<ProtectedRoute children={<ConfigurationDashboard />} menuItems={settingsMenu} />} />
                <Route path="/configuration/user-management" element={<ProtectedRoute children={<UserManagementDashboard />} menuItems={settingsMenu} />} />
                <Route path="/configuration/customization" element={<ProtectedRoute children={<CustomizationDashboard />} menuItems={settingsMenu} />} />
            </Routes>
        </>
    );
};

export default App;
