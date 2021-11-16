import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { offers } from '../mocks/offers';
import { cities } from '../const';

const initialState: State = {
  city: cities[0],
  offers: offers,
  activeOffer: undefined,
  favorites: [11, 12, 10, 13],
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
    default:
      return state;
  }
};

export {reducer};
