import { Offer } from '../../types/offers';
import { Review } from '../../types/review';

export type AppProps = {
  offers: Offer[];
  reviews: Review[];
}
