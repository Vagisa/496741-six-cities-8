import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { offers } from '../mocks/offers';
import { cities } from '../const';

const initialState = {
  city: cities[0],
  offers: offers,
  activeOffer: undefined,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СhangeСity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offers: action.payload};
    case ActionType.ChangeActiveOffer:
      return {...state, activeOffer: action.payload};
    default:
      return state;
  }
};

export {reducer};
