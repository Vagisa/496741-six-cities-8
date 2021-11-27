import { address, commerce, database, datatype, image, internet, random } from 'faker';
import { City } from '../types/cities';
import { Location } from '../types/cities';
import { Offer } from '../types/offers';
import { AuthorizationStatus, SortTypeOptions } from '../const';
import { User } from '../types/user';
import { Review } from '../types/review';
import { AuthInfo } from '../types/auth-info';
import { ZOOM } from '../const';

const NUMBER_OF_FAKE_CASES = 10;
const NUMBER_OF_FAKE_OFFERS_NEADBY = 3;
const MIN_PRICE = 100;
const MAX_PRICE = 300;
const MAX_RATING = 5;
const PRECISION_RATING = 1;


export const makeFakeLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: ZOOM,
} as Location);

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: address.cityName(),
} as City);

export const makeFakeUser = (): User => ({
  id: datatype.number(),
  avatarUrl: internet.avatar(),
  name: internet.userName(),
  isPro: datatype.boolean(),
} as User);

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  city: makeFakeCity(),
  images: new Array(5).fill(null).map(image.image),
  previewImage: image.image(),
  title: commerce.productName(),
  description: commerce.productDescription(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  type: database.type(),
  rating: datatype.float({max: MAX_RATING, precision: PRECISION_RATING}),
  bedrooms : datatype.number(NUMBER_OF_FAKE_CASES),
  maxAdults: datatype.number(NUMBER_OF_FAKE_CASES),
  price: datatype.number({min: MIN_PRICE, max: MAX_PRICE}),
  goods: new Array(NUMBER_OF_FAKE_CASES).fill(null).map(random.word),
  host: makeFakeUser(),
  location: makeFakeLocation(),
} as Offer);

export const makeFakeOffers = (): Offer[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_CASES)).fill(null).map(makeFakeOffer) as Offer[]);

export const makeFakeOffersNearby = (): Offer[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_OFFERS_NEADBY)).fill(null).map(makeFakeOffer) as Offer[]);

export const makeFakeFavoriteOffers = (): Offer[] => (
  makeFakeOffers().filter((offer) => (
    offer.isFavorite === true)) as Offer[]);

export const makeFakeComment = (): Review => ({
  comment: commerce.productDescription(),
  date: datatype.datetime().toISOString(),
  id: datatype.number(),
  rating: datatype.float({max: MAX_RATING, precision: PRECISION_RATING}),
  user: makeFakeUser(),
} as Review);

export const makeFakeAuthInfo = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.string(),
} as AuthInfo);

export const makeFakeComments = (): Review[] => (
  new Array(datatype.number(NUMBER_OF_FAKE_CASES)).fill(null).map(makeFakeComment) as Review[]);

export const getRandomSortOptions = (): SortTypeOptions => (
  random.arrayElement(Object.values(SortTypeOptions)) as SortTypeOptions);

export const getAuthorizationStatus = (): AuthorizationStatus => (
  random.arrayElement(Object.values(AuthorizationStatus)) as AuthorizationStatus);
