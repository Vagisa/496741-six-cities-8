import { City } from './cities';
import { Offer } from './offers';

export enum ActionType {
  СhangeСity = 'changeCity',
  FillOffersList = 'fillOffersList',
  ChangeActiveOffer = 'changeActiveOffer',
  ToggleFavorite = 'toggleFavorite',
}

export type ChangeCityAction = {
  type: ActionType.СhangeСity;
  payload: City;
}

export type FillOffersListAction = {
  type: ActionType.FillOffersList;
  payload: Offer[];
}

export type ChangeActiveOfferAction = {
  type: ActionType.ChangeActiveOffer;
  payload: Offer | undefined;
}

export type ToggleFavoriteAction = {
  type: ActionType.ToggleFavorite;
  payload: number;
}

export type Actions =
  ChangeCityAction
  | FillOffersListAction
  | ChangeActiveOfferAction
  | ToggleFavoriteAction;
