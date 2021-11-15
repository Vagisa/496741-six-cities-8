import { City } from './cities';

export enum ActionType {
  СhangeСity = 'changeCity',
  FillOffersList = 'fillOffersList',
}

export type ChangeCityAction = {
  type: ActionType.СhangeСity;
  payload: City;
}

export type FillOffersListAction = {
  type: ActionType.FillOffersList;
}

export type Actions = ChangeCityAction | FillOffersListAction;
