import { Offer } from '../../types/offers';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffer = (state: State): Offer | undefined => state[NameSpace.Property].offer;
export const getComments = (state: State): Review[] => state[NameSpace.Property].comments;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Property].offersNearby;
