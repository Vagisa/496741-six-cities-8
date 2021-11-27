import { combineReducers } from 'redux';
import { offersReducer } from './offers/offers-reducer';
import { propertyReducer } from './property/properti-reducer';
import { userReducer } from './user/user-reducer';

export enum NameSpace {
  Offers = 'OFFERS',
  Property = 'PROPERTY',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Property]: propertyReducer,
  [NameSpace.User]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
