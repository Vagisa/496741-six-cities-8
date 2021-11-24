import { createReducer } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '../../const';
import { User } from '../../types/state';
import { requireAuthorization, requireLogout, setAuthInfo, toggleFavorite } from '../action';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  favorites: [],
  isDataLoaded: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleFavorite, (state, action) => {
      if(state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      } else {
        state.favorites = [...state.favorites, action.payload];
      }
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
    });
});

export {userReducer};
