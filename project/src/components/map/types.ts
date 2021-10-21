import { City } from '../../types/cities';
import { Offer } from '../../types/offers';

export type MapProps = {
  city: City;
  offers: Offer[];
  activeOffer: Offer | undefined;
}
