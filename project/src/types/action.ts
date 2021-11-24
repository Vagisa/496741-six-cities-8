import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';

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
  PostComment = 'postComment',
  SetOffersNearby = 'setOffersNearby',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
