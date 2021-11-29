import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';
import FavoritePlaceCard from './favorite-place-card';

const onFavoritesClick = jest.fn();
const fakeOffer = makeFakeOffer();

const api = createAPI(onFavoritesClick());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: FavoritePlaceCard', () => {
  it('should render "FavoritePlaceCard"', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritePlaceCard offer={fakeOffer} />
        </Router>
      </Provider>);

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });
});
