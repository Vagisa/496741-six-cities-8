import { Offer } from '../../types/offers';
import { Review } from '../../types/review';

export type AppProps = {
  placeCount: number;
  offers: Offer[];
  reviews: Review[];
}
