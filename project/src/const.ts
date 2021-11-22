import { City } from './types/cities';

export const MAX_RATING = 5;

export const NUMBER_DISPLAYED_COMMENTS = 10;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorite',
  Room = '/hotels/:id',
}

export enum APIRoute {
  Offer = '/hotels/',
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PlaceCardMode {
  Cities = 'cities',
  NearPlaces = 'near-places',
}

export enum SortTypeOptions {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const cities: City[] = [
  {
    location: {
      latitude: 48.8534100,
      longitude: 2.3488000,
      zoom: 10,
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.9333300,
      longitude: 6.9500000,
      zoom: 10,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
      zoom: 10,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
      zoom: 10,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
      zoom: 10,
    },
    name: 'Dusseldorf',
  },
];
