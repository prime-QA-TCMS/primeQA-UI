import { Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import { CssBaseline } from '@mui/material';
import { ProtectedRoute } from 'fog-ui';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ProjectsPage from './pages/projects';
import Reports from './pages/reports';
import { dashboardMenu, projectMenu, settingsMenu } from './config/Menus';
import ProjectSuite from './pages/projects/suite';
import ProjectSuiteView from './pages/projects/suite/ProjectSuiteView';
import ProjectDashboard from './pages/projects/project';
import ProjectSettings from './pages/projects/settings';
import MilestonesDashboard from './pages/projects/milestones';
import RunsDashboard from './pages/projects/runs';
import CustomizationDashboard from './pages/configuration/customization';
import UserManagementDashboard from './pages/configuration/users';
import ConfigurationDashboard from './pages/configuration';
import ProjectMilestoneView from './pages/projects/milestones/components/ProjectMilestoneView';
import ProjectRunView from './pages/projects/runs/components/ProjectRunView';
import TestCasesManagement from './pages/projects/testcases';
import {
  Dashboard as DashboardIcon,
  FolderOpen as ProjectsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const App: React.FC = () => {
  const navigate = useNavigate();

  // Top navigation menu
  const topbarMenu = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Projects', path: '/projects', icon: <ProjectsIcon /> },
    { label: 'Reports', path: '/reports', icon: <ReportsIcon /> },
    { label: 'Configuration', path: '/configuration', icon: <SettingsIcon /> },
  ];

  // User menu configuration
  const topbarUserMenu = {
    profilePath: '/profile',
    accountPath: '/account',
    onLogout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tenantId');
      navigate('/login');
    },
  };

  // Breadcrumbs configuration with custom parameter names
  const breadcrumbsConfig = {
    parameterNames: ['projectId', 'suiteId', 'sectionId', 'milestoneId', 'runId'],
  };

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<Dashboard />}
              menuItems={dashboardMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectsPage />}
              menuItems={dashboardMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<Reports />}
              menuItems={dashboardMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />

        <Route
          path="/project/:projectId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectDashboard />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/settings"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectSettings />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/suites"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectSuite />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/suite/:suiteId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectSuiteView />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/section/:sectionId/testcases"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<TestCasesManagement />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/milestones"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<MilestonesDashboard />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/milestone/:milestoneId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectMilestoneView />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />

        <Route
          path="/project/:projectId/runs"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<RunsDashboard />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/project/:projectId/runs/:runId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ProjectRunView />}
              menuItems={projectMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />

        <Route
          path="/configuration"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<ConfigurationDashboard />}
              menuItems={settingsMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/configuration/user-management"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<UserManagementDashboard />}
              menuItems={settingsMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
        <Route
          path="/configuration/customization"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              children={<CustomizationDashboard />}
              menuItems={settingsMenu}
              topbarMenu={topbarMenu}
              topbarUserMenu={topbarUserMenu}
              breadcrumbsConfig={breadcrumbsConfig}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
