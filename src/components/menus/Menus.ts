import { MenuItem } from "../template/types";

// TO DO: each menu should be an array function that checks permissions then builds the array

export const dashboardMenu: Record<string, MenuItem[]> = {
  "Project": [
    { label: "Dashboard", path: "/dashboard" },
  ]
};

export const projectMenu: Record<string, MenuItem[]> = {
  "": [
    { label: "Home", path: "/dashboard" },
  ],
  "Project": [
    { label: "Project Dashboard", path: "/project/:projectId" },
    // { label: "To Do", path: "/project/:projectId/todos" },
    { label: "Test Runs", path: "/project/:projectId/runs" },
    { label: "Test Suites", path: "/project/:projectId/suites" },
    { label: "Milestones", path: "/project/:projectId/milestones" },
  ],
};

export const userMenu: MenuItem[] = [
    { label: "My Projects", path: "/dashboard" },
    { label: "My Activity", path: "/dashboard" },
    { label: "Customization", path: "/dashboard" }
];

export const settingsMenu: Record<string, MenuItem[]> = {
  "": [
    { label: "Home", path: "/dashboard" },
  ],
  "Configuration Pages": [
    { label: "User Management", path: "/configuration/user-management" },
    //{ label: "System Settings", path: "/configuration/administration" },
    { label: "Customizations", path: "/configuration/customization" },
    //{ label: "Testing Configs", path: "/configuration/testing" }
  ],
};