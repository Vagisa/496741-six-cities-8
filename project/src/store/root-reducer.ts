import { combineReducers } from 'redux';
import { offersReducer } from './offers-reducer/offers-reducer';
import { propertyReducer } from './property-reducer/properti-reducer';
import { userReducer } from './user-reducer/user-reducer';

export enum NameSpace {
  offers = 'OFFERS',
  property = 'PROPERTY',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.offers]: offersReducer,
  [NameSpace.property]: propertyReducer,
  [NameSpace.user]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
