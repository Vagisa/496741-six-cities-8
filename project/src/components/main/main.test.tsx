import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { random } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Route, Router, Switch } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import {
  makeFakeAuthInfo,
  makeFakeOffer,
  makeFakeOffers
} from '../../utils/mocks';
import Main from './main';
import { State } from '../../types/state';

const onFakeUnauthorized = jest.fn();
const offerItemHover = jest.fn();

const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly Main', () => {
    const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
    const fakeAuthInfo = makeFakeAuthInfo();
    const fakeCity = random.arrayElement(fakeOffers).city;
    const store = mockStore({
      OFFERS: {offers: fakeOffers, city: fakeCity},
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main}>
              <Main onOfferItemHover={offerItemHover}/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('Main')).toBeInTheDocument();
  });
  it('should render correctly Main-Empty', () => {
    const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
    const fakeAuthInfo = makeFakeAuthInfo();
    const fakeCity = random.arrayElement(fakeOffers).city;
    const store = mockStore({
      OFFERS: {offers: [], city: fakeCity},
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main}>
              <Main onOfferItemHover={offerItemHover}/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
