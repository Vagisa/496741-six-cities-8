import {
  changeCity,
  fillOffersList,
  changeActiveOffer,
  toggleFavorite
} from '../store/action';

export enum ActionType {
  СhangeСity = 'changeCity',
  FillOffersList = 'fillOffersList',
  ChangeActiveOffer = 'changeActiveOffer',
  ToggleFavorite = 'toggleFavorite',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof changeActiveOffer>
  | ReturnType<typeof toggleFavorite>;
