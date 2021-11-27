import { Action } from 'redux';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import {
  checkAuthAction,
  fetchCurrentOfferAction,
  fetchCommentsAction,
  loginAction,
  logoutAction,
  fetchOffersNearbyAction,
  fetchOffersAction,
  postCommentAction,
  fetchFavoriteAction,
  postFavoriteAction
} from './api-actions';
import {
  fillOffersList,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  setAuthInfo,
  setComments,
  setFavorite,
  setOffer,
  setOffersNearby,
  updateOffer
} from './action';
import {
  makeFakeAuthInfo,
  makeFakeComments,
  makeFakeFavoriteOffers,
  makeFakeOffer,
  makeFakeOffers,
  makeFakeOffersNearby
} from '../utils/mocks';
import { CommentData } from '../types/comment-data';
import { datatype } from 'faker';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeAuthInfo = makeFakeAuthInfo();
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch set Offer when GET /hotels/:id', async () => {
    const fakeOffer = makeFakeOffer();
    mockAPI
      .onGet(APIRoute.Offer + fakeOffer.id)
      .reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(fetchCurrentOfferAction(fakeOffer.id.toString()));
    expect(store.getActions()).toEqual([setOffer(fakeOffer)]);
  });
  it('should dispatch set comments when GET /comments/:id', async () => {
    const fakeOffer = makeFakeOffer();
    const fakeComments = makeFakeComments();
    mockAPI
      .onGet(APIRoute.Comments + fakeOffer.id)
      .reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(fakeOffer.id.toString()));
    expect(store.getActions()).toEqual([setComments(fakeComments)]);
  });
  it('should dispatch set offers nearby when GET /hotels/:id/nearby', async () => {
    const fakeOffer = makeFakeOffer();
    const fakeOffersNearby = makeFakeOffersNearby();
    mockAPI
      .onGet(APIRoute.Offer + fakeOffer.id + APIRoute.OffersNearby)
      .reply(200, fakeOffersNearby);

    const store = mockStore();

    await store.dispatch(fetchOffersNearbyAction(fakeOffer.id.toString()));
    expect(store.getActions()).toEqual([setOffersNearby(fakeOffersNearby)]);
  });
  it('should dispatch fill offers list when GET /hotels', async () => {
    const fakeOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());
    expect(store.getActions()).toEqual([fillOffersList(fakeOffers)]);
  });
  it('should set autorization status is auth when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeAuthInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      setAuthInfo(fakeAuthInfo),
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });
  it('should dispatch set comments when Post /comments/:id', async () => {
    const fakeRating = datatype.float({max: 5, precision: 1});
    const fakeComment = datatype.string();
    const fakeUserComment: CommentData = {comment: fakeComment, rating: fakeRating};
    const fakeOffer = makeFakeOffer();
    const fakeComments = makeFakeComments();
    mockAPI
      .onPost(APIRoute.Comments + fakeOffer.id)
      .reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(postCommentAction(fakeOffer.id.toString(), fakeUserComment));
    expect(store.getActions()).toEqual([setComments(fakeComments)]);
  });
  it('should dispatch RequiredAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: fakeAuthInfo.email, password: '123456'};
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeAuthInfo );

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      setAuthInfo(fakeAuthInfo),
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-sities-token', fakeAuthInfo.token);
  });
  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onPost(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
      setAuthInfo(null),
      redirectToRoute(AppRoute.Main),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-sities-token');
  });
  it('should fill offers favorite when GET /favorite', async () => {
    const fakeOffersFavorite = makeFakeFavoriteOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, fakeOffersFavorite);

    const store = mockStore();

    await store.dispatch(fetchFavoriteAction());
    expect(store.getActions()).toEqual([setFavorite(fakeOffersFavorite)]);
  });
  it('should make offer favorite when POST /favorite/:id/:status AUTH', async () => {
    const fakeOffer = makeFakeOffer();
    const newFavoriteStatus = !fakeOffer.isFavorite;
    const expectedFakeOffer = {...fakeOffer, isFavorite: newFavoriteStatus};
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeOffer.id.toString()}/${Number(newFavoriteStatus)}`)
      .reply(200, expectedFakeOffer);

    const store = mockStore();

    await store.dispatch(postFavoriteAction(fakeOffer, AuthorizationStatus.Auth));
    expect(store.getActions()).toEqual([
      updateOffer(expectedFakeOffer),
    ]);
  });
  it('should make offer favorite when POST /favorite/:id/:status NO_AUTH', async () => {
    const fakeOffer = makeFakeOffer();
    const newFavoriteStatus = !fakeOffer.isFavorite;
    const expectedFakeOffer = {...fakeOffer, isFavorite: newFavoriteStatus};
    mockAPI
      .onPost(`${APIRoute.Favorite}/${fakeOffer.id.toString()}/${Number(newFavoriteStatus)}`)
      .reply(200, expectedFakeOffer);

    const store = mockStore();

    await store.dispatch(postFavoriteAction(fakeOffer, AuthorizationStatus.NoAuth));
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
  });
});
