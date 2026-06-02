import React from 'react';
import { render, screen } from '@testing-library/react';
import MilestonesDashboard from '../pages/projects/milestones';

jest.mock('../hooks/useProjects', () => ({
  useMilestones: () => ({ data: [], loading: true, error: null }),
}));

describe('MilestonesDashboard', () => {
  it('shows loading state', () => {
    render(<MilestonesDashboard />);
    expect(screen.getByText(/Loading milestones/i)).toBeInTheDocument();
  });
});
