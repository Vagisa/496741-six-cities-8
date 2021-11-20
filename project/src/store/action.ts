import { ActionType } from '../types/action';
import { AuthorizationStatus } from '../const';
import { City } from '../types/cities';
import { Offer } from '../types/offers';
import { SortTypeOptions } from '../const';

export const changeCity = (city: City) => ({
  type: ActionType.СhangeСity,
  payload: city,
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
