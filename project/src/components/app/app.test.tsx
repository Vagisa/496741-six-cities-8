import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo, makeFakeFavoriteOffers, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import App from './app';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { random } from 'faker';

const onFakeUnauthorized = jest.fn();

const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeCity = random.arrayElement(fakeOffers).city;
const fakeAuthInfo = makeFakeAuthInfo();
const fakeFavorites = makeFakeFavoriteOffers();

const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  OFFERS: {offers: fakeOffers, city: fakeCity},
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    isDataLoaded: true,
    authInfo: fakeAuthInfo,
    favorites: fakeFavorites,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.queryByTestId('Main')).toBeInTheDocument();
  });
  it('should render "Main-Empty" when user navigate to "/"', () => {
    const fakeStore = mockStore({
      OFFERS: {offers: [], city: fakeCity},
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        isDataLoaded: true,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
      },
    });
    history.push(AppRoute.Main);
    render(
      <Provider store={fakeStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.queryByText(/No places to stay available/i)).toBeInTheDocument();
  });
  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByText(new RegExp(`${fakeAuthInfo.email}`, 'i')))
      .toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
