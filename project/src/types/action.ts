import {
  changeCity,
  fillOffersList,
  changeActiveOffer,
  toggleFavorite,
  changeSortType
} from '../store/action';

export enum ActionType {
  СhangeСity = 'changeCity',
  FillOffersList = 'fillOffersList',
  ChangeActiveOffer = 'changeActiveOffer',
  ToggleFavorite = 'toggleFavorite',
  ChangeSortType = 'changeSortType',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof changeActiveOffer>
  | ReturnType<typeof toggleFavorite>
  | ReturnType<typeof changeSortType>;
