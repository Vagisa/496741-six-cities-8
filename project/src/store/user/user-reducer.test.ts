import { datatype, random } from 'faker';
import { userReducer } from './user-reducer';

import {
  getAuthorizationStatus,
  makeFakeAuthInfo,
  makeFakeFavoriteOffers,
  makeFakeOffer
} from '../../utils/mocks';
import { requireAuthorization, requireLogout, setAuthInfo, setFavorite, updateOffer } from '../action';
import { AuthorizationStatus } from '../../const';

const fakeAuthorizationStatus = getAuthorizationStatus();
const fakeAuthInfo = makeFakeAuthInfo();
const fakeFavorites = makeFakeFavoriteOffers();
const fakeIsDataLoaded = datatype.boolean();

describe('Reducer: userReducer', () => {
  it('loads the favorites list', () => {
    const state = {
      authorizationStatus: fakeAuthorizationStatus,
      authInfo: fakeAuthInfo,
      favorites: makeFakeFavoriteOffers(),
      isDataLoaded: fakeIsDataLoaded,
    };
    expect(userReducer(state, setFavorite(fakeFavorites)))
      .toEqual({
        authorizationStatus: fakeAuthorizationStatus,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: fakeIsDataLoaded,
      });
  });
  it('changes authorization status from unknown and download status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: false,
    };
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: true,
      });
  });
  it('changes authorization status from no-auth and download status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: fakeIsDataLoaded,
    };
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: true,
      });
  });
  it('changes authorization status from auth and download status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: true,
    };
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: true,
      });
  });
  it('logs out', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: true,
    };
    expect(userReducer(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: true,
      });
  });
  it('sets auth info', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: null,
      favorites: fakeFavorites,
      isDataLoaded: fakeIsDataLoaded,
    };
    expect(userReducer(state, setAuthInfo(fakeAuthInfo)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites,
        isDataLoaded: fakeIsDataLoaded,
      });
  });
  it('remove offer from favorites', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: true,
    };
    const randomFavoriteOffer = random.arrayElement(fakeFavorites);
    expect(userReducer(state, updateOffer(randomFavoriteOffer)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites.filter((offer) => offer.id !== randomFavoriteOffer.id),
        isDataLoaded: true,
      });
  });
  it('add offer from favorites', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: fakeAuthInfo,
      favorites: fakeFavorites,
      isDataLoaded: true,
    };
    const fakeOffer = makeFakeOffer();
    expect(userReducer(state, updateOffer(fakeOffer)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: fakeAuthInfo,
        favorites: fakeFavorites.filter((offer) => offer.id !== fakeOffer.id),
        isDataLoaded: true,
      });
  });
});
