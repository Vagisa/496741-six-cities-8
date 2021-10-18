import { Offer } from '../../types/offers';

export type FavoritesProps = {
  offers: Offer[];
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
}
