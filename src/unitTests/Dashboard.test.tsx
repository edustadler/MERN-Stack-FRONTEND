import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from '../pages/Dashboard';


describe('Dashboard component', () => {
  it('renders without crashing', () => {
    render(<Dashboard />);
  });

  
});
