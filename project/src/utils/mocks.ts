import { address, commerce, database, datatype, image, internet, random } from 'faker';
import { City } from '../types/cities';
import { Location } from '../types/cities';
import { Offer } from '../types/offers';
import { AuthorizationStatus, SortTypeOptions } from '../const';
import { User } from '../types/user';
import { Review } from '../types/review';
import { AuthInfo } from '../types/auth-info';

export const makeFakeLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: 10,
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
  rating: datatype.float({max: 5, precision: 1}),
  bedrooms : datatype.number(10),
  maxAdults: datatype.number(10),
  price: datatype.number({min: 100, max: 2000}),
  goods: new Array(10).fill(null).map(random.word),
  host: makeFakeUser(),
  location: makeFakeLocation(),
} as Offer);

export const makeFakeOffers = (): Offer[] => (
  new Array(datatype.number(10)).fill(null).map(makeFakeOffer) as Offer[]);

export const makeFakeOffersNearby = (): Offer[] => (
  new Array(datatype.number(3)).fill(null).map(makeFakeOffer) as Offer[]);

export const makeFakeFavoriteOffers = (): Offer[] => (
  makeFakeOffers().filter((offer) => (
    offer.isFavorite === true)) as Offer[]);

export const makeFakeComment = (): Review => ({
  comment: commerce.productDescription(),
  date: datatype.datetime().toISOString(),
  id: datatype.number(),
  rating: datatype.float({max: 5, precision: 1}),
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
  new Array(datatype.number(10)).fill(null).map(makeFakeComment) as Review[]);

export const getRandomSortOptions = (): SortTypeOptions => (
  random.arrayElement(Object.values(SortTypeOptions)) as SortTypeOptions);

export const getAuthorizationStatus = (): AuthorizationStatus => (
  random.arrayElement(Object.values(AuthorizationStatus)) as AuthorizationStatus);
