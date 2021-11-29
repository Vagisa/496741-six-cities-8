import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

const history = createMemoryHistory();

describe('Component: LoadingScreen', () => {
  it('should reder correctly', () => {
    render(
      <Router history={history}>
        <LoadingScreen />
      </Router>);

    expect(screen.queryByTestId('Спиннер')).toBeInTheDocument();
  });
});
