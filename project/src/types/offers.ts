export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Host = {
  avatar: string;
  name: string;
  isPro: boolean;
}

export type City = {
  location: Location;
  name: string;
}

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
  host: Host;
  location: Location;
};
