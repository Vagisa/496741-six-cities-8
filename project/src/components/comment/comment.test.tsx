import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeComment } from '../../utils/mocks';
import Comment from './comment';

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

describe('Comonent: Comment', () => {
  const fakeComment = makeFakeComment();
  it('should render "CommentForm"', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Comment review={fakeComment} />
        </Router>
      </Provider>);

    expect(screen.getByTestId('Comment')).toBeInTheDocument();
  });
});
