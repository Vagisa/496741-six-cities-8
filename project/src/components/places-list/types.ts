import { Offer } from '../../types/offers';

export type PlacesListProps = {
  offers: Offer[];
  placeCount: number;
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
}
