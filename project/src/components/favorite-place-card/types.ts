import { Offer } from '../../types/offers';

export type FavoritePlaceCardProps = {
  offer: Offer;
  onFavoritesClick: (offerId: number) => void;
}
