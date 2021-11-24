import { AuthorizationStatus, SortTypeOptions } from '../const';
import { AuthInfo } from './auth-info';
import { City } from './cities';
import { Offer } from './offers';
import { Review } from './review';
import { RootState } from '../store/root-reducer';

export type Offers = {
  city: City,
  offers: Offer[],
  activeOffer: Offer | undefined,
  sortOption: SortTypeOptions,
};

export type Property = {
  offer: Offer | undefined,
  comments: Review[],
  offersNearby: Offer[],
};

export type User = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo | null,
  favorites: number[],
  isDataLoaded: boolean,
};

export type State = RootState;
