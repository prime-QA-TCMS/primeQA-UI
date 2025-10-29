import { MenuItem } from "../template/types";

// TO DO: each menu should be an array function that checks permissions then builds the array

export const dashboardMenu: Record<string, MenuItem[]> = {
  "Project": [
    { label: "Dashboard", path: "/dashboard" },
  ],
  "Settings": [
    { label: "Priorities", path: "/dashboard" },
    { label: "Statuses", path: "/dashboard" },
    { label: "Case Types", path: "/dashboard" },
    { label: "Branding", path: "/dashboard" },
  ],
};

export const projectMenu: Record<string, MenuItem[]> = {
  "Project": [
    { label: "Project Dashboard", path: "/project/:id" },
    { label: "To Do", path: "/dashboard" },
    { label: "Test Runs", path: "/dashboard" },
    { label: "Test Suites", path: "/project/:id/suites" },
    { label: "Milestones", path: "/dashboard" },
  ],
  "Other": [
    { label: "System Dashboard", path: "/dashboard" },
    { label: "Edit Project", path: "/dashboard" },
    { label: "reports", path: "/dashboard" }
  ],
};

export const userMenu: MenuItem[] = [
    { label: "My Projects", path: "/dashboard" },
    { label: "My Activity", path: "/dashboard" },
    { label: "Customization", path: "/dashboard" }
];

export const settingsMenu: Record<string, MenuItem[]> = {
  "User Management": [
    { label: "Permissions", path: "/dashboard" },
    { label: "Teams & Roles", path: "/dashboard" },
    { label: "Users", path: "/dashboard" },
    { label: "Session Overview", path: "/dashboard" },
  ],
  "Administration": [
    { label: "Metadata", path: "/dashboard" },
    { label: "Environments", path: "/dashboard" },
    { label: "Audit Logs", path: "/dashboard" },
    { label: "Integration", path: "/dashboard" },
    { label: "Data Management", path: "/dashboard" },
    { label: "Site Settings", path: "/dashboard" }
  ],
  "Customization": [
    { label: "Global Fields", path: "/dashboard" },
    { label: "Branding", path: "/dashboard" },
    { label: "Case Types", path: "/dashboard" },
    { label: "Branding", path: "/dashboard" },
  ],
  "Test Cases": [
    { label: "Priorities", path: "/dashboard" },
    { label: "Statuses", path: "/dashboard" },
    { label: "Case Types", path: "/dashboard" },
    { label: "Branding", path: "/dashboard" },
  ],
  "Project": [
    { label: "Projects", path: "/dashboard" },
  ],
};