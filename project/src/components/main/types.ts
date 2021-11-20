export type MainProps = {
  favorites: number[];
  onFavoritesClick: (offerId: number) => void;
  onOfferItemHover: (offerId: number) => void;
}
