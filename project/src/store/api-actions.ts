import {
  APIRoute,
  AuthorizationStatus,
  AppRoute
} from '../const';
import { AuthData } from '../types/auth-data';
import { CommentData } from '../types/comment-data';
import {
  fillOffersList,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setAuthInfo,
  setComments,
  setOffer,
  setOffersNearby,
  setFavorite,
  updateOffer
} from './action';
import { Offer } from '../types/offers';
import {
  saveToken,
  dropToken
} from '../services/token';
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

export const fetchOffersNearbyAction = (offerId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offer + offerId + APIRoute.OffersNearby);
    dispatch(setOffersNearby(data));
  };

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(fillOffersList(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.get<AuthInfo>(APIRoute.Login);
    dispatch(setAuthInfo(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const postCommentAction = (offerId: string, {comment, rating}: CommentData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<Review[]>(APIRoute.Comments + offerId, {comment, rating});
    dispatch(setComments(data));
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

export const fetchFavoriteAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorite);
    dispatch(setFavorite(data));
  };

export const postFavoriteAction = (offer: Offer, authorizationStatus: AuthorizationStatus): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
      return;
    }
    const newStatus = Number(!offer.isFavorite);
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offer.id}/${newStatus}`);
    dispatch(updateOffer(data));
  };
