import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import {
  makeFakeAuthInfo,
  makeFakeFavoriteOffers
} from '../../utils/mocks';
import Favorites from './favorites';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';

const onFakeUnauthorized = jest.fn();

const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: Favorites', () => {
  it('should render correctly Favorites', () => {
    const fakeFavorites = makeFakeFavoriteOffers();
    const fakeAuthInfo = makeFakeAuthInfo();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>);
    expect(screen.getByText(new RegExp(`${fakeAuthInfo.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
  it('should render correctly Favorites-Empty', () => {
    const fakeFavorites: Offer[] = [];
    const fakeAuthInfo = makeFakeAuthInfo();
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>);
    expect(screen.queryByText(new RegExp(`${fakeAuthInfo.email}`, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
