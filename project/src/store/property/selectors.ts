import { CommentData } from '../../types/comment-data';
import { Offer } from '../../types/offers';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffer = (state: State): Offer | undefined => state[NameSpace.property].offer;
export const getComments = (state: State): Review[] => state[NameSpace.property].comments;
export const getComment = (state: State): CommentData | null => state[NameSpace.property].comment;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.property].offersNearby;
