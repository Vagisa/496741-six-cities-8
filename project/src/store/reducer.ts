import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { cities, SortTypeOptions, AuthorizationStatus } from '../const';

const initialState: State = {
  city: cities[0],
  offers: [],
  activeOffer: undefined,
  favorites: [],
  sortOption: SortTypeOptions.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  authInfo: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СhangeСity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offers: action.payload};
    case ActionType.ChangeActiveOffer:
      return {...state, activeOffer: action.payload};
    case ActionType.ToggleFavorite:
      if(state.favorites.includes(action.payload)) {
        return {...state, favorites: state.favorites.filter((id) => id !== action.payload)};
      } else {
        return {...state, favorites: [...state.favorites, action.payload]};
      }
    case ActionType.ChangeSortType:
      return {...state, sortOption: action.payload};
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

export {reducer};
