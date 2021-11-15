import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { offers } from '../mocks/offers';
import { cities } from '../mocks/cities';

const initialState = {
  city: cities[3],
  offers: offers,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СhangeСity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offers: state.offers};
    default:
      return state;
  }
};

export {reducer};
