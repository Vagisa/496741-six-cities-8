import browserHistory from '../../brouser-history';
import { Middleware } from 'redux';

import { ActionType } from '../../types/action';
import { State } from '../../types/state';

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
