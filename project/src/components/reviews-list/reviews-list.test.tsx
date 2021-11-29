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
import { makeFakeComments, makeFakeOffer } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const onSubmitComment = jest.fn();

const fakeComments = makeFakeComments();
const fakeOffer = makeFakeOffer();

const api = createAPI(onSubmitComment());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  PROPERTY: { offer: fakeOffer, comments: fakeComments },
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: ReviewsList', () => {
  it('should render "ReviewsList"', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList offerId={fakeOffer.id.toString()} />
        </Router>
      </Provider>);

    expect(screen.getByTestId('ReviewsList')).toBeInTheDocument();
  });
});
