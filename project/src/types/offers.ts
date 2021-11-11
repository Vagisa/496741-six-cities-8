import { Location, City } from './cities';
import { User } from './user';

export type Offer = {
  id: number;
  city: City;
  gallery: string[];
  heading: string;
  description: string[];
  isPremium: boolean;
  type: string;
  rating: number;
  bedroomsCount : number;
  maxAdults: number;
  price: number;
  advantages: string[];
  host: User;
  location: Location;
};
