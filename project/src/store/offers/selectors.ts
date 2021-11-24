import { SortTypeOptions } from '../../const';
import { City } from '../../types/cities';
import { Offer } from '../../types/offers';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCity = (state: State): City => state[NameSpace.offers].city;
export const getOffers = (state: State): Offer[] => state[NameSpace.offers].offers;
export const getActiveOffer = (state: State): Offer | undefined => state[NameSpace.offers].activeOffer;
export const getSortOption = (state: State): SortTypeOptions => state[NameSpace.offers].sortOption;
