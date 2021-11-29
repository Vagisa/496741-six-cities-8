import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';
import CommentForm from './comment-form';

const onSubmitComment = jest.fn();

const api = createAPI(onSubmitComment());
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const history = createMemoryHistory();
const store = mockStore({});

describe('Comonent: CommentForm', () => {
  const fakeOffer = makeFakeOffer();
  it('should render "CommentForm"', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CommentForm offerId={fakeOffer.id.toString()} />
        </Router>
      </Provider>);

    expect(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i))
      .toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i), 'Тестовое сообщение');
    expect(screen.getByDisplayValue(/Тестовое сообщение/i)).toBeInTheDocument();
  });
});
