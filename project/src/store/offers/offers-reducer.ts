import { createReducer } from '@reduxjs/toolkit';

import { Offers } from '../../types/state';
import { SortTypeOptions, cities } from '../../const';
import { changeActiveOffer, changeCity, changeSortType, fillOffersList } from '../action';

const initialState: Offers = {
  city: cities[0],
  offers: [],
  activeOffer: undefined,
  sortOption: SortTypeOptions.Popular,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortOption = action.payload;
    });
});

export {offersReducer};
