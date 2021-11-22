import {
  APIRoute,
  AuthorizationStatus,
  AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import {
  fillOffersList,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setAuthInfo,
  setComments,
  setOffer} from './action';
import { Offer } from '../types/offers';
import {
  saveToken,
  dropToken} from '../services/token';
import { ThunkActionResult } from '../types/action';
import { AuthInfo } from '../types/auth-info';
import { Review } from '../types/review';

export const fetchCurrentOfferAction = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer>(APIRoute.Offer + offerId);
    dispatch(setOffer(data));
  };

export const fetchCommentsAction = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Review[]>(APIRoute.Comments + offerId);
    dispatch(setComments(data));
  };

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(fillOffersList(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setAuthInfo(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(setAuthInfo(null));
    dispatch(redirectToRoute(AppRoute.Main));
  };
