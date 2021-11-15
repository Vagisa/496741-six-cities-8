import { ActionType, ChangeCityAction, FillOffersListAction } from '../types/action';
import { City } from '../types/cities';

export const changeCity = (city: City): ChangeCityAction => ({
  type: ActionType.СhangeСity,
  payload: city,
});

export const fillOffersList = (): FillOffersListAction => ({
  type: ActionType.FillOffersList,
});
