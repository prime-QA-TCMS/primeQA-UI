import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import { AxiosProvider } from './context/AxiosContext';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { dashboardMenu, projectMenu, settingsMenu } from './components/menus/Menus';
import ProjectSuite from './pages/projects/suite';
import ProjectSuiteView from './pages/projects/suite/ProjectSuiteView';
import ProjectDashboard from './pages/projects/project';
import MilestonesDashboard from './pages/projects/milestones';
import RunsDashboard from './pages/projects/runs';
import CustomizationDashboard from './pages/configuration/customization';
import UserManagementDashboard from './pages/configuration/users';
import ConfigurationDashboard from './pages/configuration';

const App: React.FC = () => {
    return (
        <AxiosProvider>
            <ThemeContextProvider>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} menuItems={dashboardMenu} />} />
                        
                        <Route path="/project/:id" element={<ProtectedRoute children={<ProjectDashboard />} menuItems={projectMenu} />} />
                        <Route path="/project/:id/suites" element={<ProtectedRoute children={<ProjectSuite />} menuItems={projectMenu} />} />
                        <Route path="/project/:id/suite/:suiteId" element={<ProtectedRoute children={<ProjectSuiteView />} menuItems={projectMenu} />} />
                        <Route path="/project/:id/milestones" element={<ProtectedRoute children={<MilestonesDashboard />} menuItems={projectMenu} />} />
                        <Route path="/project/:id/runs" element={<ProtectedRoute children={<RunsDashboard />} menuItems={projectMenu} />} />
                        
                        <Route path="/configuration" element={<ProtectedRoute children={<ConfigurationDashboard />} menuItems={settingsMenu} />} />
                        <Route path="/configuration/user-management" element={<ProtectedRoute children={<UserManagementDashboard />} menuItems={settingsMenu} />} />
                        <Route path="/configuration/customization" element={<ProtectedRoute children={<CustomizationDashboard />} menuItems={settingsMenu} />} />
                    </Routes>
                </Router>
            </ThemeContextProvider>
        </AxiosProvider>
    );
};

export default App;
