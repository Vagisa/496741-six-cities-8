import { createMemoryHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { makeFakeAuthInfo } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';

const fakeAuthInfo = makeFakeAuthInfo();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly, status: Auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeAuthInfo},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText(/Логотип 6 городов/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeAuthInfo.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
  it('should render correctly, status: NoAuth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, authInfo: fakeAuthInfo},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByAltText(/Логотип 6 городов/i)).toBeInTheDocument();
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
              <Header />
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
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.queryByText(/This is login page/i)).toBeInTheDocument();
  });
});
