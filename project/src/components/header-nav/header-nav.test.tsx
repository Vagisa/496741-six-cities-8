import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo } from '../../utils/mocks';
import HeaderNav from './header-nav';
import userEvent from '@testing-library/user-event';

const fakeAuthInfo = makeFakeAuthInfo();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderNav', () => {
  it('should render correctly for sratus: Auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeAuthInfo},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNav />
        </Router>
      </Provider>);
    expect(screen.getByText(new RegExp(`${fakeAuthInfo.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
  it('should render correctly for sratus: NoAuth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, authInfo: fakeAuthInfo},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderNav />
        </Router>
      </Provider>);
    expect(screen.queryByText(new RegExp(`${fakeAuthInfo.email}`, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
  it('should redirect to root url when user clicked to link /favorites', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeAuthInfo},
    });
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Favorites} exact>
              <h1>This is favorites page</h1>
            </Route>
            <Route>
              <HeaderNav />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is favorites page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(new RegExp(`${fakeAuthInfo.email}`, 'i')));
    expect(screen.queryByText(/This is favorites page/i)).toBeInTheDocument();
  });
  it('should redirect to root url when user clicked to link /login', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, authInfo: fakeAuthInfo},
    });
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SignIn} exact>
              <h1>This is login page</h1>
            </Route>
            <Route>
              <HeaderNav />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.queryByText(/This is login page/i)).toBeInTheDocument();
  });
});
