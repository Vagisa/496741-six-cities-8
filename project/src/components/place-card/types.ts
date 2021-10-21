import { Offer } from '../../types/offers';

export type PlaceCardProps = {
  onMouseOver: (offerId: number) => void;
  offer: Offer;
  isFavorite: boolean;
  onFavoritesClick: (offerId: number) => void;
}
