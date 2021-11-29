import { createReducer } from '@reduxjs/toolkit';

import { Property } from '../../types/state';
import { setComments, setOffer, setOffersNearby, updateOffer } from '../action';

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
    })
    .addCase(updateOffer, (state, action) => {
      if (state.offer?.id === action.payload.id) {
        state.offer = action.payload;
      } else {
        state.offersNearby = state.offersNearby.map((offerNearby) => (
          offerNearby.id === action.payload.id ? action.payload : offerNearby
        ));
      }
    });
});

export {propertyReducer};
