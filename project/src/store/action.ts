import { ActionType } from '../types/action';
import { AppRoute, AuthorizationStatus } from '../const';
import { AuthInfo } from '../types/auth-info';
import { City } from '../types/cities';
import { Offer } from '../types/offers';
import { Review } from '../types/review';
import { SortTypeOptions } from '../const';

export const changeCity = (city: City) => ({
  type: ActionType.СhangeСity,
  payload: city,
} as const);

export const setOffer = (offer: Offer) => ({
  type: ActionType.SetOffer,
  payload: offer,
} as const);

export const fillOffersList = (offers: Offer[]) => ({
  type: ActionType.FillOffersList,
  payload: offers,
} as const);

export const changeActiveOffer = (activeOffer: Offer | undefined) => ({
  type: ActionType.ChangeActiveOffer,
  payload: activeOffer,
} as const);

export const toggleFavorite = (favoriteId: number) => ({
  type: ActionType.ToggleFavorite,
  payload: favoriteId,
} as const);

export const changeSortType = (sortOption: SortTypeOptions) => ({
  type: ActionType.ChangeSortType,
  payload: sortOption,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
}as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const setAuthInfo = (authInfo: AuthInfo | null) => ({
  type: ActionType.SetAuthInfo,
  payload: authInfo,
} as const);

export const setComments = (comments: Review[]) => ({
  type: ActionType.SetComments,
  payload: comments,
} as const);

export const setOffersNearby = (offersNearby: Offer[]) => ({
  type: ActionType.SetOffersNearby,
  payload: offersNearby,
} as const);
