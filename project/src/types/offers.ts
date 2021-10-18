export type Host = {
  avatar: string;
  name: string;
  isPro: boolean;
}

export type Offer = {
  id: number;
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
  city: string;
};
