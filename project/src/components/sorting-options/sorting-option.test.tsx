import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { getRandomSortOptions } from '../../utils/mocks';
import SortingOptions from './sorting-options';

const mockStore = configureMockStore();

describe('Comonent: SortingOptions', () => {
  it('should render "SortingOptions"', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({OFFERS: {sortingOptions: getRandomSortOptions()} })}>
        <Router history={history}>
          <SortingOptions />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
