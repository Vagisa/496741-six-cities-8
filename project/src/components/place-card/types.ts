import { Offer } from '../../types/offers';

export type PlaceCardProps = {
  onMouseOver: () => void;
  offer: Offer;
  isFavorite: boolean;
  onFavoritesClick: (offerId: number) => void;
}
