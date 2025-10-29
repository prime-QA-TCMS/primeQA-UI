import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { ThemeContextProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import { AxiosProvider } from './context/AxiosContext';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { dashboardMenu, projectMenu } from './components/menus/Menus';
import ProjectDashboard from './pages/projects';
import ProjectSuite from './pages/suite';
import ProjectSuiteView from './pages/suite/ProjectSuiteView';

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
                    </Routes>
                </Router>
            </ThemeContextProvider>
        </AxiosProvider>
    );
};

export default App;
