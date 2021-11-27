import { Offer } from '../../types/offers';
import { PlaceCardMode } from '../../const';

export type PlaceCardProps = {
  onMouseOver?: (offerId: number) => void;
  offer: Offer;
  mode: PlaceCardMode;
}
