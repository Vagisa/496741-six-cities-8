import { AuthorizationStatus, SortTypeOptions } from '../const';
import { AuthInfo } from './auth-info';
import { City } from './cities';
import { CommentData } from './comment-data';
import { Offer } from './offers';
import { Review } from './review';

export type State = {
  city: City,
  offer: Offer | undefined,
  offers: Offer[],
  activeOffer: Offer | undefined,
  favorites: number[],
  sortOption: SortTypeOptions,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  authInfo: AuthInfo | null,
  comments: Review[],
  comment: CommentData | null,
  offersNearby: Offer[],
};
