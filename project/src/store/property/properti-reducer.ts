import { createReducer } from '@reduxjs/toolkit';

import { Property } from '../../types/state';
import { setComments, setOffer, setOffersNearby } from '../action';

const initialState: Property = {
  offer: undefined,
  comments: [],
  offersNearby: [],
};

const propertyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    });
});

export {propertyReducer};
