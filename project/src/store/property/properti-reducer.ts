import { ActionType, Actions } from '../../types/action';
import { Property } from '../../types/state';

const initialState: Property = {
  offer: undefined,
  comments: [],
  comment: null,
  offersNearby: [],
};

const propertyReducer = (state = initialState, action: Actions): Property => {
  switch (action.type) {
    case ActionType.SetOffer:
      return {...state, offer: action.payload};
    case ActionType.SetComments:
      return {...state, comments: action.payload};
    case ActionType.PostComment:
      return {...state, comment: action.payload};
    case ActionType.SetOffersNearby:
      return {...state, offersNearby: action.payload};
    default:
      return state;
  }
};

export {propertyReducer};
