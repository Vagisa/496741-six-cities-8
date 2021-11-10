import { Offer } from '../../types/offers';

export type MainProps = {
  offers: Offer[];
  activeOffer: Offer | undefined;
  placeCount: number;
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
}
