import React from 'react';
import { render, screen } from '@testing-library/react';
import { SuiteListView } from '../pages/projects/suite/components/SuiteListView';

jest.mock('../hooks/useTestCases', () => ({
  useSuites: () => ({ data: [], loading: true, error: null }),
}));

describe('SuiteListView', () => {
  it('shows loading state', () => {
    render(<SuiteListView />);
    expect(screen.getByText(/Loading suites/i)).toBeInTheDocument();
  });
});
