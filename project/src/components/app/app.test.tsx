import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo, makeFakeFavoriteOffers, makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../../utils/mocks';
import App from './app';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { random } from 'faker';
import userEvent from '@testing-library/user-event';

const onFakeUnauthorized = jest.fn();

const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeOffer = random.arrayElement(fakeOffers);
const fakeOffersNearby = makeFakeOffersNearby();
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
  PROPERTY: {
    offer: fakeOffer,
    offersNearby: fakeOffersNearby,
    comments: [],
  },
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
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${fakeCity.name}`, 'i'))).toBeInTheDocument();
  });
  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@test');
    userEvent.type(screen.getByPlaceholderText(/Password/i), '123456');

    expect(screen.getByDisplayValue(/test@test/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
  it('should render "Favorites" when user navigate to "/favorite"', () => {
    history.push(AppRoute.Favorites);
    render(fakeApp);

    expect(screen.queryByText(/Saved listing/i)).toBeInTheDocument();
  });
  it('should render "Favorites-Empty" when user navigate to "/favorite"', () => {
    history.push(AppRoute.Favorites);
    const fakeStore = mockStore({
      OFFERS: {offers: fakeOffers, city: fakeCity},
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        isDataLoaded: true,
        authInfo: fakeAuthInfo,
        favorites: [],
      },
    });
    render(
      <Provider store={fakeStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.queryByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
  it('should render "Property" when user navigate to "/hotels/:id"', () => {
    history.push(AppRoute.Room.replace(':id', fakeOffer.id.toString()));
    render(fakeApp);

    expect(screen.queryByText(new RegExp(`${fakeOffer.description}`, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
