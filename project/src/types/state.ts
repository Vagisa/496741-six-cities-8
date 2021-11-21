import { AuthorizationStatus, SortTypeOptions } from '../const';
import { AuthInfo } from './auth-info';
import { City } from './cities';
import { Offer } from './offers';

export type State = {
  city: City,
  offers: Offer[],
  activeOffer: Offer | undefined,
  favorites: number[],
  sortOption: SortTypeOptions,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  authInfo: AuthInfo | null,
};
