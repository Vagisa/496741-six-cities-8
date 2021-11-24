import { createAction } from '@reduxjs/toolkit';

import { ActionType } from '../types/action';
import { AppRoute, AuthorizationStatus } from '../const';
import { AuthInfo } from '../types/auth-info';
import { City } from '../types/cities';
import { Offer } from '../types/offers';
import { Review } from '../types/review';
import { SortTypeOptions } from '../const';

export const changeCity = createAction(
  ActionType.СhangeСity,
  (city: City) => ({
    payload: city,
  }),
);

export const setOffer = createAction(
  ActionType.SetOffer,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const fillOffersList = createAction(
  ActionType.FillOffersList,
  (offers: Offer[]) => ({
    payload: offers,
  }),
);

export const changeActiveOffer = createAction(
  ActionType.ChangeActiveOffer,
  (activeOffer: Offer | undefined) => ({
    payload: activeOffer,
  }),
);

export const toggleFavorite = createAction(
  ActionType.ToggleFavorite,
  (favoriteId: number) => ({
    payload: favoriteId,
  }),
);

export const changeSortType = createAction(
  ActionType.ChangeSortType,
  (sortOption: SortTypeOptions) => ({
    payload: sortOption,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const setAuthInfo = createAction(
  ActionType.SetAuthInfo,
  (authInfo: AuthInfo | null) => ({
    payload: authInfo,
  }),
);

export const setComments = createAction(
  ActionType.SetComments,
  (comments: Review[]) => ({
    payload: comments,
  }),
);

export const setOffersNearby = createAction(
  ActionType.SetOffersNearby,
  (offersNearby: Offer[]) => ({
    payload: offersNearby,
  }),
);
