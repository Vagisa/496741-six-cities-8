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
import { getRandomMode, makeFakeOffer } from '../../utils/mocks';
import PlaceCard from './place-card';

const mouseOver = jest.fn();
const onFakeFavoritesClick = jest.fn();

const api = createAPI(onFakeFavoritesClick());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  const fakeOffer = makeFakeOffer();
  const randomMode = getRandomMode();
  const store = mockStore({
    PROPERTY: {offer: fakeOffer},
    USER: {authorizationStatus: AuthorizationStatus.Auth},
  });
  it('should render correctly PlaceCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard offer={fakeOffer} onMouseOver={mouseOver} mode={randomMode} />
        </Router>
      </Provider>);
    expect(screen.getByTestId(`${randomMode}-test`)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });
});
