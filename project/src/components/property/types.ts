import { Offer } from '../../types/offers';
import { Review } from '../../types/review';

export type PropertyProps = {
  offers: Offer[];
  reviews: Review[];
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
}
