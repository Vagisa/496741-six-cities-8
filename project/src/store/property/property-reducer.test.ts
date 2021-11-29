import { propertyReducer } from './properti-reducer';

import { makeFakeComments, makeFakeOffer, makeFakeOffersNearby } from '../../utils/mocks';
import { setComments, setOffer, setOffersNearby, updateOffer } from '../action';

const fakeOffer = makeFakeOffer();
const fakeComments = makeFakeComments();
const fakeOffersNearby = makeFakeOffersNearby();

describe('Reducer: propertyReducer', () => {
  it('set offer', () => {
    const state = {
      offer: makeFakeOffer(),
      comments: fakeComments,
      offersNearby: fakeOffersNearby,
    };
    expect(propertyReducer(state, setOffer(fakeOffer)))
      .toEqual({
        offer: fakeOffer,
        comments: fakeComments,
        offersNearby: fakeOffersNearby,
      });
  });
  it('set comments', () => {
    const state = {
      offer: fakeOffer,
      comments: makeFakeComments(),
      offersNearby: fakeOffersNearby,
    };
    expect(propertyReducer(state, setComments(fakeComments)))
      .toEqual({
        offer: fakeOffer,
        comments: fakeComments,
        offersNearby: fakeOffersNearby,
      });
  });
  it('set offers nearby', () => {
    const state = {
      offer: fakeOffer,
      comments: fakeComments,
      offersNearby: makeFakeOffersNearby(),
    };
    expect(propertyReducer(state, setOffersNearby(fakeOffersNearby)))
      .toEqual({
        offer: fakeOffer,
        comments: fakeComments,
        offersNearby: fakeOffersNearby,
      });
  });
  it('update offer', () => {
    const state = {
      offer: makeFakeOffer(),
      comments: fakeComments,
      offersNearby: fakeOffersNearby,
    };
    expect(propertyReducer(state, updateOffer(fakeOffer)))
      .toEqual({
        offer: fakeOffer,
        comments: fakeComments,
        offersNearby: fakeOffersNearby,
      });
  });
});
