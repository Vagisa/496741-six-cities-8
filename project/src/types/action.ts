import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import {
  changeCity,
  fillOffersList,
  changeActiveOffer,
  toggleFavorite,
  changeSortType,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  setAuthInfo
} from '../store/action';

export enum ActionType {
  СhangeСity = 'changeCity',
  FillOffersList = 'fillOffersList',
  ChangeActiveOffer = 'changeActiveOffer',
  ToggleFavorite = 'toggleFavorite',
  ChangeSortType = 'changeSortType',
  RequireAuthorization = 'requireAuthorization',
  RequireLogout = 'requireLogout',
  RedirectToRoute = 'redirectToRoute',
  SetAuthInfo = 'setAuthInfo',
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffersList>
  | ReturnType<typeof changeActiveOffer>
  | ReturnType<typeof toggleFavorite>
  | ReturnType<typeof changeSortType>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setAuthInfo>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
