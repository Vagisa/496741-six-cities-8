import browserHistory from '../../brouser-history';
import { Middleware } from 'redux';

import { ActionType } from '../../types/action';
import { Reducer } from './types';

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
