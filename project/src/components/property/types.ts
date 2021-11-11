import { Offer } from '../../types/offers';
import { Review } from '../../types/review';

export type PropertyProps = {
  offers: Offer[];
  activeOffer: Offer | undefined;
  reviews: Review[];
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
}
