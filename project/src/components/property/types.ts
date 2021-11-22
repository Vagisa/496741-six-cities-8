import { Offer } from '../../types/offers';

export type PropertyProps = {
  offers: Offer[];
  activeOffer: Offer | undefined;
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
}
