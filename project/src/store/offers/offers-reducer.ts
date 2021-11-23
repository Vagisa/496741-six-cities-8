import { ActionType, Actions } from '../../types/action';
import { Offers } from '../../types/state';
import { SortTypeOptions, cities } from '../../const';

const initialState: Offers = {
  city: cities[0],
  offers: [],
  activeOffer: undefined,
  sortOption: SortTypeOptions.Popular,
};

const offersReducer = (state = initialState, action: Actions): Offers => {
  switch (action.type) {
    case ActionType.СhangeСity:
      return {...state, city: action.payload};
    case ActionType.FillOffersList:
      return {...state, offers: action.payload};
    case ActionType.ChangeActiveOffer:
      return {...state, activeOffer: action.payload};
    case ActionType.ChangeSortType:
      return {...state, sortOption: action.payload};
    default:
      return state;
  }
};

export {offersReducer};
