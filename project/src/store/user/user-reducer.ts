import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { User } from '../../types/state';
import { requireAuthorization, requireLogout, setAuthInfo, setFavorite, updateOffer } from '../action';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  favorites: [],
  isDataLoaded: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorite, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(updateOffer, (state, action) => {
      if(action.payload.isFavorite) {
        state.favorites = [...state.favorites, action.payload];
      } else {
        state.favorites = state.favorites.filter((offer) => offer.id !== action.payload.id);
      }
    });
});

export {userReducer};
