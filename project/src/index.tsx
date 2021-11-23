import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

import { AuthorizationStatus} from './const';
import { createAPI } from './services/api';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { reviews } from './mocks/reviews';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
