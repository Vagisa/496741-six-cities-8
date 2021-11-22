import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import {
  changeCity,
  setOffer,
  fillOffersList,
  changeActiveOffer,
  toggleFavorite,
  changeSortType,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  setAuthInfo,
  setComments,
  setOffersNearby
} from '../store/action';

export enum ActionType {
  СhangeСity = 'changeCity',
  SetOffer = 'setOffer',
  FillOffersList = 'fillOffersList',
  ChangeActiveOffer = 'changeActiveOffer',
  ToggleFavorite = 'toggleFavorite',
  ChangeSortType = 'changeSortType',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  SetAuthInfo = 'setAuthInfo',
  SetComments = 'setComments',
  SetOffersNearby = 'setOffersNearby',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof setOffer>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof changeActiveOffer>
  | ReturnType<typeof toggleFavorite>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setAuthInfo>
  | ReturnType<typeof setComments>
  | ReturnType<typeof setOffersNearby>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
