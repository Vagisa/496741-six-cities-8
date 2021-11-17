import { ActionType } from '../types/action';
import { City } from '../types/cities';
import { Offer } from '../types/offers';

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
