import type { MenuItem } from 'fog-ui';

export const dashboardMenu: Record<string, MenuItem[]> = {
  '': [{ label: 'Dashboard', path: '/dashboard' }],
  Main: [
    { label: 'Projects', path: '/projects' },
    { label: 'Reports', path: '/reports' },
    { label: 'Configuration', path: '/configuration' },
  ],
};

export const projectMenu: Record<string, MenuItem[]> = {
  '': [{ label: 'Home', path: '/dashboard' }],
  Project: [
    { label: 'Overview', path: '/project/:projectId' },
    { label: 'Test Suites', path: '/project/:projectId/suites' },
    { label: 'Test Runs', path: '/project/:projectId/runs' },
    { label: 'Milestones', path: '/project/:projectId/milestones' },
    { label: 'Settings', path: '/project/:projectId/settings' },
  ],
};

export const userMenu: MenuItem[] = [
  { label: 'My Projects', path: '/dashboard' },
  { label: 'My Activity', path: '/dashboard' },
  { label: 'Customization', path: '/dashboard' },
];

export const settingsMenu: Record<string, MenuItem[]> = {
  '': [{ label: 'Home', path: '/dashboard' }],
  'Configuration Pages': [
    { label: 'User Management', path: '/configuration/user-management' },
    //{ label: "System Settings", path: "/configuration/administration" },
    { label: 'Customizations', path: '/configuration/customization' },
    //{ label: "Testing Configs", path: "/configuration/testing" }
  ],
};
