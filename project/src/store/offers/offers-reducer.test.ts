import { offersReducer } from './offers-reducer';
import { random } from 'faker';

import {
  changeCity,
  fillOffersList,
  changeActiveOffer,
  changeSortType,
  updateOffer
} from '../action';
import {
  makeFakeCity,
  makeFakeOffer,
  makeFakeOffers
} from '../../utils/mocks';
import { getRandomSortOptions } from '../../utils/mocks';
import { Offer } from '../../types/offers';

const fakeCity = makeFakeCity();
const fakeOffers = [...makeFakeOffers(), makeFakeOffer()];
const fakeActiveOffer = random.arrayElement(fakeOffers);
const fakeSortOptions = getRandomSortOptions();

describe('Reducer: offersReducer', () => {
  it('must change the city', () => {
    const state = {
      city: makeFakeCity(),
      offers: fakeOffers,
      activeOffer: fakeActiveOffer,
      sortOption: fakeSortOptions,
    };
    expect(offersReducer(state, changeCity(fakeCity)))
      .toEqual({
        city: fakeCity,
        offers: fakeOffers,
        activeOffer: fakeActiveOffer,
        sortOption: fakeSortOptions,
      });
  });
  it('should return a list of offers', () => {
    const state = {
      city: fakeCity,
      offers: makeFakeOffers(),
      activeOffer: fakeActiveOffer,
      sortOption: fakeSortOptions,
    };
    expect(offersReducer(state, fillOffersList(fakeOffers)))
      .toEqual({
        city: fakeCity,
        offers: fakeOffers,
        activeOffer: fakeActiveOffer,
        sortOption: fakeSortOptions,
      });
  });
  it('select another active offer', () => {
    const state = {
      city: fakeCity,
      offers: fakeOffers,
      activeOffer: random.arrayElement(fakeOffers),
      sortOption: fakeSortOptions,
    };
    expect(offersReducer(state, changeActiveOffer(fakeActiveOffer)))
      .toEqual({
        city: fakeCity,
        offers: fakeOffers,
        activeOffer: fakeActiveOffer,
        sortOption: fakeSortOptions,
      });
  });
  it('choose another sorting type', () => {
    const state = {
      city: fakeCity,
      offers: fakeOffers,
      activeOffer: fakeActiveOffer,
      sortOption: getRandomSortOptions(),
    };
    expect(offersReducer(state, changeSortType(fakeSortOptions)))
      .toEqual({
        city: fakeCity,
        offers: fakeOffers,
        activeOffer: fakeActiveOffer,
        sortOption: fakeSortOptions,
      });
  });
  it('update offer', () => {
    const state = {
      city: fakeCity,
      offers: fakeOffers,
      activeOffer: fakeActiveOffer,
      sortOption: fakeSortOptions,
    };

    const getRandomOffer = (): Offer => (
      random.arrayElement(fakeOffers) as Offer);

    const randomOffer = getRandomOffer();
    const changedOffer = {...randomOffer, isFavorite: !(randomOffer.isFavorite) };
    expect(offersReducer(state, updateOffer(changedOffer)))
      .toEqual({
        city: fakeCity,
        offers: fakeOffers.map((offer) => (
          offer.id === changedOffer.id ? changedOffer : offer)),
        activeOffer: fakeActiveOffer,
        sortOption: fakeSortOptions,
      });
  });
});
