import { ActionType, Actions } from '../../types/action';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/state';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  favorites: [],
  isDataLoaded: false,
};

const userReducer = (state = initialState, action: Actions): User => {
  switch (action.type) {
    case ActionType.ToggleFavorite:
      if(state.favorites.includes(action.payload)) {
        return {...state, favorites: state.favorites.filter((id) => id !== action.payload)};
      } else {
        return {...state, favorites: [...state.favorites, action.payload]};
      }
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload, isDataLoaded: true};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.SetAuthInfo:
      return {...state, authInfo: action.payload};
    default:
      return state;
  }
};

export {userReducer};
