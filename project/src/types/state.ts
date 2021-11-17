import { SortTypeOptions } from '../const';
import { City } from './cities';
import { Offer } from './offers';

export type State = {
  city: City,
  offers: Offer[],
  activeOffer: Offer | undefined,
  favorites: number[],
  sortOption: SortTypeOptions,
}
