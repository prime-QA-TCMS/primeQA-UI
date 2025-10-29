import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  PlaylistAddCheckOutlined,
  BugReportOutlined,
  AssignmentOutlined,
  UpdateOutlined,
  RocketLaunchOutlined,
  FlagOutlined,
} from '@mui/icons-material';
import GenericList, { ListItemData } from '../components/lists/List';
import { Project } from '../types/database/Projects';




export const planData = [
    { id: 1, value: 75, title: 'Open' },
    { id: 3, value: 25, title: 'Closed' }
];
export const runData = [
    { id: 1, value: 75, title: 'Open' },
    { id: 3, value: 25, title: 'Closed' }
];



export const dummyMilestones: ListItemData[] = [
  {
    id: 1,
    title: 'Project Kickoff',
    link: '/project/milestone/1',
  },
  {
    id: 2,
    title: 'Requirements & Scoping Completed',
    link: '/project/milestone/2',
  },
  {
    id: 3,
    title: 'Test Environment Ready',
    link: '/project/milestone/3',
  },
  {
    id: 4,
    title: 'Automation Framework Integrated',
    link: '/project/milestone/4',
  },
  {
    id: 5,
    title: 'Regression Suite Execution',
    link: '/project/milestone/5',
  },
  {
    id: 6,
    title: 'UAT Testing & Bug Fixes',
    link: '/project/milestone/6',
  },
  {
    id: 7,
    title: 'Final Delivery & Sign-off',
    link: '/project/milestone/7',
  },
];


export const dummyActivity: ListItemData[] = [
  {
    id: 1,
    title: 'Suite: Login Flow Regression, created by: Alice Carter, on date: 12/03/2025',
    icon: <FlagOutlined color="primary" />,
  },
  {
    id: 2,
    title: 'Suite: Login Flow Regression, updated by: Michael Chen, on date: 13/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 3,
    title: 'Run: Sprint 12 Smoke Test, created by: Sofia Ramirez, on date: 14/03/2025',
    icon: <PlaylistAddCheckOutlined color="success" />,
  },
  {
    id: 4,
    title: 'Run: Sprint 12 Smoke Test, executed by: Daniel Smith, on date: 14/03/2025',
    icon: <AssignmentOutlined color="secondary" />,
  },
  {
    id: 5,
    title: 'Run: Sprint 12 Smoke Test, updated by: Sofia Ramirez, on date: 15/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 6,
    title: 'Plan: Q1 Regression Cycle, created by: Jacob Miller, on date: 16/03/2025',
    icon: <RocketLaunchOutlined color="warning" />,
  },
  {
    id: 7,
    title: 'Plan: Q1 Regression Cycle, updated by: Alice Carter, on date: 17/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 8,
    title: 'Suite: Payment Gateway Tests, created by: Olivia Brown, on date: 18/03/2025',
    icon: <FlagOutlined color="primary" />,
  },
  {
    id: 9,
    title: 'Suite: Payment Gateway Tests, updated by: Michael Chen, on date: 19/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 10,
    title: 'Run: API Stability Check, created by: Lucas Johnson, on date: 20/03/2025',
    icon: <PlaylistAddCheckOutlined color="success" />,
  },
  {
    id: 11,
    title: 'Run: API Stability Check, executed by: Emma Williams, on date: 20/03/2025',
    icon: <AssignmentOutlined color="secondary" />,
  },
  {
    id: 12,
    title: 'Plan: Automation Rollout Phase 2, created by: Jacob Miller, on date: 21/03/2025',
    icon: <RocketLaunchOutlined color="warning" />,
  },
  {
    id: 13,
    title: 'Plan: Automation Rollout Phase 2, updated by: Olivia Brown, on date: 22/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 14,
    title: 'Suite: User Profile Management, created by: Emma Williams, on date: 23/03/2025',
    icon: <FlagOutlined color="primary" />,
  },
  {
    id: 15,
    title: 'Run: Profile Feature Retest, executed by: Daniel Smith, on date: 24/03/2025',
    icon: <AssignmentOutlined color="secondary" />,
  },
  {
    id: 16,
    title: 'Run: Profile Feature Retest, failed test logged by: Michael Chen, on date: 24/03/2025',
    icon: <BugReportOutlined color="error" />,
  },
  {
    id: 17,
    title: 'Plan: Release 1.5 Test Plan, created by: Sofia Ramirez, on date: 25/03/2025',
    icon: <RocketLaunchOutlined color="warning" />,
  },
  {
    id: 18,
    title: 'Suite: Mobile App Regression, updated by: Alice Carter, on date: 26/03/2025',
    icon: <UpdateOutlined color="info" />,
  },
  {
    id: 19,
    title: 'Run: Android Build 212 Smoke, executed by: Jacob Miller, on date: 27/03/2025',
    icon: <AssignmentOutlined color="secondary" />,
  },
  {
    id: 20,
    title: 'Run: iOS Build 198 Regression, executed by: Olivia Brown, on date: 27/03/2025',
    icon: <AssignmentOutlined color="secondary" />,
  },
];

export const projectAccordionData = [
    { id: 2, title: 'Milestones', percentage: null, component: <GenericList items={dummyMilestones} /> },
    { id: 3, title: 'Project Activity', percentage: null, component: <GenericList items={dummyActivity} /> },
];
