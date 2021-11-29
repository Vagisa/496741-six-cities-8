import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeOffer, makeFakeOffers, makeFakeOffersNearby } from '../../utils/mocks';
import Property from './property';
import { State } from '../../types/state';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { random } from 'faker';

const onFakeUnauthorized = jest.fn();

const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeOffer = random.arrayElement(fakeOffers);
const fakeOffersNearby = makeFakeOffersNearby();
const fakeCity = random.arrayElement(fakeOffers).city;

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
  },
});

const history = createMemoryHistory();

describe('Application Routing', () => {
  it('should render "Property" when user navigate to "/hotels/:id"', () => {
    history.push(AppRoute.Room.replace(':id', fakeOffer.id.toString()));
    render(
      <Provider store={store}>
        <Router history={history}>
          <Property />
        </Router>
      </Provider>);

    expect(screen.queryByText(new RegExp(`${fakeOffer.description}`, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
