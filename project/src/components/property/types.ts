import { Offer } from '../../types/offers';

export type PropertyProps = {
  offers: Offer[];
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
}
