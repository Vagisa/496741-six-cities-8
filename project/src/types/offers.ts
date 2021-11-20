import { Location, City } from './cities';
import { User } from './user';

export type Offer = {
  id: number;
  city: City;
  images: string[];
  previewImage: string;
  title: string;
  description: string[];
  isFavorite: boolean;
  isPremium: boolean;
  type: string;
  rating: number;
  bedrooms : number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: User;
  location: Location;
};
