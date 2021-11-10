import { Offer } from '../../types/offers';
import { PlaceCardMode } from '../../const';

export type PlacesListProps = {
  offers: Offer[];
  placeCount: number;
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
  mode: PlaceCardMode;
}
