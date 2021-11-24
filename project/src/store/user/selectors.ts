import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { AuthInfo } from '../../types/auth-info';
import { Offer } from '../../types/offers';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo | null => state[NameSpace.user].authInfo;
export const getFavorites = (state: State): Offer[] => state[NameSpace.user].favorites;
export const getLoadedDataStatus  = (state: State): boolean => state[NameSpace.user].isDataLoaded;
