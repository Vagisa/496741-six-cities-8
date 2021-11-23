import { PlaceCardMode } from '../../const';

export type PlacesListProps = {
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
  mode: PlaceCardMode;
}
