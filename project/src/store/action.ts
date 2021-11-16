import {
  ActionType,
  ChangeCityAction,
  FillOffersListAction,
  ChangeActiveOfferAction } from '../types/action';
import { City } from '../types/cities';
import { Offer } from '../types/offers';

export const changeCity = (city: City): ChangeCityAction => ({
  type: ActionType.СhangeСity,
  payload: city,
});

export const fillOffersList = (offers: Offer[]): FillOffersListAction => ({
  type: ActionType.FillOffersList,
  payload: offers,
});

export const changeActiveOffer = (activeOffer: Offer): ChangeActiveOfferAction => ({
  type: ActionType.ChangeActiveOffer,
  payload: activeOffer,
});
