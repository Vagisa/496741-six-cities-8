import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { random } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { getRandomMode, getRandomSortOptions, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import PlacesList from './places-list';

const offerItemHover = jest.fn();

const api = createAPI(offerItemHover());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
  const fakeOffer = random.arrayElement(fakeOffers);
  const randomSortOptions = getRandomSortOptions();
  const randomMode = getRandomMode();
  const store = mockStore({
    PROPERTY: {offer: fakeOffer},
    USER: {authorizationStatus: AuthorizationStatus.Auth},
    OFFERS: {city: fakeOffer.city, offers: fakeOffers, sortOption: randomSortOptions},
  });
  it('should render correctly PlaceCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesList onOfferItemHover={offerItemHover} mode={randomMode} />
        </Router>
      </Provider>);
    expect(screen.getByTestId('PlacesList')).toBeInTheDocument();
    expect(screen.getByTestId(`${randomMode}-test`)).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });
});
