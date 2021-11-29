import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';
import CitiesList from './cities-list';

const setActiveCity = jest.fn();

const api = createAPI(setActiveCity());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  const fakeOffer = makeFakeOffer();
  const store = mockStore({
    OFFERS: {city: fakeOffer.city},
  });
  it('should render correctly PlaceCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>);
    expect(screen.getByTestId('CitiesList')).toBeInTheDocument();
  });
});
