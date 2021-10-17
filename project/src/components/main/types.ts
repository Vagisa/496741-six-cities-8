import { Offer } from '../../types/offers';

export type MainProps = {
  offers: Offer[];
  placeCount: number;
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
}
